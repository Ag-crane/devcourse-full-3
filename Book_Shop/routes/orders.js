const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderDetail } = require('../controllers/ordersController');

router.use(express.json());

// 주문하기
router.post('/', createOrder);

// 주문 목록 조회
router.get('/', getOrders);

// 주문 상세 조회
router.get('/:orderId', getOrderDetail);

module.exports = router;