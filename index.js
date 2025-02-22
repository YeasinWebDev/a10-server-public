const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 8300

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT)


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
    // artists collection 
    const artistscollection = database.collection('artists')
    // SubCategory collection 
    const subCategorycollection = database.collection('subCategory')

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


    // req for art-2 collection requests

    app.get('/art-2', async (req, res) => {
      const email = req.query.email;
      const allData = req.query.all;
      const filter = req.query.filter;
      if (allData) {
        const result = await artcollection2.find().toArray();
        res.send(result);
        return
      }

      try {
        const query = { user_email: email };
        if (filter) {
          query.customization = filter;
        }
        const result = await artcollection2.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
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

    app.put('/art-2/:id', async (req, res) => {
      const id = req.params.id
      const quary = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateData = {
        $set: {
          user_name: req.body.user_name,
          user_email: req.body.user_email,
          image: req.body.image,
          item_name: req.body.item_name,
          subcategory_name: req.body.subcategory_name,
          short_des: req.body.short_des,
          price: req.body.price,
          rating: req.body.rating,
          processing_time: req.body.processing_time,
          customization: req.body.customization,
          stock_status: req.body.stock_status
        }
      }
      const result = await artcollection2.updateOne(quary, updateData, options)
      res.send(result)
    })

    app.delete('/art-2/:id', async (req, res) => {
      const id = req.params.id
      const quary = { _id: new ObjectId(id) }
      const result = await artcollection2.deleteOne(quary)
      res.send(result)
    })



    // artists collection requests
    app.get('/artists', async (req, res) => {
      const result = await artistscollection.find().toArray()
      res.send(result)
    })

    // SubCategory collection requests
    app.get('/subCategory', async (req, res) => {
      try {
        const subCategory = req.query.subCategory;
        const query = { subcategory_name: subCategory };
        const result = await subCategorycollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error); 
      }
    });
    
    
    app.post('/subCategory', async (req, res) => {
      const result = await subCategorycollection.insertOne(req.body)
      res.send(result)
    })
    app.get('/subCategory/:id', async (req, res) => {
      const id = req.params.id
      const quary = { _id: new ObjectId(id) }
      const result = await subCategorycollection.findOne(quary)
      res.send(result)
    })











    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
