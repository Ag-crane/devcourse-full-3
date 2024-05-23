const express = require('express');
const router = express.Router();

router.use(express.json());

// 전체 도서 조회
router.get('/', (req, res) => {
    res.json('전체 도서 조회');
});

// 개별 도서 조회
router.get('/:id', (req, res) => {
    res.json('개별 도서 조회');
});

// 카테고리별 도서 조회
router.get('/', (req, res) => {
    // 카테고리는 쿼리로 들어올 것
    res.json('카테고리별 도서 조회');
});

module.exports = router;