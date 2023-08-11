// Importa las bibliotecas necesarias
var mysql=require('mysql');

const express = require('express');
const bodyParser = require('body-parser');

// Configura la conexión a la base de datos MySQL
const connectionConfig = {

};
var connection=mysql.createConnection(connectionConfig);
// Crea la conexión a la base de datos
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});
// Crea una aplicación de Express
const app = express();

// Permite que la aplicación analice datos en formato JSON
app.use(bodyParser.json());

// Define el endpoint para recibir solicitudes POST a /reference/create
app.post('/reference/create', async (req, res) => {
  try {
    const {  authors, title, pages, textReference, userName } = req.body;
    console.log(req.body);

    // Inserta los datos en la base de datos
    const sql = `
      INSERT INTO referencess (id, date, authors, title, pages, textReference, userName)
      VALUES (NULL, CURRENT_TIMESTAMP , '${authors}', '${title}', '${pages}', '${textReference}', '${userName}');
    `;

    // simple query
    connection.query(
      sql,
      function(err, results, fields) {
        if(err) throw err;

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        res.status(201).json({ message: 'Referencia creada exitosamente.' });
      }
    );

  } catch (error) {
    console.error('Error al crear la referencia:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear la referencia.' });
  }


});
// Define el endpoint para recibir solicitudes GET a /references
app.get('/references', async (req, res) => {
  try {
    // Obtiene todas las referencias de la base de datos
    const sql = `
      SELECT * FROM referencess;
    `;

    // simple query
    connection.query(
      sql,
      function(err, results, fields) {
        if(err) throw err;

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        res.status(200).json(results);
      }
    );

  } catch (error) {
    console.error('Error al obtener las referencias:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener las referencias.' });
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
