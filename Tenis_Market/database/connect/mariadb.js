const mariadb = require('mysql')

const conn = mariadb.createConnection({
    host: 'localhost', // mariadb가 있는 주소
    port: 3306, // mariadb가 사용하는 포트
    user: 'root', // mariadb 접속 계정
    password: 'root', // mariadb 접속 비밀번호
    database: 'Tennis' // 사용할 데이터베이스
})

module.exports = conn;