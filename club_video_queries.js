const { MongoClient } = require('mongodb');


const uri = "mongodb://0.0.0.0:27017";


async function insertDocuments() {

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
  
    await client.connect();

    console.log("Conectado a MongoDB");

    const db = client.db('Club_Video');
    const collection = db.collection('movies');


    const result = await collection.insertMany([
      {
        titulo: "Fight Club",
        escritor: "Chuck Palahniuk",
        year: 1999,
        actores: ["Brad Pitt", "Edward Norton"]
      },
      {
        titulo: "Pulp Fiction",
        escritor: "Quentin Tarantino",
        year: 1994,
        actores: ["John Travolta", "Uma Thurman"]
      },
      {
        titulo: "Inglorious Basterds",
        escritor: "Quentin Tarantino",
        year: 2009,
        actores: ["Brad Pitt", "Diane Kruger", "Eli Roth"]
      },
      {
        titulo: "The Hobbit: An Unexpected Journey",
        escritor: "J.R.R. Tolkien",
        year: 2012,
        franquicia: "The Hobbit"
      },
      {
        titulo: "The Hobbit: The Desolation of Smaug",
        escritor: "J.R.R. Tolkien",
        year: 2013,
        franquicia: "The Hobbit"
      },
      {
        titulo: "The Hobbit: The Battle of the Five Armies",
        escritor: "J.R.R. Tolkien",
        year: 2014,
        franquicia: "The Hobbit",
        sinopsis: "Bilbo y su compañía deben enfrentarse a una guerra contra diversos oponentes para evitar que la Montaña Solitaria caiga en manos de la oscuridad"
      },
      {
        titulo: "Pee Wee Herman’s Big Adventure"
      },
      {
        titulo: "Avatar"
      }
    ]);
    console.log(`${result.insertedCount} documentos insertados`);

  } catch (error) {
    console.error("Error en la ejecución:", error);
  } finally {
   
    await client.close();
    console.log("Conexión cerrada");
  }
}

insertDocuments().catch(console.error);
