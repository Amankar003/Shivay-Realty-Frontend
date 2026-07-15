// Font configuration for Next.js
// Fonts: Playfair Display (display), Inter (body), Outfit (accent/UI)

import { Playfair_Display, Inter, Outfit } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontVariables = [
  playfairDisplay.variable,
  inter.variable,
  outfit.variable,
].join(" ");
