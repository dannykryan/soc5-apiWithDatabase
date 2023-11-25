// Import the required modules
import express from "express";
import morgan from "morgan";

// Import director-related helper functions
import {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirectorById,
  deleteDirectorById,
} from "./directors.js";

// Import Movie-related helper functions
import {
  getMovies,
  getMovieById,
  getMoviesByGenre,
  createMovie,
  updateMovieById,
  deleteMovieById,
} from "./movies.js";

// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Director Route Handlers

app.get("/directors", async (req, res) => {
  const directors = await getDirectors();
  res.status(200).json({ status: "success", data: directors });
});

app.get("/directors/:id", async (req, res) => {
  const director = await getDirectorById(req.params.id);
  res.status(200).json({ status: "success", data: director });
});

app.post("/directors", async (req, res) => {
  const newDirector = await createDirector(req.body);
  res.status(201).json({ status: "success", data: req.body });
});

app.patch("/directors/:id", async (req, res) => {
  const updatedDirector = await updateDirectorById(req.params.id, req.body);
  res.status(200).json({ status: "success", data: updatedDirector });
});

app.delete("/directors/:id", async (req, res) => {
  const deletedDirector = await deleteDirectorById(req.params.id);
  res.status(200).json({ status: "success", data: deletedDirector });
});

// Movie requests

app.get("/movies", async (req, res) => {
  if (req.query.genre) {
    const { genre } = req.query;
    const moviesByGenre = await getMoviesByGenre(genre);

    if (moviesByGenre.length > 0) {
      const response = {
        status: "success",
        data: moviesByGenre,
      };
      res.status(200).json(response);
    } else {
      const response = {
        status: "error",
        data: "No movie found with that genre",
      };
      res.status(404).json(response);
    }
  } else {
    const movies = await getMovies();
    res.status(200).json({ status: "success", data: movies });
  }
});

app.get("/movies/:id", async (req, res) => {
  const movie = await getMovieById(req.params.id);
  res.status(200).json({ status: "success", data: movie });
});

app.post("/movies", async (req, res) => {
  const newMovie = await createMovie(req.body);
  res.status(201).json({ status: "success", data: req.body });
});

app.patch("/movies/:id", async (req, res) => {
  const updatedMovie = await updateMovieById(req.params.id, req.body);
  res.status(200).json({ status: "success", data: updatedMovie });
});

app.delete("/movies/:id", async (req, res) => {
  const deletedMovie = await deleteMovieById(req.params.id);
  res.status(200).json({ status: "success", data: deletedMovie });
});

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}.`);
});
