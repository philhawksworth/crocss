const swatch = (color) => {

  if(color.charAt(0) !== '#') {
    color = '#' + color;
  }

  return `
  <div class="swatch-items">
    <a class="swatch-item" style="background-color: ${ color }">
      <div class="swatch-item__value">${ color }</div>
    </a>
  </div>
  `
}

export default function Layout({ content, name, imageUrl, slug, colors, guess }) {
  return `
  <h2> This Croc is <span class="croc-name">${ name }</span> but what is its hex value?</h2>
  <div class="hero-image">
    <img src="/${ imageUrl }" alt="${ name }" class="crocs-hero-image">  
  </div>
  ${ guess ? `<p>So you think this Croc's hex code is</p><div class="guess"> ${swatch(guess)}</div><p><a href="/croc/${ slug }">Brag about how close you were</a>, or guess again?</a></p>` : '' }
  <form action="/croc/${ slug }" method="post">
      <input type="text" name="colour" id="hex" placeholder="Guess the hex color">
      <button type="submit">Submit</button>
  </form>
  <section>
    ${ colors.length > 0 ? `<p><em>Click to peek at a previous guess</em></p>` : '' }
    <div class="swatch-items">
      ${ colors.map(swatch).join('') }
    </div>
  </section>`
}