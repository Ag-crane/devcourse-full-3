const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const allBooks = (req, res) => {
    res.json('전체 도서 조회');
}

const bookDetail = (req, res) => {
    res.json('개별 도서 조회');
}

const categoryBooks = (req, res) => {
    res.json('카테고리별 도서 조회');
}

module.exports = { allBooks, bookDetail, categoryBooks };