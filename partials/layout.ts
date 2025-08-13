export default function Layout({ content, url, footer }: { content: string; url: string; footer: string }) {
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
        <meta name="twitter:image" content="${url}/og">
        <meta name="twitter:image:alt" content="Can you guess the hex code for these Crocs?">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@deno_land">

        <meta property="og:title" content="Crocss — what's the hex code?" />
        <meta property="og:description" content="Can you guess the hex code for these Crocs?" />
        <meta property="og:image" content="crocs-og" />
        <meta property="og:url" content="${url}/og" />
        <meta property="og:image:alt" content="Can you guess the hex code for these Crocs?">
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Crocss" />
    
      </head>
      <body>
        <header>
          <h1><a href="/">Crocss</a></h1>
          <p>Can you guess the hex code for these Crocs?</p>
        </header>
        <main>
          ${content}
        </main>
        <footer>
          <p>Hosted by <a href="https://deno.com/deploy">Deno Deploy</a></p>
          ${footer}
        </footer>
      </body>
    </html>`;
}
