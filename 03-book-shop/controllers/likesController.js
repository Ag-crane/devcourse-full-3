const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addLike = (req, res) => {
    const { userId, bookId } = req.params;
    
    const token = req.headers.authorization;
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // const sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
    // const values = [userId, bookId];
    // conn.query(sql, values, (err, result) => {
    //     if (err) throw err;
    //     res.status(StatusCodes.CREATED).json({ message: 'Successfully added' });
    // });
}

const removeLike = (req, res) => {
    const { userId, bookId } = req.params;

    const sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;
    const values = [userId, bookId];    
    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.status(StatusCodes.OK).json({ message: 'Successfully removed' });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
        }
    });
}

module.exports = { addLike, removeLike };