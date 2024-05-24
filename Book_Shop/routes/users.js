const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');

// 회원가입
router.post('/join', (req, res) => {
    const { email, name, password } = req.body;

    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    const values = [email, password];

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.status(StatusCodes.CREATED).json({ message: `Welcome ${email}!` });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Register failed' });
        }
    });
});

// 로그인
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const values = [email, password];

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length) {
            const token = jwt.sign({
                email: email,
                name: result[0].name
            }, process.env.JWT_SECRET, {
                expiresIn: '1h',
                issuer: 'BookShop Server'
            });
            res.status(StatusCodes.OK).json({ message: 'Login success', token: token });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Login failed' });
        }
    });
});

// 비밀번호 초기화 요청
router.post('/reset', (req, res) => {
    res.json('비밀번호 초기화 요청');
});

// 비밀번호 초기화
router.put('/reset', (req, res) => {
    res.json('비밀번호 초기화');
});

module.exports = router;