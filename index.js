const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const database = client.db('default-art')
    // collection for art-1
    const artcollection = database.collection('art-1')
    // collection for art-2
    const artcollection2 = database.collection('art-2')

    app.get('/art-1', async (req, res) => {
      const result = await artcollection.find().toArray()
      res.send(result)
    })
    app.post('/art-1', async (req, res) => {
      const result = await artcollection.insertOne(req.body)
      res.json(result)
    })
    app.get('/art-1/:id', async (req, res) => {
      const id = req.params.id
      const quary = { _id: new ObjectId(id) }
      const result = await artcollection.findOne(quary)
      res.send(result)
    })


    // req for all user collection
   
    app.get('/art-2', async (req, res) => {
      const email = req.query.email;
      const allData = req.query.all;
      if(allData){
        const result = await artcollection2.find().toArray();
        res.send(result);
        return
      }
      
      try {
        const query = { user_email: email };
        const result = await artcollection2.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error( error);
      }
    });



    app.get('/art-2/:id', async (req, res) => {
      const id = req.params.id
      const quary = { _id: new ObjectId(id) }
      const result = await artcollection2.findOne(quary)
      res.send(result)
    })

    app.post("/art-2", async (req, res) => {
      const result = await artcollection2.insertOne(req.body)
      res.send(result)
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
