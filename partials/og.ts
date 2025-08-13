// import satori from "satori/wasm";
import { Resvg, ResvgRenderOptions } from "@resvg/resvg-js";

export default (imageUrl: string, color: string) => {

  
  console.log("color", color);
  if (!color || color === "undefined") {
    color = "000000";
  }
  console.log("color ->", color);

  const svg = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <style type="text/css">
          @import url('/public/fonts/Moranga-Medium.woff2');
      </style>
    </defs>
    <rect fill="#${color}" x="965" y="0" width="315" height="720"></rect>
    <image href="./public/images/og-bg.svg" x="0" y="0" width="1280" height="720" />
    <image href="${imageUrl}" x="230" y="-50" width="500" />
    <g transform="translate(724,104)">
      <path fill="#${color}" d="M217 31c2 2 2 4 0 6l-28 29a5 5 0 0 1-7-6l26-26-26-25a4 4 0 1 1 6-7l29 29ZM5 241H1C13 136 66 83 117 56a238 238 0 0 197-26 268 268 0 0 1 0 9 58 58 0 0 0-8 0l-20 3c-18 3-41 9-65 22-48 25-99 76-111 178l-5-1Z"/>
    </g>
    <text x="1120" y="200" text-anchor="middle" fill="#fff" font-family="Moranga" font-size="40" font-weight="bold">#${color.toUpperCase()}</text>
  </svg>
  `;

  const opts = {
    fitTo: {
      mode: "width",
      value: 1280,
    },
  };
  const resvg = new Resvg(svg, opts as ResvgRenderOptions);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return pngBuffer;
};
