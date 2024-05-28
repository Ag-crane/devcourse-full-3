const express = require('express');
const router = express.Router();
const { allBooks, bookDetail, categoryBooks } = require('../controllers/booksController');

router.use(express.json());

router.get('/', allBooks);
router.get('/:id', bookDetail);
router.get('/', categoryBooks);

module.exports = router;