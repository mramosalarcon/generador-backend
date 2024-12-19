const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:8000' }));

// Ruta principal (prueba inicial)
app.get('/', (req, res) => {
  res.send('El servidor está funcionando correctamente.');
});

// Ruta para generar la aplicación
app.post('/generate', async (req, res) => {
  const { type, appName, theme, features } = req.body;

  // Verifica si los datos necesarios están presentes
  if (!appName || !theme || !type) {
    return res.status(400).send('Faltan datos requeridos');
  }

  console.log('Datos recibidos:', { type, appName, theme, features });

  const templatePath = path.join(__dirname, 'templates', type); // Ruta del arquetipo base
  const outputPath = path.join(__dirname, 'output', appName);     // Ruta de salida
  const zipPath = `${outputPath}.zip`;                           // Ruta del archivo ZIP

  try {
    // Copiar la plantilla base al directorio de salida
    await fs.copy(templatePath, outputPath);

    // Personalizar el archivo de configuración
    const configPath = path.join(outputPath, 'config.json');
    const configData = { appName, theme, features };
    await fs.writeJson(configPath, configData);

    // Crear un archivo ZIP con el contenido generado
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip');

    archive.pipe(output);
    archive.directory(outputPath, false);
    archive.pipe(res);

    await archive.finalize();

    // Enviar el archivo ZIP al cliente
    res.download(zipPath, `${appName}.zip`, () => {
      // Eliminar archivos temporales después de descargar
      fs.remove(outputPath);
      fs.remove(zipPath);
    });
  } catch (error) {
    console.error('Error al generar la aplicación:', error);
    res.status(500).send('Hubo un error al generar la aplicación.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
