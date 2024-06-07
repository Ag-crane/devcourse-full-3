const express = require('express');
const app = express();
const dovenv = require('dotenv');
dovenv.config({ path: '../.env' });
const port = process.env.PORT

const fruits = [
    {id: 1, name: 'banana', color: 'yellow'},
    {id: 2, name: 'apple', color: 'red'},
    {id: 3, name: 'grape', color: 'purple'},
]

// 전체 조회
app.get('/fruits', (req, res) => {
    res.json(fruits);
})

// id로 조회
app.get('/fruits/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    // var targetFruit = ""
    // fruits.forEach(fruit => {
    //     if (fruit.id === id) {
    //         targetFruit = fruit
    //     }
    // })
    // 배열의 find 메소드로 위 forEach 문을 한 줄로 줄일 수 있다
    const targetFruit = fruits.find(fruit => fruit.id === id);
    
    if (targetFruit) {
        res.json(targetFruit)
    }else { // 예외를 터뜨린다 = http status code로 실패 알림
        res.status(404).json({error: 'Fruit not found'})
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})