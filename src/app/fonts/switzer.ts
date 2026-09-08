import localFont from "next/font/local";

export const switzer = localFont({
  src: [
    {
      path: "./switzer/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./switzer/Switzer-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["-apple-system", "Segoe UI", "sans-serif"],
});
