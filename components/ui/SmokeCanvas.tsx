"use client";
import { useEffect, useRef } from "react";

type Props = { className?: string; speed?: number };

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.y;
  float t = u_time * 0.07;

  // El cursor empuja suavemente el humo
  vec2 d = uv - u_mouse;
  uv += d * exp(-dot(d, d) * 6.0) * 0.25;

  vec2 p = uv * 1.5;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.0 * r);

  vec3 deep  = vec3(0.020, 0.125, 0.090);  // verde bosque
  vec3 mid   = vec3(0.060, 0.560, 0.330);  // verde hoja
  vec3 light = vec3(0.560, 1.000, 0.760);  // verde menta

  vec3 col = mix(deep, mid, smoothstep(0.15, 0.70, f));
  col = mix(col, light, smoothstep(0.55, 1.10, f + 0.55 * (r.x - 0.5)));
  col *= 0.55 + 0.9 * f * f;               // zonas oscuras más profundas

  // viñeta suave para que el texto blanco lea bien
  vec2 v = gl_FragCoord.xy / u_res - 0.5;
  col *= 1.0 - dot(v, v) * 0.9;

  gl_FragColor = vec4(col, 1.0);
}`;

/** Nubes de humo verde en movimiento (WebGL). Ocupa el 100% de su contenedor. */
export default function SmokeCanvas({ className = "", speed = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const gl = c.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) { c.style.background = "linear-gradient(135deg,#082019,#0f5a3c 60%,#5be49b)"; return; }

    const build = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, build(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, build(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SCALE = 0.5; // resolución de render: el humo es difuso, no hace falta más
    const mouse = { x: -9, y: -9, tx: -9, ty: -9 };
    const t0 = performance.now();
    let raf = 0, visible = true;

    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.max(2, Math.floor(r.width * SCALE));
      c.height = Math.max(2, Math.floor(r.height * SCALE));
      gl.viewport(0, 0, c.width, c.height);
    };

    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, ((now - t0) / 1000) * speed + 20);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.height);
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (still) draw(performance.now()); });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    window.addEventListener("pointermove", move, { passive: true });

    if (still) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, [speed]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
