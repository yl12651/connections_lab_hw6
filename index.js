const express = require('express');
const path = require('path');
const app = express();

const pokemonData = {
  pokemon: [

    { name: "Bulbasaur", gen: 1, type: ["Grass", "Poison"], pokedex: "https://www.pokemon.com/us/pokedex/bulbasaur" },
    { name: "Charmander", gen: 1, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/charmander" },
    { name: "Squirtle", gen: 1, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/squirtle" },

    { name: "Chikorita", gen: 2, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/chikorita" },
    { name: "Cyndaquil", gen: 2, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/cyndaquil" },
    { name: "Totodile", gen: 2, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/totodile" },

    { name: "Treecko", gen: 3, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/treecko" },
    { name: "Torchic", gen: 3, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/torchic" },
    { name: "Mudkip", gen: 3, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/mudkip" },

    { name: "Turtwig", gen: 4, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/turtwig" },
    { name: "Chimchar", gen: 4, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/chimchar" },
    { name: "Piplup", gen: 4, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/piplup" },

    { name: "Snivy", gen: 5, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/snivy" },
    { name: "Tepig", gen: 5, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/tepig" },
    { name: "Oshawott", gen: 5, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/oshawott" },

    { name: "Chespin", gen: 6, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/chespin" },
    { name: "Fennekin", gen: 6, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/fennekin" },
    { name: "Froakie", gen: 6, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/froakie" },

    { name: "Rowlet", gen: 7, type: ["Grass", "Flying"], pokedex: "https://www.pokemon.com/us/pokedex/rowlet" },
    { name: "Litten", gen: 7, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/litten" },
    { name: "Popplio", gen: 7, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/popplio" },

    { name: "Grookey", gen: 8, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/grookey" },
    { name: "Scorbunny", gen: 8, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/scorbunny" },
    { name: "Sobble", gen: 8, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/sobble" },

    { name: "Sprigatito", gen: 9, type: ["Grass"], pokedex: "https://www.pokemon.com/us/pokedex/sprigatito" },
    { name: "Fuecoco", gen: 9, type: ["Fire"], pokedex: "https://www.pokemon.com/us/pokedex/fuecoco" },
    { name: "Quaxly", gen: 9, type: ["Water"], pokedex: "https://www.pokemon.com/us/pokedex/quaxly" }
  ]
};


// Static HTML "/"
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route 2: "/data"
app.get('/data', (_req, res) => {
  res.json(pokemonData);
});

// Route 3: "/data/:name"
app.get('/data/:name', (req, res) => {
  const nameParam = (req.params.name || '').toLowerCase();
  const match = pokemonData.pokemon.find(p => p.name.toLowerCase() === nameParam);
  if (!match) return res.status(404).json({ error: `Pokémon '${req.params.name}' not found.` });
  res.json(match);
});

// "/random" → redirect to "/data/:name"
app.get('/random', (_req, res) => {
  const starters = pokemonData.pokemon;
  const pick = starters[Math.floor(Math.random() * starters.length)];
  res.redirect(302, `/data/${encodeURIComponent(pick.name)}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
