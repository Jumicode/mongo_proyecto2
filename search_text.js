const { MongoClient } = require('mongodb');

// URI de conexión a MongoDB (ajusta si tu servidor está en una dirección diferente)
const uri = "mongodb://0.0.0.0:27017";

// Función principal
async function textSearchQueries() {
  // Crear una nueva instancia del cliente MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectar al servidor MongoDB
    await client.connect();

    console.log("Conectado a MongoDB");

    // Seleccionar la base de datos y la colección
    const db = client.db('Club_Video');
    const collection = db.collection('movies');

    // Crear un índice de texto en el campo `synopsis`
    await collection.createIndex({ sinopsis: "text" });
    console.log("Índice de texto creado en el campo synopsis");

    // Buscar películas cuya sinopsis contenga la palabra "Bilbo"
    const bilboMovies = await collection.find({ $text: { $search: "Bilbo" } }).toArray();
    console.log("Películas cuya sinopsis contiene la palabra 'Bilbo':");
    console.log(bilboMovies);

    // Buscar películas cuya sinopsis contenga las palabras "Bilbo" y "Gandalf"
    const bilboGandalfMovies = await collection.find({ $text: { $search: "Bilbo Gandalf" } }).toArray();
    console.log("Películas cuya sinopsis contiene las palabras 'Bilbo' y 'Gandalf':");
    console.log(bilboGandalfMovies);

    // Buscar películas cuya sinopsis contenga las palabras "dwarves" o "hobbit"
    const dwarvesOrHobbitMovies = await collection.find({ $text: { $search: "Dwarves Hobbit" } }).toArray();
    console.log("Películas cuya sinopsis contiene las palabras 'dwarves' o 'hobbit':");
    console.log(dwarvesOrHobbitMovies);

    // Buscar películas cuya sinopsis contenga las palabras "gold" y "dragon"
    const goldAndDragonMovies = await collection.find({ $text: { $search: "\"gold\" \"dragon\"" } }).toArray();
    console.log("Películas cuya sinopsis contiene las palabras 'gold' y 'dragon':");
    console.log(goldAndDragonMovies);

  } catch (error) {
    console.error("Error en la ejecución:", error);
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log("Conexión cerrada");
  }
}

// Ejecutar la función principal
textSearchQueries().catch(console.error);
