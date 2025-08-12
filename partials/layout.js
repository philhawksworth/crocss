export default function Layout({ content, footer }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Crocss — what's the hex code?</title>
        <link rel="preload" href="https://demo-styles.deno.deno.net/fonts/Moranga-Regular.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="https://demo-styles.deno.deno.net/fonts/Moranga-Medium.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="https://demo-styles.deno.deno.net/fonts/Recursive_Variable.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="stylesheet" href="https://demo-styles.deno.deno.net/styles.css">
        <link rel="stylesheet" href="/public/css/styles.css">
      </head>
      <body>
        <header>
          <h1><a href="/">Crocss</a></h1>
          <p>Can you guess the hex code for these Crocs?</p>
        </header>
        <main>
          ${ content }
        </main>
        <footer>
          <p>Hosted by <a href="https://deno.com/deploy">Deno Deploy</a></p>
          ${ footer }
        </footer>
      </body>
    </html>`

}