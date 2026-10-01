import SmokeCanvas from "./SmokeCanvas";

export default function Aurora() {
  return (
    <div aria-hidden className="grain absolute inset-0 overflow-hidden bg-bosque">
      <SmokeCanvas className="absolute inset-0 size-full" />
    </div>
  );
}