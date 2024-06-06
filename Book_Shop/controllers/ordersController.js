const conn = require('../mariaDB')
const { StatusCodes } = require('http-status-codes')

const createOrder = async (req, res) => {
    const { items, delivery, firstBook, totalQuantity, totalPrice, userId } = req.body;

    const deliverySql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    const deliveryValues = [delivery.address, delivery.receiver, delivery.contact];
    const [deliveryResults] = await conn.promise().execute(deliverySql, deliveryValues);
    const deliveryId = deliveryResults.insertId;

    const orderSql = `INSERT INTO orders (first_book, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
    const orderValues = [firstBook, totalQuantity, totalPrice, userId, deliveryId];
    const [orderResults] = await conn.promise().execute(orderSql, orderValues);
    const orderId = orderResults.insertId;
    
    const itemsSql = `select book_id, quantity from cartItems WHERE id IN (?)`;
    const [orderItems] = await conn.promise().query(itemsSql, [items]);
    console.log(orderItems)

    const orderedBook = orderItems.map(item => [orderId, item.book_id, item.quantity]);
    const orderedBookSql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    const [orderedBookResults] = await conn.promise().query(orderedBookSql, [orderedBook]);

    const deleteCartSql = `DELETE FROM cartItems WHERE id IN (?)`;
    const [deleteCartResults] = await conn.promise().query(deleteCartSql, [items]);

    res.status(StatusCodes.CREATED).json({ message: '주문 성공' });
}

const getOrders = (req, res) => {
    res.json('주문 목록 조회');
}

const getOrderDetail = (req, res) => {
    res.json('주문 상세 조회');
}

module.exports = { createOrder, getOrders, getOrderDetail };