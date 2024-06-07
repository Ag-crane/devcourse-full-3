const express = require('express');
const router = express.Router();
const { allBooks, bookDetail } = require('../controllers/booksController');

router.use(express.json());

router.get('/', allBooks);
router.get('/:bookId', bookDetail);

module.exports = router;