const express = require('express');
const router = express.Router();
router.use(express.json());

const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것

let db = new Map()

// 로그인
router.post('/login', (req, res) => {
    const {userId, password} = req.body;
    
    const user = [...db.values()].find(user => user.userId === userId)
    if (user){
        if (user.password === password){
            res.status(200).json({message: 'Login success'});
        }else{
            res.status(401).json({message: 'incorrect password'});
        }
    }else{
        res.status(401).json({message: 'User not found'});
    }
})

// 회원 가입
router.post('/register', (req, res) => {
    const {userId, password, name} = req.body;
    
    if (userId && password) {
        db.set(userId, {userId, password, name})
        res.json({message: `Welcome ${name}!`});
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
        const {userId} = req.body;
        const user = db.get(userId)
        if (user) {
            db.delete(id)
            res.json({message: `User ${user.name} deleted`});
        }else {
            res.status(404).json({message: 'Delete failed'});
        }
    })

module.exports = router;