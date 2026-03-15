// Import MongoClient from mongodb package
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://helperimmerse:tb2ZCuXGU5yFlWDF@cluster0.m4rpepl.mongodb.net/'; // Replace with your MongoDB server URL if needed

// Database Name
const dbName = 'HelperImmerse'; // Replace with your database name

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

 async function dbConnection() {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);


  } catch (err) {
    console.error(err);
  }
}

// main().catch(console.error);

module.exports = dbConnection
