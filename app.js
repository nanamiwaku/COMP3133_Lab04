const express = require('express');
const mongoose = require('mongoose');
const User = require('./userSchema'); 
const app = express();
const port = 5000; 
const cors = require('cors');
app.use(cors());


app.use(express.json());

mongoose.connect('mongodb+srv://nanamiwaku:PkkJdfZQiBTPejEu@cluster0.bzf8vmp.mongodb.net/comp3133_lab4?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
