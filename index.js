require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');
const updateCurrencyJob = require('./jobs/updateCurrency');
const userRoutes = require('./routes/user');

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGODB_URI;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());
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
// const obj = {};
// Iterate icon.json and download all the icons in the folder
// const icons = require('./icon.json');
// Iterate on icons object and download all the icons
// for (const [key,value] of Object.entries(icons)) {
//   const iconName = key;
//   const iconUrl = value;
//   const iconPath = `./images/${iconName}.png`;
//   // Download the icon
//   fetch(iconUrl)
//     .then(res => res.buffer())
//     .then(buffer => fs.writeFileSync(iconPath, buffer));
// };

// const iconsArray = 
// fetch('https://bitbns.com/jugApi/globalParams.json?rdm=206004948452267')
//   .then(res => res.json())
//   .then(result => {
//     console.log(result[0].data.coins);
//     const coinData = result[0].data.coins;
//     // Iterate on coinData Object and pick keys and values
//     // push new object to obj
//     for (const [key, value] of Object.entries(coinData)) {
//       obj[key] = value.coinIcon;
//     }
//     console.log(obj);
//   }).then(() => {
//     // save obj to json file
//     fs.writeFileSync('icon.json', JSON.stringify(obj));
//   });
updateCurrencyJob.start();

app.use('/api/v1',userRoutes);
app.get('/',(req,res) => {
  res.send('Welcome to the Krypto Alert Server');
});
app.listen(PORT,() => {
  console.log(`Server listening on ${PORT}`);
});