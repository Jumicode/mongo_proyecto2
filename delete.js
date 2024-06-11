const { MongoClient } = require('mongodb');

// URI de conexión a MongoDB (ajusta si tu servidor está en una dirección diferente)
const uri = "mongodb://0.0.0.0:27017";

// Función principal
async function deleteDocuments() {
  // Crear una nueva instancia del cliente MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectar al servidor MongoDB
    await client.connect();

    console.log("Conectado a MongoDB");

    // Seleccionar la base de datos y la colección
    const db = client.db('Club_Video');
    const collection = db.collection('movies');

    // Eliminar la película "Pee Wee Herman’s Big Adventure"
    const deletePeeWeeResult = await collection.deleteOne({ titulo: "Pee Wee Herman’s Big Adventure" });
    if (deletePeeWeeResult.deletedCount > 0) {
      console.log("Película 'Pee Wee Herman’s Big Adventure' eliminada");
    } else {
      console.log("No se encontró la película 'Pee Wee Herman’s Big Adventure' para eliminar");
    }

    // Eliminar la película "Avatar"
    const deleteAvatarResult = await collection.deleteOne({ titulo: "Avatar" });
    if (deleteAvatarResult.deletedCount > 0) {
      console.log("Película 'Avatar' eliminada");
    } else {
      console.log("No se encontró la película 'Avatar' para eliminar");
    }

  } catch (error) {
    console.error("Error en la ejecución:", error);
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log("Conexión cerrada");
  }
}

// Ejecutar la función principal
deleteDocuments().catch(console.error);
