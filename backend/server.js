const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appointmentsRoutes = require('./routes/appointments');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/appointments', appointmentsRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
