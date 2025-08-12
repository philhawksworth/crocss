import { Croc } from "./model.ts";
import crocs from "./crocs.json" with { type: "json" };


const kv = await Deno.openKv();


// return our known list of crocs
export const getAllCrocs = () => {
  return crocs;
}

// get the colours suggested for a given pair of crocs
export const getCrocColors = async (slug: string) => {
  const result = await kv.get<Croc>(["crocs", slug]);
  return result.value?.colors || [];
}

// insert a colour for a given pair of crocs
export const addCrocColor = async (slug: string, color: string) => {
  const existing = await getCrocColors(slug);
  const a: Croc = {
    path: slug,
    colors: [...existing, color],
  };
  await kv.set(["crocs", a.path], a);
}

// footer info for the page
export const footerInfo = () => {
  return `
  <p>
    Database integration provided by <a href="https://deno.com/deploy#kv">Deno KV</a>
  </p>
  `
}