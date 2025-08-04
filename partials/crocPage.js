const swatch = (color) => {
  return `
    <div class="swatch-item" style="background-color: ${ color }">
      <div class="swatch-item__value">${ color }</div>
    </div>
  `
}

export default function Layout({ content, name, imageUrl, slug, colors, guess }) {
  return `
  <h2> This Croc is <span class="croc-name">${ name }</span> but what is its hex value?</h2>
  <div class="hero-image">
    <img src="/${ imageUrl }" alt="${ name }" class="crocs-hero-image">  
  </div>
  ${ guess ? `<p>Your guess: ${swatch(guess)}</p>` : '' }
  <form action="/croc/${ slug }" method="post">
      <input type="text" name="colour" id="hex" placeholder="Guess the hex color">
      <button type="submit">Submit</button>
  </form>
  <section class="swatch-items">
    ${ colors.map(swatch).join('') }
  </section>`
}