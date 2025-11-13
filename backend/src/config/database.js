const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos: ', err);
      console.log('Reintentando conexión en 5 segundos...');
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Conectado a MySQL');
    }
  });
};

connectWithRetry();

module.exports = db;
