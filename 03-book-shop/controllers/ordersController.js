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

const getOrders = async (req, res) => {
    const { userId } = req.body;

    const sql = `SELECT o.id, created_at, address, receiver, contact, first_book, total_quantity, total_price
                FROM orders o
                JOIN delivery d ON o.delivery_id = d.id
                WHERE user_id = 1`
    const [results] = await conn.promise().execute(sql, [userId])
    
    res.status(StatusCodes.OK).json(results);
}

const getOrderDetail = async (req, res) => {
    const { orderId } = req.params;

    const sql = `SELECT b.id, title, author, price, quantity, category_name
                FROM orderedBook ob
                JOIN books b ON ob.book_id = b.id
                JOIN categories c ON b.category_id = c.id
                WHERE order_id = ?`
    const [results] = await conn.promise().execute(sql, [orderId])

    res.status(StatusCodes.OK).json(results);
}

module.exports = { createOrder, getOrders, getOrderDetail };