import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nurse GO",
    short_name: "Nurse GO",
    description:
      "Trilha gamificada de fisiologia e anatomia — sistemas cardiovascular e respiratório.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A2540",
    theme_color: "#0A2540",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
