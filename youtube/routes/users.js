const express = require('express');
const router = express.Router();
router.use(express.json());

const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것

let db = new Map()

// 로그인
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    
    conn.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {
        if (err) throw err
        console.log(result)
        if (result.length && result[0].password === password) {
            res.json({message: 'Login success'});
        } else {
            res.status(401).json({message: 'email or password is incorrect'});
        }
    });
})

// 회원 가입
router.post('/register', (req, res) => {
    const {email, name, password, contact} = req.body;
    
    // email, name, password 모두 있으면
    if (email && name && password) {
        conn.query(`INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`, [email, name, password, contact], (err, result) => {
            if (err) throw err
            res.json({message: `Welcome ${name}!`});
        });
    }else {
        res.status(400).json({message: 'Register failed'});
    }
})

// route 메소드 사용해서 중복되는 URL 합치기
router.route('/users')
    .get((req, res) => {    // 회원 정보 조회
        const {email} = req.body;
        conn.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {
            if (err) throw err
            if (result.length) { 
                res.send(result)
            } else {
                res.status(404).json({message: 'User not found'});
            }
        });
    })
    .delete((req, res) => {    // 회원 탈퇴
        const {email} = req.body;
        console.log(email)
        conn.query(`DELETE FROM users WHERE email = ?`, email, (err, result) => {
            if (err) throw err
            console.log(result)
            if (result.affectedRows) {
                res.json({message: 'User deleted'});
            } else {
                res.status(404).json({message: 'Delete failed'});
            }
        });
    })

module.exports = router;