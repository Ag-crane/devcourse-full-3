const express = require('express');
const router = express.Router();
const { allCategories } = require('../controllers/categoriesController');

router.use(express.json());

router.get('/', allCategories);

module.exports = router;