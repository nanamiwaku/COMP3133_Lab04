const express = require('express');
const mongoose = require('mongoose');
const User = require('./userSchema'); 
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('dotenv').config(); 
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if(error.name === 'ValidationError') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('An error occurred while inserting the data');
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
