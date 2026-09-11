import type { CSSProperties } from "react";

/** ícone Lucide aplicado via mask-image, herdando a cor do texto (currentColor). */
export function Icon({
  src,
  size = 18,
  color,
  style,
}: {
  src: string;
  size?: number | string;
  color?: string;
  style?: CSSProperties;
}) {
  const s = typeof size === "number" ? `${size}px` : size;
  const url = src.startsWith("/") ? src : `/${src}`;
  return (
    <span
      style={{
        display: "inline-block",
        width: s,
        height: s,
        flex: "none",
        background: color || "currentColor",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
}
