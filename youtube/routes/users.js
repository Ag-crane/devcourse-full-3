const express = require('express');
const router = express.Router();
router.use(express.json());
const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json(errors.array())
}

// 로그인
router.post(
    '/login',
    [
        body('email')
            .notEmpty().withMessage('email이 없습니다').bail()
            .isEmail().withMessage('email 형식이 아닙니다'),
        body('password')
            .notEmpty().withMessage('password가 없습니다').bail()
            .isString().withMessage('password는 문자여야 합니다'),
        validate
    ],
    (req, res) => {
        const { email, password } = req.body

        const sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql, email, (err, result) => {
            if (err) throw err
            if (result.length && result[0].password === password) {
                res.json({ message: 'Login success' });
            } else {
                res.status(401).json({ message: 'email or password is incorrect' });
            }
        });
    })

// 회원 가입
router.post(
    '/register',
    [
        body('email')
            .notEmpty().withMessage('email이 없습니다').bail(),
        body('name')
            .notEmpty().withMessage('name이 없습니다').bail()
            .isString().withMessage('name은 문자여야 합니다'),
        body('password')
            .notEmpty().withMessage('password가 없습니다').bail()
            .isString().withMessage('password는 문자여야 합니다'),
        body('contact')
            .notEmpty().withMessage('contact가 없습니다').bail()
            .isString().withMessage('contact는 문자여야 합니다'),
        validate
    ], (req, res) => {
        const { email, name, password, contact } = req.body

        const sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
        const values = [email, name, password, contact]

        conn.query(sql, values, (err, result) => {
            if (err) throw err
            if (result.affectedRows) {
                res.json({ message: `Welcome ${name}!` });
            } else {
                res.status(400).json({ message: 'Register failed' });
            }
        });

    })

router.route('/users')
    .get(
        [
            body('email')
                .notEmpty().withMessage('email이 없습니다').bail()
                .isEmail().withMessage('email 형식이 아닙니다'),
            validate
        ],
        (req, res) => {    // 회원 정보 조회
        const { email } = req.body

        const sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql, email, (err, result) => {
            if (err) throw err
            if (result.length) {
                res.send(result)
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        });
    })
    .delete(
        [
            body('email')
                .notEmpty().withMessage('email이 없습니다').bail()
                .isEmail().withMessage('email 형식이 아닙니다'),
            validate
        ],
        (req, res) => {    // 회원 탈퇴
        const { email } = req.body

        const sql = `DELETE FROM users WHERE email = ?`
        conn.query(sql, email, (err, result) => {
            if (err) throw err
            if (result.affectedRows) {
                res.json({ message: 'User deleted' });
            } else {
                res.status(404).json({ message: 'Delete failed' });
            }
        });
    })

module.exports = router