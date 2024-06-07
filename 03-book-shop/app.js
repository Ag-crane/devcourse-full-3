const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 9999');
});

const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const cartsRouter = require('./routes/carts');
const likesRouter = require('./routes/likes');

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
app.use('/likes', likesRouter);
