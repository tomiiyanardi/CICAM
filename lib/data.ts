// Colores y datos de lotes: de ejemplo. Los textos de las líneas son los definidos por CICAM.
export type Line = { n: string; name: string; title: string; text: string; tag: string; bg: string };

export const LINES: Line[] = [
  { n: "01", name: "CBD", title: "Línea neurológica", text: "Lectura orientativa para epilepsia, autismo y cuadros neurológicos.", tag: "Consulta profesional", bg: "#CFE0DD" },
  { n: "02", name: "Verde", title: "Bienestar físico", text: "Pensada para dolor general, artritis, fibromialgia y molestias cotidianas.", tag: "Mostrador y atención directa", bg: "#D8E8CE" },
  { n: "03", name: "Amarillo", title: "Equilibrio", text: "Orientada a estrés, ansiedad, descanso y regulación emocional.", tag: "Consulta familiar", bg: "#F4E6B4" },
  { n: "04", name: "Lila", title: "Estado de ánimo", text: "Desarrollada para acompañar etapas de decaimiento y sostener rutina.", tag: "Seguimiento personalizado", bg: "#E2DAF1" },
  { n: "05", name: "Rojo", title: "Descanso profundo", text: "Perfil orientativo para sistema nervioso, bienestar general y sueño reparador.", tag: "Consulta profesional", bg: "#F4D0D0" },
];

export const LOTS: Record<string, [string, string][]> = {
  "L-2609": [["CBD", "10,4 mg/ml"], ["THC", "0,3 mg/ml"], ["Metales pesados", "No detectado"], ["Envasado", "Septiembre 2026"]],
  "L-2608": [["CBD", "20,1 mg/ml"], ["THC", "0,4 mg/ml"], ["Metales pesados", "No detectado"], ["Envasado", "Agosto 2026"]],
  "L-2607": [["CBD", "9,9 mg/ml"], ["THC", "9,8 mg/ml"], ["Metales pesados", "No detectado"], ["Envasado", "Julio 2026"]],
};

export const NAV = [
  { label: "Líneas", href: "/#lineas" },
  { label: "Lotes", href: "/#lotes" },
  { label: "Tienda", href: "/tienda" },
];
