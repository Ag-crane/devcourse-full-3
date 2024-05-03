const express = require('express');
const app = express();
const port = 3000;

// 유투버 데이터 셋팅
const youtuber1 = {
    channelTitle: '코딩하는 사람들',
    subscriber: 200000,
    video: 1000,
}
const youtuber2 = {
    channelTitle: '노마드 코더',
    subscriber: 10000000,
    video: 12345,
}
const youtuber3 = {
    channelTitle: '김버그',
    subscriber: 9720,
    video: 14,
}

// Map을 이용한 db 셋팅
let db = new Map();
var id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// REST API 설계
app.get('/youtubers', (req, res) => {
    // forEach문 활용하기
    const youtubers = {};

    if (db.size) {
        db.forEach((value, key) => {
            youtubers[key] = value;
        })
        // const youtubers = Array.from(db.values());
        res.json(youtubers);
    }else {
        res.status(404).json({message: 'No youtubers found'});
    }

})

app.get('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    const youtuber = db.get(id);
    if (youtuber) {
        res.json(youtuber)
    }else {
        res.status(404).json({error: 'Youtuber not found'})
    }
})

app.use(express.json());
app.post('/youtubers/post', (req, res) => { 
    let {channelTitle} = req.body;
    if (channelTitle){
        db.set(id++, {channelTitle: channelTitle, subscriber:0, video:0});
        res.status(201).json({ // '등록' 성공은 '201'
            message: 'Youtuber added successfully',
            youtuber: db.get(id-1)
        })
    }else {
        res.status(400).json({error: 'Invalid input'}) // '잘못된 요청'은 '400'
    }
})

// url은 겹쳐도 method가 다르면 가능
app.delete('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    const youtuber = db.get(id);
    
    if (youtuber) {
        db.delete(id);
        res.json({message: 'Youtuber deleted successfully'})
    }else {
        res.status(404).json({error: 'Youtuber not found'})
    }
})

// 전체 삭제
app.delete('/youtubers', (req, res) => {
    let msg = ''
    let status = ''
    if (db.size) { // db에 값이 없으면
        db.clear()
        msg = 'All youtubers deleted successfully'
        status = 200
    }else { // 있으면
        msg = 'No youtubers to delete'
        status = 404
    }
    res.status(status).json({message: msg})
})

// 수정 (개별)
app.put('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    const youtuber = db.get(id);
    if (youtuber) {
        const oldTitle = youtuber.channelTitle
        const newTitle = req.body.channelTitle
        youtuber.channelTitle = newTitle
        db.set(id, youtuber)
        res.json({
            "message":`${oldTitle} -> ${newTitle}`,
            "after":db.get(id)
        })
    }else{
        res.status(404).json({error: 'Youtuber not found'})
    }
})

app.listen(port, () => {
    console.log(`youtuber app listening at http://localhost:${port}`)
})
