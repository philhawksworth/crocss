import { Hono } from "hono";
import { cache } from 'hono/cache'
import { serveStatic } from "hono/deno";
import Layout from "./partials/layout.ts";
import CrocsPage from "./partials/crocPage.ts";
import OG from "./partials/og.ts";
import swatch from "./partials/swatch.ts";

// API functions for data operations
import {
  addCrocColor,
  footerInfo,
  getAllCrocs,
  getCrocColors,
  getAllGuesses,
} from "./api-kv.ts"; // Use Deno KV for the database
// import {
//   addCrocColor,
//   footerInfo,
//   getAllCrocs,
//   getCrocColors,
//   getAllGuesses,
// } from "./api-postgres.ts"; // Use Postgres for the database


const app = new Hono();

// Get the list of crocs
const crocs = getAllCrocs();

const listing = (crocs: { name: string; slug: string; url: string }[]) => {

  return `
  <section class="crocs-thumbnails">
    ${
    crocs.map((c) => `
      <a href="/croc/${c.slug}" class="thumbnail">
        <img src="/${c.url}" alt="${c.name}">
        <h2>${c.name}</h2>
      </a>
      `).join("")
  }
    </section>
`;
};

// Populate a page for a croc with the colours guessed so far
const getCrocPage = async (name: string, url: string, guess?: string,) => {
  const data = crocs.find((c) => c.slug === name);
  if (!data) {
    throw new Error(`Croc with slug ${name} not found.`);
  }

  // Get the colours guessed so far
  const colors = await getCrocColors(name);
  return CrocsPage({
    name: data.name,
    imageUrl: data.url,
    slug: name,
    colors: colors,
    guess: guess || null,
    url: url,
  });
};

// caching on static assets
app.get(
  '/public/css/styles.css?v=*',
  cache({
    cacheName: 'crocss-static-assets',
    cacheControl: 'immutable'
  })
)

// Static assets
app.use("/public/*", serveStatic({ root: "./" }));



// Home page
app.get("/",  (c) => {
  return c.html(Layout({ content: listing(crocs), url: c.req.url, footer: footerInfo() }));
});

// view a crocs page
app.get("/croc/:name", async (c) => {
  const name = `${c.req.param("name")}`;
  const html = await getCrocPage(name, c.req.url);
  return c.html(Layout({ content: html, url: c.req.url, footer: footerInfo() }));
});

// view a crocs page
app.on("GET", ["/croc/:name/guess/:colour", "/croc/:name/is/:colour" ], async (c) => {
  const name = `${c.req.param("name")}`;
  const colour = `${c.req.param("colour")}`;
  const html = await getCrocPage(name, c.req.url, colour);
  return c.html(Layout({ content: html, url: c.req.url, footer: footerInfo() }));
});


// view a crocs page OG image
app.on("GET", ["/croc/:name/guess/:color/og", "/croc/:name/is/:color/og", "/croc/:name/og"], (c) => {
  const name = `${c.req.param("name")}`;
  const color = `${c.req.param("color")}`;

  // get the image url for this pair of croc
  const data = crocs.find((c) => c.slug === name);
  if (!data) {
    throw new Error(`Croc with slug ${name} not found.`);
  }
  const image = OG(data.url, color);
  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
    },
  });
});

// guess a colour for a crocs page
app.post("/croc/:name", async (c) => {
  const name = `${c.req.param("name")}`;

  //insert the colour into the DB
  const body = await c.req.parseBody();
  let colour = body["colour"] as string;

  // Ensure the colour is a valid hex code
  if (colour.charAt(0) !== "#") {
    colour = "#" + colour;
  }
  if (!colour.match(/^#([0-9a-fA-F]{6})$/)) {
    return c.html(
      Layout({ content: `Invalid colour: ${colour}`, url: c.req.url, footer: footerInfo() }),
    );
  }

  // save the suggested colour
  await addCrocColor(name, colour);

  // View the page
  return c.redirect(`/croc/${name}/guess/${colour.replace("#", "")}`);
});

// view a crocs page
app.get("/guesses", async (c) => {

  const guesses = await getAllGuesses();
  const html = `<h2>All the guesses</h2>
  <div class="swatch-items">
    ${guesses.sort(() => Math.random() - 0.5).map((g) => swatch(g)).join("")}
  </div>
  `;
  return c.html(Layout({ content: html, url: c.req.url, footer: footerInfo() }));
});


Deno.serve(app.fetch);
