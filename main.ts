import { Hono } from "hono";
import { serveStatic } from 'hono/deno'
import Layout from "./partials/layout.js";
import CrocsPage from "./partials/crocPage.js";

// API functions for data operations
import { getAllCrocs, getCrocColors, addCrocColor } from "./api-kv.ts"; // Use Deno KV for the database
// import { getAllCrocs, getCrocColors, addCrocColor } from "./api-postgres.ts"; // Use Postgres for the database


const app = new Hono();

// Get the list of crocs
const crocs = getAllCrocs();




const listing = (crocs: { name: string; slug: string; url: string }[]) => {
  return `
  <section class="crocs-thumbnails">
    ${crocs.map(c => `
      <a href="/croc/${c.slug}" class="thumbnail">
        <img src="/${c.url}" alt="${c.name}">
        <h2>${c.name}</h2>
      </a>
      `
    ).join('')}
    </section>
`;
}

// Populate a page for a croc with the colours guessed so far
const getCrocPage = async (name: string, guess?: string) => {
  const data = crocs.find(c => c.slug === name);
  if (!data) {
    throw new Error(`Croc with slug ${name} not found.`);
  }

  // Get the colours guessed so far
  const colors = await getCrocColors(name);
  return CrocsPage({ name: data.name, imageUrl: data.url, slug: name, colors: colors, guess: guess });
}



// Static assets
app.use('/public/*', serveStatic({ root: './' }))

// Home page
app.get('/', (c) => {
  return c.html(Layout({ content: listing(crocs) }));
})

// view a crocs page
app.get('/croc/:name', async (c) => {
  const name = `${c.req.param('name')}` 
  const html = await getCrocPage(name);
  return c.html(Layout({ content: html }));
});

// view a crocs page
app.get('/croc/:name/guess/:colour', async (c) => {
  const name = `${c.req.param('name')}` 
  const colour = `${c.req.param('colour')}` 
  const html = await getCrocPage(name, colour);
  return c.html(Layout({ content: html }));
});

// guess a colour for a crocs page
app.post('/croc/:name', async (c) => {
  const name = `${c.req.param('name')}`
  
  //insert the colour into the DB
  const body = await c.req.parseBody();
  let colour = body['colour'] as string;
  
  // Ensure the colour is a valid hex code
  if (colour.charAt(0) !== '#') {
    colour = '#' + colour;
  }
  if (!colour.match(/^#([0-9a-fA-F]{6})$/)) {
    return c.html(Layout({ content: `Invalid colour: ${colour}` }));
  }

  // save the suggested colour
  await addCrocColor(name, colour);
  
  // View the page
  return c.redirect(`/croc/${name}/guess/${colour.replace('#','')}`)

});

Deno.serve(app.fetch);