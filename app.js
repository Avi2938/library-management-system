const express = require('express');
const mongoose = require('mongoose');
const library = require('library');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const dataSchema = new mongoose.Schema({
  Username: String,
  password: String,
});

const Data = mongoose.model('Data', dataSchema);

app.post('/submit', async (req, res) => {
  const { Username, password } = req.body;

  try {
    const newData = new Data({ username,password});
    await newData.save();
    res.send('Data saved to MongoDB!');
  } catch (error) {
    res.status(500).send('Error saving data to MongoDB.');
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
