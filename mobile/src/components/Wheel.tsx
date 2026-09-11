import { Animated } from "react-native";
import Svg, { Circle, G, Path, Polygon, Text as SvgText } from "react-native-svg";

// Mesma ordem de SEGS em data/constants.ts — cores do antigo conic-gradient.
const CORES_SEGMENTO = ["#1B6FD1", "#C2415A", "#7BE3C0", "#F2C24A", "#0A2540", "#F2994A"];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function fatia(cx: number, cy: number, r: number, de: number, ate: number) {
  const p1 = polar(cx, cy, r, de);
  const p2 = polar(cx, cy, r, ate);
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} Z`;
}

export function Wheel({
  size = 266,
  rotation,
  segmentos,
}: {
  size?: number;
  rotation: Animated.Value;
  segmentos: { nome: string; fg: string; deg: number }[];
}) {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const rot = rotation.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "360deg"] });

  return (
    <Animated.View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {/* ponteiro fixo */}
      <Svg width={24} height={28} style={{ position: "absolute", top: -10, zIndex: 3 }}>
        <Polygon points="12,28 0,0 24,0" fill="#fff" />
      </Svg>

      <Animated.View style={{ width: size, height: size, transform: [{ rotate: rot }] }}>
        <Svg width={size} height={size}>
          <Circle cx={cx} cy={cy} r={r - 4} fill="#0A2540" />
          {segmentos.map((s, i) => (
            <G key={i}>
              <Path d={fatia(cx, cy, r - 8, i * 60, i * 60 + 60)} fill={CORES_SEGMENTO[i % 6]} />
              <G rotation={s.deg} origin={`${cx},${cy}`}>
                <SvgText
                  x={cx}
                  y={cy - r * 0.62}
                  fill={s.fg}
                  fontSize={12}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {s.nome}
                </SvgText>
              </G>
            </G>
          ))}
        </Svg>
      </Animated.View>

      {/* miolo */}
      <Animated.View
        style={{
          position: "absolute",
          width: 62,
          height: 62,
          borderRadius: 31,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 14,
          elevation: 6,
        }}
      >
        <Animated.View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: "#05A67A" }} />
      </Animated.View>
    </Animated.View>
  );
}
