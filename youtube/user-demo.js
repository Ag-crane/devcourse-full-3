const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
let id = 1
let db = new Map()

// 로그인
app.post('/login', (req, res) => {
    const {userId, password} = req.body;
    
    if (userId === 'testId' && password === 'testPw') {
        res.status(200).json({message: 'Login success'});
    }else {
        res.status(401).json({message: 'Login failed'});
    }
})

// 회원 가입
app.post('/register', (req, res) => {
    const {userId, password, name} = req.body;
    
    if (userId && password) {
        db.set(id++, {userId, password, name})
        res.json({message: `Welcome ${name}!`});
    }else {
        res.status(400).json({message: 'Register failed'});
    }
    console.log(db)
})


// route 메소드 사용해서 중복되는 URL 합치기
app.route('/users/:id')
    .get((req, res) => {    // 회원 정보 조회
        let {id} = req.params;
        id = parseInt(id)
        const user = db.get(id)
        if (user) {
            res.json({
                userId: user.userId,
                name: user.name
            });
        }else {
            res.status(404).json({message: 'User not found'});
        }
    })
    .delete((req, res) => {    // 회원 탈퇴
        let {id} = req.params;
        id = parseInt(id)
        const user = db.get(id)
        if (user) {
            db.delete(id)
            res.json({message: `User ${user.name} deleted`});
        }else {
            res.status(404).json({message: 'Delete failed'});
        }
    })
