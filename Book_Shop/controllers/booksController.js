const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const allBooks = (req, res) => {
    const { categoryId } = req.query;

    if (categoryId) {
        const sql = `SELECT * FROM books WHERE category_id = ?`;
        conn.query(sql, categoryId, (err, result) => {
            if (err) throw err;
            if (result.length) {
                res.status(StatusCodes.OK).json(result);
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ message: 'Category not found' });
            }
        });
    } else {
            
            const sql = `SELECT * FROM books`;
            conn.query(sql, (err, result) => {
                if (err) throw err;
                res.status(StatusCodes.OK).json(result);
            });
    }
}

const bookDetail = (req, res) => {
    const { id } = req.params;

    const sql = `SELECT * FROM books WHERE id = ?`;
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