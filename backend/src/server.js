const express = require('express');
const cors = require('cors');
const mainRouter = require('./routes');

require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
