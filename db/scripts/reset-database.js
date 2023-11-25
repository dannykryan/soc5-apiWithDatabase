// Import the pool object from a module located in the parent directory
import { pool } from "../index.js";

//create a function that will reset the database
async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS movies CASCADE;
      DROP TABLE IF EXISTS directors CASCADE;
    `);

    // Create the directors table
    await pool.query(`
      CREATE TABLE directors (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL
      );
    `);

    // Create the movies table with a foreign key to the directors table
    await pool.query(`
      CREATE TABLE movies (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        rating FLOAT,
        release_year INT,
        genre VARCHAR(255),
        link VARCHAR(255),
        director_id INT REFERENCES movies(id)
      );
    `);

    // Seed the directors table
    await pool.query(`
      INSERT INTO directors (first_name, last_name)
      VALUES 
        ('Martin', 'Scorsese'),
        ('Alfred', 'Hitchcock'),
        ('Tim', 'Burton'),
        ('Kathryn', 'Bigelow'),
        ('Christopher', 'Nolan'),
        ('James', 'Cameron');
    `);

    // Seed the movies table
    await pool.query(`
      INSERT INTO movies (title, rating, release_year, genre, link, director_id)
      VALUES 
        ('Goodfellas', 8.7, 1990, 'crime', 'https://www.imdb.com/title/tt0099685/?ref_=nm_knf_c_3', 1),
        ('Psycho', 8.5, 1960, 'thriller', 'https://www.imdb.com/title/tt0054215/?ref_=nm_knf_t_1', 2),
        ('Pulp Fiction', 8.9, 1994, 'crime', 'https://www.imdb.com/title/tt0110912/?ref_=nm_knf_t_2', 3),
        ('Resevoir Dogs', 8.3, 1992, 'crime', 'https://www.imdb.com/title/tt0105236/?ref_=nm_knf_t_1', 4),
        ('Sweeny Todd', 7.3, 2007, 'drama', 'https://www.imdb.com/title/tt0408236/?ref_=nm_knf_t_4', 5),
        ('The Hurt Locker', 7.8, 2005, 'war', 'https://www.imdb.com/title/tt0887912/?ref_=nm_knf_t_1', 6),
        ('Interstellar', 8.7, 2014, 'sci-fi', 'https://www.imdb.com/title/tt0816692/?ref_=nm_flmg_c_4_wr', 7),
        ('The Dark Knight', 9, 2008, 'action', 'https://www.imdb.com/title/tt0468569/?ref_=nm_flmg_t_9_wr', 8),
        ('Inception', 8.8, 2010, 'action', 'https://www.imdb.com/title/tt1375666/?ref_=nm_flmg_t_8_wr', 9),
        ('Titanic', 7.9, 1997, 'drama', 'https://www.imdb.com/title/tt0120338/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_titanic', 10),
        ('Avatar', 7.9, 2009, 'action', 'https://www.imdb.com/title/tt0499549/?ref_=nm_knf_t_2', 11);
    `);
    //if a database connection successfull log a message to the console
    console.log("Database reset successful");
    //handle errors
  } catch (error) {
    //if a database connection failed log a message to the console and throw an error
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}
//call the function above
await resetDatabase();
