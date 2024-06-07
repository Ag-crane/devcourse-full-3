const express = require('express');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log('서버 실행 중');
});

// JWT 토큰 발행
app.get('/jwt', (req, res) => {
    const token = jwt.sign({ user_id: 1 }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    res.json({ message: 'JWT 토큰이 발행되었습니다.' });
});

// JWT 토큰 검증
app.get('/verify', (req, res) => {
    const token = req.headers["authorization"]
    console.log(token)
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    res.json(decoded);
});