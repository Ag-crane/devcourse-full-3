const conn = require('../mariaDB')
const { StatusCodes } = require('http-status-codes')

const createOrder = (req, res) => {
    const { items, delivery, firstBook, totalQuantity, totalPrice, userId } = req.body;

    const deliverySql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    const deliveryValues = [delivery.address, delivery.receiver, delivery.contact];

    conn.query(deliverySql, deliveryValues, (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '주문 실패' });
        } else {
            const deliveryId = result.insertId;
            const orderSql = `INSERT INTO orders (first_book, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
            const orderValues = [firstBook, totalQuantity, totalPrice, userId, deliveryId];

            conn.query(orderSql, orderValues, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '주문 실패' });
                } else {
                    const orderId = result.insertId;
                    const orderedBook = items.map(item => [orderId, item.bookId, item.quantity]);

                    const orderedBookSql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

                    conn.query(orderedBookSql, [orderedBook], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '주문 실패' });
                        } else {
                            res.status(StatusCodes.CREATED).json({ message: '주문 성공' });
                        }
                    });
                }
            });
        }
    });

}

const getOrders = (req, res) => {
    res.json('주문 목록 조회');
}

const getOrderDetail = (req, res) => {
    res.json('주문 상세 조회');
}

module.exports = { createOrder, getOrders, getOrderDetail };