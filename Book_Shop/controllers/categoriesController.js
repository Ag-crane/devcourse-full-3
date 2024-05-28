const conn = require('../mariaDB');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const allCategories = (req, res) => {
    const sql = `SELECT * FROM categories`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.status(StatusCodes.OK).json(result);
    });
}

module.exports = { allCategories };