require('dotenv').config();
const express = require("express");

const PORT = process.env.port || 8000
const app = express();

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
});