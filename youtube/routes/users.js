const express = require('express');
const router = express.Router();
router.use(express.json());

const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것

// 로그인
router.post('/login', (req, res) => {
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
router.post('/register', (req, res) => {
    const { email, name, password, contact } = req.body

    if (email && name && password) {
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
    } else {
        res.status(400).json({ message: 'incorrect input' })
    }
})

// route 메소드 사용해서 중복되는 URL 합치기
router.route('/users')
    .get((req, res) => {    // 회원 정보 조회
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
    .delete((req, res) => {    // 회원 탈퇴
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