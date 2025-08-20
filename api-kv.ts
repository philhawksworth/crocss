import crocs from "./crocs.json" with { type: "json" };

interface Croc {
  path: string;
  colors: string[];
}

const kv = await Deno.openKv();


// clean up some mess
const result = await kv.list<Croc>({ prefix: ["crocs"] });
for await (const entry of result) {
  
{
  entry.value.colors = entry.value.colors.filter((color) => color !== "#ffffff");
  entry.value.colors = entry.value.colors.filter((color) => color !== "#000000");

  const a: Croc = {
    path: entry.value.path,
    colors: entry.value.colors,
  };
  await kv.set(["crocs", a.path], a);

}}



// return our known list of crocs
export const getAllCrocs = () => {
  return crocs;
};

// get the colours suggested for a given pair of crocs
export const getCrocColors = async (slug: string) => {
  const result = await kv.get<Croc>(["crocs", slug]);
  return result.value?.colors || [];
};

// insert a colour for a given pair of crocs
export const addCrocColor = async (slug: string, color: string) => {
  const existing = await getCrocColors(slug);
  const a: Croc = {
    path: slug,
    colors: [...existing, color],
  };
  await kv.set(["crocs", a.path], a);
};

// get all guesses
export const getAllGuesses = async () => {
  const result = await kv.list<Croc>({ prefix: ["crocs"] });
  const guesses = [];
  for await (const entry of result) {
    guesses.push(...entry.value.colors);
  }
  return guesses || [];
};

// footer info for the page
export const footerInfo = () => {
  return `
  <p>
    Database integration provided by <a href="https://deno.com/deploy#kv">Deno KV</a>
  </p>
  `;
};
