import { Hono } from "hono";
import { serveStatic } from 'hono/deno'
import Layout from "./partials/layout.js";
import CrocsPage from "./partials/crocPage.js";
import crocs from "./crocs.json" with { type: "json" };



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

const app = new Hono();

// Static assets
app.use('/public/*', serveStatic({ root: './' }))

// Home page
app.get('/', async (c) => {
  return c.html(Layout({ content: listing(crocs) }));
})

// view a crocs page
app.get('/croc/:name', (c) => {
  const name = `${c.req.param('name')}`
  const data = crocs.find(c => c.slug === name);
  const html = CrocsPage({ name: data.name, imageUrl: data.url });
  return c.html(Layout({ content: html }));
});



Deno.serve(app.fetch);