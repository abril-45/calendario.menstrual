const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_super_secret_key';

const createUser = async (req, res) => {
  const { nombre, password, email } = req.body;

  if (!nombre || !password || !email) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO usuario (nombre, password, email) VALUES (?, ?, ?)';
    db.query(query, [nombre, hashedPassword, email], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'El correo ya está registrado' });
        }
        return res.status(500).json({ message: 'Error al crear el usuario', error: err });
      }
      res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en la creación del usuario' });
  }
};

const getUsers = (req, res) => {
  db.query('SELECT id, nombre, email FROM usuario', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    res.json(results);
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, password } = req.body;

  if (!nombre || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('UPDATE usuario SET nombre = ?, password = ? WHERE id = ?', [nombre, hashedPassword, id], (err) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
      res.json({ message: 'Usuario actualizado' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuario WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
    res.json({ message: 'Usuario eliminado' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Faltan datos' });

  db.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor', error: err });
    if (results.length === 0) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  });
};

module.exports = { createUser, getUsers, updateUser, deleteUser, login };
