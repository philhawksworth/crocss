export default function Layout({ content, url, footer }: { content: string; url: string; footer: string }) {

  const fingerprint = Deno.env.get('DENO_DEPLOY_REVISION_ID') || null;

  console.log(`DENO_DEPLOY_REVISION_ID:  ${Deno.env.get("DENO_DEPLOY_REVISION_ID")}`);

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
        ${fingerprint ? ` <link rel="stylesheet" href="/public/css/styles.css?v=${fingerprint}">` : `<link rel="stylesheet" href="/public/css/styles.css">`}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="twitter:image" content="${url}/og">
        <meta name="twitter:image:alt" content="Can you guess the hex code for these Crocs?">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@deno_land">

        <meta property="og:title" content="Crocss — what's the hex code?" />
        <meta property="og:description" content="Can you guess the hex code for these Crocs?" />
        <meta property="og:image" content="${url}/og" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image:alt" content="Can you guess the hex code for these Crocs?">
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Crocss" />
    
      </head>
      <body>
        <header>
          <h1><a href="/">Crocss</a></h1>
          <p>Can you guess the hex code for these Crocs?</p>
          <p><a href="/">All the Crocs</a> | <a href="/guesses">All the guesses</a></p>
        </header>
        <main>
          ${content}
        </main>
        <footer>
          
          <p>Hosted by <a href="https://deno.com/deploy">Deno Deploy</a></p>
          ${footer}

          <p>
            Clone <a href=" https://github.com/philhawksworth/crocss">this repo</a> as an example to play with on Deno Deploy by clicking the button below.
          </p>
          <p>
            <a href="https://app.deno.com/new?clone=https://github.com/philhawksworth/crocss&build=deno%20task%20build&entrypoint=main.ts&mode=dynamic&args=--allow-read%20--allow-net%20--allow-env%20--unstable-kv%20--allow-ffi">
              <img eleventy:ignore src="https://deno.com/button" alt="Deploy on Deno Deploy">
            </a>
          </p>
        
        </footer>


        
      </body>
    </html>`;
}
