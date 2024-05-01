const { subscribe } = require('diagnostics_channel');
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
    const youtubers = Array.from(db.values());
    res.json(youtubers);
})

app.get('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    const youtuber = db.get(id);
    if (!youtuber) {
        res.json({error: 'Youtuber not found'})
    }else {
        res.json(youtuber)
    }
})

app.use(express.json());
app.post('/youtubers/post', (req, res) => { 
    console.log(req.body)
    let {channelTitle, subscriber, video} = req.body;

    db.set(id++, {channelTitle, subscriber, video}); // ES6 문법의 객체 리터럴 속성 이름 축약
    res.json({
        message: 'Youtuber added successfully',
        youtuber: db.get(id-1)
    })
})

// url은 겹쳐도 method가 다르면 가능
app.delete('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    const youtuber = db.get(id);
    
    if (!youtuber) {
        res.json({error: 'Youtuber not found'})
    }else {
        db.delete(id);
        res.json({message: 'Youtuber deleted successfully'})
    }
})

app.listen(port, () => {
    console.log(`youtuber app listening at http://localhost:${port}`)
})
