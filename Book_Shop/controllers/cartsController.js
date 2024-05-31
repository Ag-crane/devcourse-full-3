const conn = require('../mariaDB')
const { StatusCodes } = require('http-status-codes')

// 장바구니 담기
const addToCart = (req, res) => {
    const { userId, bookId, quantity } = req.body;

    const sql = `INSERT INTO cartItems (user_id, book_id, quantity) VALUES (?, ?, ?)`;
    const values = [userId, bookId, quantity];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '장바구니 담기 실패' });
        } else {
            res.status(StatusCodes.CREATED).json({ message: '장바구니 담기 성공' });
        }
    });
};

// 장바구니 목록 조회
const getCartItems = (req, res) => {
    const { userId, selected } = req.body;

    let sql = `
        SELECT c.id, c.book_id, b.title, b.summary, c.quantity, b.price
        FROM cartItems c
        JOIN books b ON c.book_id = b.id
        WHERE c.user_id = ?`;
    if (selected) {
        sql += ` AND c.id IN (?)`
    }
    const values = [userId, selected];
    console.log(values);

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '장바구니 목록 조회 실패' });
        } else {
            res.status(StatusCodes.OK).json(result);
        }
    });
}

// 장바구니 도서 삭제
const removeCartItem = (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM cartItems WHERE id = ?`;

    conn.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '장바구니 도서 삭제 실패' });
        } else {
            res.status(StatusCodes.OK).json({ message: '장바구니 도서 삭제 성공' });
        }
    });
}

module.exports = { addToCart, getCartItems, removeCartItem };