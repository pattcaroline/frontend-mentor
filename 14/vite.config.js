import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/frontend-mentor/14/tip-calculator-app-main/dist/",
});
