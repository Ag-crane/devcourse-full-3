const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 9999');
});

