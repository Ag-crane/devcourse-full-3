const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const { join, login } = require('../controllers/UsersController');

// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', (req, res) => {
    res.json('비밀번호 초기화 요청');
});

// 비밀번호 초기화
router.put('/reset', (req, res) => {
    res.json('비밀번호 초기화');
});

module.exports = router;