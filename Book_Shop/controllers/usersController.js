const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');

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
            res.status(StatusCodes.OK).json({ message: 'Login success', token: token });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Login failed' });
        }
    });
};

module.exports = { join, login };