const entries = ["#333399", "#444499", "#555599", "#666699", "#777799", "#888899", "#999999", "#AAAA99", "#BBBB99", "#CCCC99"];
const swatch = (color) => {
  return `
    <div class="swatch-item" style="background-color: ${ color }">
      <div class="swatch-item__value">${ color }</div>
    </div>
  `
}

export default function Layout({ content, name, imageUrl, slug, colors, guess }) {
  return `
  <h1>${ name }</h1>
  <img src="/${ imageUrl }" alt="${ name }">  
  <form action="/croc/${ slug }" method="post">
    <input type="text" name="colour" placeholder="Enter a colour">
    <button type="submit">Submit</button>
  </form>
  ${ guess ? `<p>Your guess: ${ guess }</p>` : '' }
  <section class="swatch-items">
    ${ colors.map(swatch).join('') }
  </section>`
}