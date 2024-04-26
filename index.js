const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 8300

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT)

// a-10
// aeWZHUAqE3IjavWA

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.get('/', (req, res) => {
    res.send('CRUD IS RUNNER')
  })



  
const uri = `mongodb+srv://${username}:${password}@cluster0.i0wjdyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // call of default art 
    const database =  client.db('default-art')
    const artcollection =  database.collection('art-1')

    app.get('/art-1', async(req, res) => {
      const result = await artcollection.find().toArray()
      res.send(result)
    })
    app.post('/art-1', async(req, res) => {
      const result = await artcollection.insertOne(req.body)
      res.json(result)
    })

















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
