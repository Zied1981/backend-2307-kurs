import dotenv from "dotenv";
import express from "express";

import { MoviesAPI } from "./nichtUnserCode/fake_moviedatabase.js";

dotenv.config();

const app = express();

app.get("/movies", (req, res) => {
  MoviesAPI(process.env.API_KEY)
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).json(err));
});

const PORT = 3005;
app.listen(PORT, () => console.log("Server ready at port", PORT));
