const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const join = (req, res) => {
    const { email, name, password } = req.body;

    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    const values = [email, password];

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.status(StatusCodes.CREATED).json({ message: `Welcome ${email}!` });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Register failed' });
        }
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const values = [email, password];

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length) {
            const token = jwt.sign({
                email: email,
                name: result[0].name
            }, process.env.JWT_SECRET, {
                expiresIn: '1h',
                issuer: 'BookShop Server'
            });
            res.cookie('token', token, { httpOnly: true });
            res.status(StatusCodes.OK).json({ message: 'Login success' });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Login failed' });
        }
    });
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.status(StatusCodes.OK).json({ email : email });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email not found' });
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    const sql = `UPDATE users SET password = ? WHERE email = ?`;
    const values = [password, email];

    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.affectedRows) {
            res.status(StatusCodes.OK).json({ message: 'Password reset success' });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password reset failed' });
        }
    });
};

module.exports = { join, login, passwordResetRequest, passwordReset };