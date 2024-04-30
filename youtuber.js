const { subscribe } = require('diagnostics_channel');
const express = require('express');
const app = express();
const post = 3000;

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
let db = Map();
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

// REST API 설계
app.get('/youtuber', (req, res) => {
    let {id} = parseInt(req.params)

    const youtuber = db.get(id);
    if (!youtuber) {
        res.json({error: 'Youtuber not found'})
    }else {
        res.json(youtuber)
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); // req로 받은 데이터를 json으로 변환
app.post('/post-test', (req, res) => {
    // res.send('Got a POST request');
    console.log(req.body)
    res.send(req.body.message)
});

app.listen(port, () => {
    console.log(`youtuber app listening at http://localhost:${port}`)
})