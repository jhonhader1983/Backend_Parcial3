const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ❌ Eliminar db.setup()

// ✅ Usar nombres reales desde models.js
app.post('/roles', db.addRol);
app.get('/roles', db.getRoles);
app.post('/usuarios', db.addUser);
app.get('/usuarios', db.getUsuarios);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
