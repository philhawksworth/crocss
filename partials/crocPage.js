const entries = ["#333399", "#444499", "#555599", "#666699", "#777799", "#888899", "#999999", "#AAAA99", "#BBBB99", "#CCCC99"];
const swatch = (color) => {
  return `
    <div class="swatch-item" style="background-color: ${ color }">
      <div class="swatch-item__value">${ color }</div>
    </div>
  `
}

export default function Layout({ content, name, imageUrl }) {
  return `
  <h1>${ name }</h1>
  <img src="/${ imageUrl }" alt="${ name }">  
  <section class="swatch-items">
    ${ entries.map(swatch).join('') }
  </section>`
}