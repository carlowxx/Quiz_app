import { View } from "react-native";

/** barra de progresso simples: trilha + preenchimento em %. */
export function Bar({
  pct,
  height = 8,
  track = "#E7EEF1",
  fill = "#05A67A",
  radius = 99,
}: {
  pct: number;
  height?: number;
  track?: string;
  fill?: string;
  radius?: number;
}) {
  const p = Math.max(0, Math.min(100, pct));
  return (
    <View style={{ height, borderRadius: radius, backgroundColor: track, overflow: "hidden" }}>
      <View style={{ height: "100%", width: `${p}%`, borderRadius: radius, backgroundColor: fill }} />
    </View>
  );
}
