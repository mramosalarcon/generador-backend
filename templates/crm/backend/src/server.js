const app = require('./app');
const connectDB = require('./database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
