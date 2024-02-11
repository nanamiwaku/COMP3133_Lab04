const mongoose = require('mongoose');
const User = require('./userSchema'); 
const userData = require('./UsersData.json');

mongoose.connect('mongodb+srv://nanamiwaku:PkkJdfZQiBTPejEu@cluster0.bzf8vmp.mongodb.net/comp3133_lab4?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log('Connected to MongoDB...');
    insertUsersData();
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));

async function insertUsersData() {
  try {
    for (let user of userData) {
      const newUser = new User(user);
      await newUser.save();
    }
    console.log('Data inserted successfully.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}
