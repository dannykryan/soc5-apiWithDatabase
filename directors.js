// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getDirectors() {
  // Query the database and return all directors
  const queryText = "SELECT * FROM directors";
  const result = await pool.query(queryText);
  return result.rows || null;
}

export async function getDirectorById(id) {
  // Query the database and return the director with a matching id or null
  const queryText = "SELECT * FROM directors WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createDirector(director) {
  // Query the database to create an director and return the newly created director
  const queryText = `
  INSERT INTO directors (first_name, last_name)
  VALUES ($1, $2)`;
  const result = await pool.query(queryText, [
    director.first_name,
    director.last_name,
  ]);

  return result.rows[0] || null;
}

export async function updateDirectorById(id, updates) {
  // Query the database to update an director and return the newly updated director or null

  const queryText = `UPDATE directors
SET first_name = $1, last_name = $2
WHERE id = $3`;
  const result = await pool.query(queryText, [
    updates.first_name,
    updates.last_name,
    id,
  ]);
  return (
    {
      id: `${id}`,
      first_name: updates.first_name,
      last_name: updates.last_name,
    } || null
  );
}

export async function deleteDirectorById(id) {
  // Query the database to delete an director and return the deleted director or null

  const queryText = `
  DELETE FROM directors
  WHERE id = $1`;
  const result = await pool.query(queryText, [id]);
  return `Director id:${id} was successfully deleted.`;
}
