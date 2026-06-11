import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Root explizit setzen: verhindert, dass Turbopack Modul-IDs relativ zum
  // Home-Verzeichnis bildet (Umlaute im Ordnerpfad crashen den Builder).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
