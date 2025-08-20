# Crocs

Can you guess the hex code of these Crocs?

https://crocss.philhawksworth.deno.net/

_Dammit. This totally should have been called "What the heck's the hex?"_.

## Why?

It's a bit of fun, but mostly this is an example site to demonstrate accessing data services on [Deno Deploy](https://deno.com/deploy) using [Deno KV](https://docs.deno.com/deploy/kv/manual/).

## How?

The site is built using [Hono](https://hono.dev/) to simplify a little routing, and JavaScript templates to deliver pages. For convenience, a build step is used to generate some JSON to describe all the images of Crocs that exist in an assets directory. Nothing fancy.

### Database

By default, the site uses Deno KV to store and retrieve the hex code guesses for the colours of the various Crocs. This will "just work" when running locally (data will not persist beyond the local session, but will be held in memory for easy testing). To persist data on Deno Deploy, you should create a KV data store in the Databases section of your Deno Deploy EA admin dashboard and allocate it to this application.

The example can also be converted to use a PostgreSQL database in Deno Deploy by creating and allocating a database, then swapping the abstracted database API layer in `main.ts` like so:

```diff
import {
  addCrocColor,
  footerInfo,
  getAllCrocs,
  getCrocColors,
  getAllGuesses,
-  } from "./api-kv.ts"; // Use Deno KV for the database
+ } from "./api-postgres.ts"; // Use PostgreSQL for the database
```

## Quickly deploy and try

You can clone this repo and use your copy as the source for a new site on Deno Deploy, all with a few clicks, starting by clicking the button below. You'll need to have an account on Deno Deploy and an organisation created to use Deploy EA (available for free). Clicking the button will guide you through.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/philhawksworth/crocss&build=deno%20task%20build&entrypoint=main.ts&mode=dynamic&args=--allow-read%20--allow-net%20--allow-env%20--unstable-kv%20--allow-ffi)