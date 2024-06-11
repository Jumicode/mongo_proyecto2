const { MongoClient } = require('mongodb');

// URI de conexión a MongoDB (ajusta si tu servidor está en una dirección diferente)
const uri = "mongodb://localhost:27017";

// Función principal
  async function queryMovies() {
  // Crear una nueva instancia del cliente MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectar al servidor MongoDB
    await client.connect();

    console.log("Conectado a MongoDB");

    // Seleccionar la base de datos y la colección
    const db = client.db('Club_Video');
    const collection = db.collection('movies');

    // Obtener todos los documentos
    const allMovies = await collection.find().toArray();
    console.log("Todos los documentos:");
    console.log(allMovies);

    // Obtener documentos con escritor igual a "Quentin Tarantino"
    const tarantinoMovies = await collection.find({ escritor: "Quentin Tarantino" }).toArray();
    console.log("Películas de Quentin Tarantino:");
    console.log(tarantinoMovies);

    // Obtener documentos con actores que incluyan a "Brad Pitt"
    const bradPittMovies = await collection.find({ actores: "Brad Pitt" }).toArray();
    console.log("Películas con Brad Pitt como actor:");
    console.log(bradPittMovies);

    // Obtener documentos con franquicia igual a "The Hobbit"
    const hobbitMovies = await collection.find({ franquicia: "The Hobbit" }).toArray();
    console.log("Películas de la franquicia The Hobbit:");
    console.log(hobbitMovies);

    // Obtener todas las películas de los años 90
    const ninetiesMovies = await collection.find({ year: { $gte: 1990, $lt: 2000 } }).toArray();
    console.log("Películas de los años 90:");
    console.log(ninetiesMovies);

    // Obtener las películas estrenadas entre los años 2000 y 2010
    const millenniumMovies = await collection.find({ year: { $gte: 2000, $lte: 2010 } }).toArray();
    console.log("Películas estrenadas entre 2000 y 2010:");
    console.log(millenniumMovies);

  } catch (error) {
    console.error("Error en la ejecución:", error);
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log("Conexión cerrada");
  }
}

// Ejecutar la función principal
queryMovies().catch(console.error);
