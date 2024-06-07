// 암호화 모듈 crypto 
const crypto = require('crypto');

const password = '1234';

const salt = crypto.randomBytes(64).toString('base64'); // 64바이트 길이의 랜덤 문자열 생성
const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 16, 'sha512').toString('base64'); // salt 사용해서 16바이트 길이의 해시 생성
console.log(salt)
console.log(hashPassword)