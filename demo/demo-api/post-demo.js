const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); // req로 받은 데이터를 json으로 변환
app.post('/post-test', (req, res) => {
    // res.send('Got a POST request');
    console.log(req.body)
    res.send(req.body.message)
});

app.listen(3000)