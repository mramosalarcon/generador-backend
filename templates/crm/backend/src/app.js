const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/clients', clientRoutes);

module.exports = app;
