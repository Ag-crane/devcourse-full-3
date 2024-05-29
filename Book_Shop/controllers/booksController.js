const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const allBooks = (req, res) => {
    const { categoryId, isNew } = req.query;
    let sql = `SELECT * FROM books `; // 전체 도서
    let values = [];
    if (categoryId && isNew) { // 카테고리별 신간
        sql += `WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();`
        values = [categoryId];
    } else if (categoryId) { // 카테고리별 전체 도서
        sql += `WHERE category_id = ?`;
        values = [categoryId];
    } else if (isNew) { // 전체 신간
        sql += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();`
    }

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.status(StatusCodes.OK).json(result);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
        }
    });
}

const bookDetail = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM books b LEFT JOIN categories c ON b.category_id = c.id WHERE b.id = ?`;
    conn.query(sql, id, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.status(StatusCodes.OK).json(result[0]);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Book not found' });
        }
    });
}

module.exports = { allBooks, bookDetail };