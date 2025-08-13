import swatch from "./swatch.ts";

export default function Layout({ name, imageUrl, slug, colors, guess, url }: { name: string; imageUrl: string; slug: string; colors: string[]; guess: string | null; url: string }) {
  
  const isGuess = url.includes("guess") ? true : false;
  
  return `
  <h2> This Croc is <span class="croc-name">${name}</span> but what is its hex value?</h2>
  <div class="hero-image">
    <img src="/${imageUrl}" alt="${name}" class="crocs-hero-image">  
  </div>
  ${
    isGuess
      ? `<p>So you think this Croc's hex code is</p><div class="guess"> ${
        guess ? swatch(guess) : ""
      }</div><p>Brag about how close you were by sharing this URL: <br><code>${url.replace("/guess/", "/is/")}</code></p><p>or guess again?</p>`
      : ""
  }
  <form action="/croc/${slug}" method="post">
      <input type="text" name="colour" id="hex" placeholder="Guess the hex color">
      <button type="submit">Submit</button>
  </form>
  <section>
    ${
    colors.length > 0 ? `<p><em>Click to peek at a previous guess</em></p>` : ""
  }
    <div class="swatch-items">
      ${colors.map(swatch).join("")}
    </div>
  </section>`;
}
