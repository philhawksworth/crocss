import crocs from "./crocs.json" with { type: "json" };
import { Pool } from "npm:pg";

const pool = new Pool();

// Ensure the DB strcutre in all environments is correct
await pool.query(`
  CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    path VARCHAR(100),
    color VARCHAR(7)
  )
`);

// return our known list of crocs
export const getAllCrocs = () => {
  return crocs;
};

// get the colours suggested for a given pair of crocs
export const getCrocColors = async (slug: string) => {
  const result = await pool.query("SELECT * FROM entries WHERE path = $1", [
    slug,
  ]);
  return result.rows.map((row: { color: string }) => row.color);
};

// insert a colour for a given pair of crocs
export const addCrocColor = async (slug: string, color: string) => {
  await pool.query("INSERT INTO entries (path, color) VALUES ($1, $2)", [
    slug,
    color,
  ]);
};

// footer info for the page
export const footerInfo = () => {
  return `
  <p>
    Database integration provided by <a href="https://neon.com">Neon DB</a>
  </p>
  `;
};
