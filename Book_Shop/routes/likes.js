const express = require('express');
const router = express.Router();
const { addLike, removeLike } = require('../controllers/likesController');

router.use(express.json());

// 좋아요 추가
router.post('/:userId/:bookId', addLike);

// 좋아요 취소
router.delete('/:userId/:bookId', removeLike);

module.exports = router;