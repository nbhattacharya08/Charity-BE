const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const meowSchema = new mongoose.Schema({
  name: String,
  donor: String,
  charity: String,
  wallet: String
});

const Register = mongoose.model('Meow', meowSchema);

app.post('/add', (req, res) => {
  const newReg = new Register({
    name: req.body.name,
    donor: req.body.donor,
    charity: req.body.charity,
    wallet: req.body.wallet
  });

  newReg.save().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.get("/wallet/:walletid", (req, res) => {
  Register.findOne({wallet: req.params.walletid}).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.get("/get-charity/:name", (req, res) => {
  Register.findOne({name: req.params.name, charity: "charity"}).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.listen(4000, async () => {
    await mongoose.connect('mongodb+srv://nilupilu:hellomello@cluster0.tjvd3bk.mongodb.net/Charity');
    console.log('Listening on port 4000')
});