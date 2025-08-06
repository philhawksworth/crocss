import { Hono } from "hono";
import { serveStatic } from 'hono/deno'
import Layout from "./partials/layout.js";
import CrocsPage from "./partials/crocPage.js";
import crocs from "./crocs.json" with { type: "json" };
import { Pool } from "npm:pg";

const pool = new Pool();
const app = new Hono();

// Ensure the DB strcutre in all environments is correct
await pool.query(`
  CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    path VARCHAR(100),
    color VARCHAR(7)
  )
`);


const listing = (crocs: any[]) => {
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
  const result = await pool.query("SELECT * FROM entries WHERE path = $1", [name]);
  const colors = result.rows.map(row => row.color);
  return CrocsPage({ name: data.name, imageUrl: data.url, slug: name, colors: colors, guess: guess });
}



// Static assets
app.use('/public/*', serveStatic({ root: './' }))

// Home page
app.get('/', async (c) => {
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
  const data = crocs.find(c => c.slug === name);

  //insert the colour into the DB
  const body = await c.req.parseBody();
  let colour = body['colour'];
  
  // Ensure the colour is a valid hex code
  if (colour.charAt(0) !== '#') {
    colour = '#' + colour;
  }
  if (!colour.match(/^#([0-9a-fA-F]{6})$/)) {
    return c.html(Layout({ content: `Invalid colour: ${colour}` }));
  }

  const result = await pool.query("INSERT INTO entries (path, color) VALUES ($1, $2)", [name, colour]);
  
  // View the page
  return c.redirect(`/croc/${name}/guess/${colour.replace('#','')}`)
  // const html = await getCrocPage(name, colour);
  // return c.html(Layout({ content: html, themeColor: colour }));
});

Deno.serve(app.fetch);