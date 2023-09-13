import type { Config } from "tailwindcss";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx, md}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx, md}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx, md}",
  ],
  darkMode: "class", // or 'media' or 'class
  theme: {
    animation: {
      "border-width": "border-width 3s infinite alternate",
      "background-shine": "background-shine 2s linear infinite",
      "text-gradient": "text-gradient 1.5s linear infinite",
    },
    keyframes: {
      "border-width": {
        from: {
          width: "10px",
          opacity: "0",
        },
        to: {
          width: "100px",
          opacity: "1",
        },
      },
      "background-shine": {
        from: {
          backgroundPosition: "0 0",
        },
        to: {
          backgroundPosition: "-200% 0",
        },
      },
      "text-gradient": {
        to: {
          backgroundPosition: "200% center",
        },
      },
    },
  },
  plugins: [typography, forms, animate],
};
export default config;
