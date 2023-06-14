const express = require('express');
const bodyParser = require('body-parser');
const playersData = require('./players.json');

const app = express();
app.use(bodyParser.json());

// Retrieve all players
app.get('/players', (req, res) => {
  res.status(200).json(playersData);
});

// Add a new player
app.post('/players', (req, res) => {
  const newPlayer = req.body;
  playersData.push(newPlayer);
  res.status(201).json({ message: 'Player added successfully', player: newPlayer });
});

// Update a player
app.put('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const updatedPlayer = req.body;
  const playerIndex = playersData.findIndex(player => player.player_id === playerId);

  if (playerIndex !== -1) {
    playersData[playerIndex] = { ...playersData[playerIndex], ...updatedPlayer };
    res.status(200).json({ message: 'Player updated successfully', player: playersData[playerIndex] });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});


// Delete a player
app.delete('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  const playerIndex = playersData.findIndex(player => player.player_id === playerId);

  if (playerIndex !== -1) {
    const deletedPlayer = playersData.splice(playerIndex, 1);
    res.status(200).json({ message: 'Player deleted successfully', player: deletedPlayer });
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});


// Get the player with the most touchdown passes
app.get('/players/most-touchdown-passes', (req, res) => {
  const player = playersData.reduce((max, curr) => curr.touchdownsThrown > max.touchdownsThrown ? curr : max);
  res.status(200).json(player);
});

// Get the player with the most rushing yards
app.get('/players/most-rushing-yards', (req, res) => {
  const player = playersData.reduce((max, curr) => curr.rushingYards > max.rushingYards ? curr : max);
  res.status(200).json(player);
});

// Get the player with the least rushing yards
app.get('/players/least-rushing-yards', (req, res) => {
  const player = playersData.reduce((min, curr) => curr.rushingYards < min.rushingYards ? curr : min);
  res.status(200).json(player);
});

// Get a list of players sorted by most to fewest field goals made
app.get('/players/most-to-fewest-field-goals', (req, res) => {
  const players = playersData.sort((a, b) => b.fieldGoalsMade - a.fieldGoalsMade);
  res.status(200).json(players);
});

// Get the player with the most number of sacks
app.get('/players/most-sacks', (req, res) => {
  const player = playersData.reduce((max, curr) => curr.sacks > max.sacks ? curr : max);
  res.status(200).json(player);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
