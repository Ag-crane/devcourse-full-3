var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

console.log(process.env.PRIVATE_KEY);

// 서명 (토큰 생성) : 페이로드 + 비밀키 + 알고리즘(defalt: SHA256)
var token = jwt.sign({ id: 'user123' }, process.env.PRIVATE_KEY);
console.log(token);

// 검증 (토큰 확인) : 토큰 + 비밀키
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded); // { id: 'user123', iat: 1715903533 }

// iat (issued at) : 토큰 발급 시간. => 토큰은 발행할 때마다 달라진다.