const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://nilupilu:hellomello@cluster0.tjvd3bk.mongodb.net';
const client = new MongoClient(uri);

app.post('/add', (req, res) => {
    console.log(req.body);
  client.connect()
    console.log("meow")
    const collection = client.db("Charity").collection("Register");
    const newReg = {
      name: req.body.name,
      donor: req.body.donor,
      charity: req.body.charity,
      wallet: req.body.wallet,
    };
    collection.insertOne(newReg).then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err)
    });
  });
  app.get("/wallet/:walletid", (req, res) => {
    client.connect()
    const collection = client.db("Charity").collection("Register");
    console.log(req.params.walletid)
    collection.findOne({wallet:req.params.walletid}).then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err)
    })
})
app.get("/get-charity/:name" , (req, res) => {
    client.connect()
    const collection = client.db("Charity").collection("Register");
    console.log(req.params.name)
    collection.findOne({name:req.params.name , charity:"charity"}).then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err)
    })
})


app.listen(3000, () => console.log('Server is running on port 3000'));
