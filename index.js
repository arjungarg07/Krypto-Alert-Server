require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const updateCurrencyJob = require('./jobs/updateCurrency');
const userRoutes = require('./routes/user');

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGODB_URI;

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true, type: 'application/json'}));
app.use(cors({credentials: true, origin: true}));
// decrease the size of the req body to incr. performance

app.use(compression());

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
app.get('/',(req,res) => {
  res.send('Welcome to the Krypto Alert Server');
});
app.listen(PORT,() => {
  console.log(`Server listening on ${PORT}`);
});