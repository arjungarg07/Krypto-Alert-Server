require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const updateCurrencyJob = require('./jobs/updateCurrency');
const userRoutes = require('./routes/user');

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGODB_URI;

express.urlencoded({extended: true});

const app = express();

// Connect to mongoDb
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Cannot connect to database:', err);
  });

updateCurrencyJob.start();

app.use('/api/v1',userRoutes);

app.listen(PORT,() => {
  console.log(`Server listening on ${PORT}`);
});