const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      identificacion TEXT NOT NULL,
      correo TEXT NOT NULL,
      rol_id INTEGER NOT NULL,
      FOREIGN KEY (rol_id) REFERENCES roles(id)
    )
  `);
})();

const getRoles = async (req, res) => {
  const roles = await db.all('SELECT * FROM roles');
  res.json(roles);
};

const addRol = async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) return res.status(400).json({ error: "Todos los campos son requeridos" });

  try {
    await db.run("INSERT INTO roles (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
    res.status(201).json({ message: "Rol agregado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarios = async (req, res) => {
  const usuarios = await db.all(`
    SELECT
      usuarios.nombres || ' ' || usuarios.apellidos AS nombre_completo,
      roles.nombre AS rol
    FROM usuarios
    JOIN roles ON usuarios.rol_id = roles.id
  `);
  res.json(usuarios);
};


const addUser = async (req, res) => {
  const { nombres, apellidos, identificacion, correo } = req.body;
  const rol_id = parseInt(req.body.rol_id); // 👈 Conversión segura

  if (!nombres || !apellidos || !identificacion || !correo || !rol_id)
    return res.status(400).json({ error: "Todos los campos son requeridos" });

  try {
    await db.run(
      "INSERT INTO usuarios (nombres, apellidos, identificacion, correo, rol_id) VALUES (?, ?, ?, ?, ?)",
      [nombres, apellidos, identificacion, correo, rol_id]
    );
    res.status(201).json({ message: "Usuario agregado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRoles,
  addRol,
  getUsuarios,
  addUser
};
