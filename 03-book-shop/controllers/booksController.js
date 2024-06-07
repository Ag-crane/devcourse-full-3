const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const allBooks = (req, res) => {
    const { categoryId, isNew, limit, currentPage } = req.query;
    const offset = (currentPage - 1) * limit;
    const userId = req.body.userId;

    let values = [userId, parseInt(limit), offset];
    let sql = `
        SELECT *, 
	    (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
	    (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = books.id)) as liked
        FROM books`; // 전체 도서

    if (categoryId && isNew) { // 카테고리별 신간
        sql += `WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`
        values.push(categoryId);
    } else if (categoryId) { // 카테고리별 전체 도서
        sql += `WHERE category_id = ?`;
        values.push(categoryId);
    } else if (isNew) { // 전체 신간
        sql += `WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`
    }

    if (limit && currentPage) {
        sql += ` LIMIT ? OFFSET ?`;
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
    const { bookId } = req.params;
    const userId = req.body.userId;

    const sql = `
        SELECT *,
            (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
            (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ?)) as liked
        FROM books
        JOIN categories ON books.category_id = categories.id
        WHERE books.id = ?;`;
    const values = [userId, bookId, bookId];

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.status(StatusCodes.OK).json(result[0]);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Book not found' });
        }
    });
}

module.exports = { allBooks, bookDetail };