export default function swatch(color: string) {
  if (color.charAt(0) !== "#") {
    color = "#" + color;
  }
  return `
  <div class="swatch-items">
    <a class="swatch-item" style="background-color: ${color}" name="${color}" href="${color}">
      <div class="swatch-item__value">${color}</div>
    </a>
  </div>
  `;
};
