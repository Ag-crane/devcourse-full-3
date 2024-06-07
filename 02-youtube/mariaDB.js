const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Youtube',
    dateStrings: true // Date 객체를 JavaScript Date 객체로 변환하지 않고 문자열 그대로 반환
});

module.exports = connection;