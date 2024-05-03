const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

// 로그인
app.post('/login', (req, res) => {
    const {id, password} = req.body;
    
    if (id === 'user' && password === '1234') {
        res.json({message: 'Login success'});
    }else {
        res.status(401).json({message: 'Login failed'});
    }
})

// 회원 가입
app.post('/register', (req, res) => {
    const {id, password, name} = req.body;
    
    if (id && password) {
        res.json({message: 'Register success'});
    }else {
        res.status(400).json({message: 'Register failed'});
    }
})

// 회원 정보 조회
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    
    if (id === 'user') {
        res.json({id: 'user', name: '홍길동'});
    }else {
        res.status(404).json({message: 'User not found'});
    }
})

// 회원 탈퇴
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    
    if (id === 'user') {
        res.json({message: 'Delete success'});
    }else {
        res.status(404).json({message: 'Delete failed'});
    }
})