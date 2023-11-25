// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getMovies() {
  // Query the database and return all movies
  // Define the SQL query to fetch all movies from the 'movies' table
  const queryText = "SELECT * FROM movies";
  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);
  // The rows property of the result object contains the retrieved records
  return result.rows || null;
}

export async function getMovieById(id) {
  // Query the database and return the movie with a matching id or null
  // Define the SQL query to fetch the movie with the specified id from the 'movies' table
  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  // The rows property of the result object contains the retrieved records
  // If a movie with the specified id exists, it will be the first element in the rows array
  // If no movie exists with the specified id, the rows array will be empty
  const queryText = "SELECT * FROM movies WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function getMoviesByGenre(genre) {
  const queryText = `SELECT * FROM movies WHERE genre = $1`;
  const result = await pool.query(queryText, [genre]);
  return result.rows || null;
}

export async function createMovie(movie) {
  // Query the database to create a movie and return the newly created movie
  const queryText = `
  INSERT INTO directors (title, rating, release_year, genre, link, director_id)
  VALUES ($1, $2, $3, $4, $5, $6)`;
  const result = await pool.query(queryText, [
    movies.title,
    movies.rating,
    movies.release_year,
    movies.genre,
    movies.link,
    movies.director_id,
  ]);
  return result.rows[0] || null;
}

export async function updateMovieById(id, updates) {
  // Query the database to update a movie and return the newly updated movie or null
  const queryText = `
  UPDATE books
  SET title = $1, rating = $2, release_year = $3, genre= $4, link = $5, director_id = $6
  WHERE id = $4`;
  const result = await pool.query(queryText, [
    movies.title,
    movies.rating,
    movies.release_year,
    movies.genre,
    movies.link,
    movies.director_id,
  ]);
  return result.rows[0] || null;
}

export async function deleteMovieById(id) {
  // Query the database to delete a movie and return the deleted movie or null
  const queryText = `
  DELETE FROM movies
  WHERE id = $1`;
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}
