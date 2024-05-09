const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Youtube',
    dateStrings: true // Date 객체를 JavaScript Date 객체로 변환하지 않고 문자열 그대로 반환
});

connection.query('SELECT * FROM users', (err, results, fields) => {
    if (err) throw err
    // console.log(results) // results contains rows returned by server
    // console.log(fields) // fields contains extra meta-data about the results
    const {id, email, name, password, contact, created_at} = results[results.length - 1]
    console.log(id, email, name, password, contact, created_at)
});