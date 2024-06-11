const { MongoClient } = require('mongodb');

// URI de conexión a MongoDB (ajusta si tu servidor está en una dirección diferente)
const uri = "mongodb://0.0.0.0:27017";

// Función principal
async function updateDocuments() {
  // Crear una nueva instancia del cliente MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectar al servidor MongoDB
    await client.connect();

    console.log("Conectado a MongoDB");

    // Seleccionar la base de datos y la colección
    const db = client.db('Club_Video');
    const collection = db.collection('movies');

    // Actualizar la sinopsis de "The Hobbit: An Unexpected Journey"
    await collection.updateOne(
      { titulo: "The Hobbit: An Unexpected Journey" },
      { $set: { sinopsis: "Un hobbit renuente, Bilbo Baggins, se embarca en un viaje hacia la Montaña Solitaria con un grupo animado de enanos para reclamar su hogar y el tesoro que contiene, todo ello custodiado por el dragón Smaug." } }
    );
    console.log("Sinopsis agregada a The Hobbit: An Unexpected Journey");

    // Actualizar la sinopsis de "The Hobbit: The Desolation of Smaug"
    await collection.updateOne(
      { titulo: "The Hobbit: The Desolation of Smaug" },
      { $set: { sinopsis: "Los enanos, junto con Bilbo Baggins y Gandalf el Gris, continúan su búsqueda para recuperar Erebor, su tierra natal, de las garras de Smaug. Bilbo posee un anillo misterioso y mágico." } }
    );
    console.log("Sinopsis agregada a The Hobbit: The Desolation of Smaug");

    // Agregar un actor llamado "Samuel L. Jackson" a la película "Pulp Fiction"
    await collection.updateOne(
      { titulo: "Pulp Fiction" },
      { $push: { actores: "Samuel L. Jackson" } }
    );
    console.log("Samuel L. Jackson agregado a Pulp Fiction");

  } catch (error) {
    console.error("Error en la ejecución:", error);
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log("Conexión cerrada");
  }
}

// Ejecutar la función principal
updateDocuments().catch(console.error);
