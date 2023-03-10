const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const { v4: uuidv4 } = require('uuid')

app.use(cors());
app.use(express.json());

let movies = [
    { id: uuidv4(), title: 'The Godfather', year: 1972, director: 'Francis ford Coppola', genre: 'Crime, Drama' },
    { id: uuidv4(), title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabnot', genre: 'Drama' },
    { id: uuidv4(), title: 'The Dark Knight', year: 2000, director: 'Christopher Nolan', genre: 'Action, Crime, Drama' },
];

 app.get('/movies', (req, res) => {
    res.json(movies)
 });
 
 app.get('/movies', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie = movie.id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('movie not found');     
    }
 });

 app.post('/movies', (req, res) =>{
    const movie = req.body;
    if (!movie.title || !movie.director || !movie.genre || !movie.year ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    movies.id = uuidv4();
    movies.push(movie);
    res.json(movie);
 });
 


 
 // Endpoint para obtener una película por su ID
/* app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send('movie not found');
    }
  });
 */
  app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movieId = movies.find(movie => movie.id === id);
    if (movieId === -1) {
        return res.status(404).send('Movie not found');
    }
    const updatedMovie = { ...movies[movieId], ...req.body };
    movies[movieId] = updatedMovie;
    res.json(updatedMovie);
});


app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index === -1) {
        return res.status(404).send('Movie not found');
    }
    movies.splice(index, 1);
    res.status(204).send();
});

 const PORT = 3001;
 app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
 });
