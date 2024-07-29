const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const join = (req, res) => {
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 10, 'sha512').toString('base64');

    const sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
    const values = [email, hashPassword, salt];

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
    
    const sql = `SELECT * FROM users WHERE email = ?`;
    
    conn.query(sql, email, (err, result) => {
        if (err) throw err;
        if (result.length) {
            const loginUser = result[0];
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 100000, 10, 'sha512').toString('base64');
            if (loginUser.password === hashPassword) {
                const token = jwt.sign({
                    id : loginUser.id,
                    email: email,
                    name: loginUser.name
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                    issuer: 'BookShop Server'
                });
                res.cookie('token', token, { httpOnly: true });
                res.status(StatusCodes.OK).json({ message: 'Login success', token: token });
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Login failed' });
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Login failed' });
        }
    });
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;
    console.log(email);
    const sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, result) => {
        if (err) throw err;
        if (result.length) {
            res.status(StatusCodes.OK).json({ message: "Success", email : email });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email not found' });
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 10, 'sha512').toString('base64');

    const sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    const values = [hashPassword, salt, email];

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