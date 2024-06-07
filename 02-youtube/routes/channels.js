const express = require('express');
const router = express();
router.use(express.json());
const { param, body, validationResult } = require('express-validator');

const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json(errors.array())
}

router.route('/')
    // 채널 전체 조회
    .get(
        [
            body('userId')
                .notEmpty().withMessage('userId가 없습니다').bail()
                .isInt().withMessage('userId는 숫자여야 합니다'),
            validate
        ],
        (req, res) => {
            const { userId } = req.body
            const sql = `SELECT * FROM channels WHERE user_id = ?`
            if (userId) {
                conn.query(sql, userId, (err, results) => {
                    if (err) throw err
                    if (results.length) {
                        res.json(results)
                    } else {
                        res.status(404).json({ message: 'Channel not found' })
                    }
                })
            } else {
                res.status(400).send('Bad Request')
            }
        })
    // 채널 생성
    .post(
        [
            body('userId')
                .notEmpty().withMessage('userId가 없습니다').bail()
                .isInt().withMessage('userId는 숫자여야 합니다'),
            body('name')
                .notEmpty().withMessage('name이 없습니다').bail()
                .isString().withMessage('name은 문자여야 합니다'),
            validate
        ],
        (req, res) => {
            const { userId, name } = req.body

            const sql = `INSERT INTO channels (user_id, name) VALUES (?, ?)`
            const values = [userId, name]
            conn.query(sql, values, (err, result) => {
                if (err) throw err
                res.status(201).send(`${userId}님, ${name} 채널을 응원합니다`)
            })
        })

router.route('/:id')
    // 채널 개별 조회
    .get(
        [
            param('id')
                .notEmpty().withMessage('id가 없습니다').bail()
                .isInt().withMessage('id는 숫자여야 합니다'),
            validate
        ],
        (req, res) => {
            let { id } = req.params
            id = parseInt(id)

            conn.query(`SELECT * FROM channels WHERE id = ?`, id, (err, result) => {
                if (err) throw err
                if (result.length) {
                    res.json(result)
                } else {
                    res.status(404).json({ message: 'Channel not found' })
                }
            })
        })
    // 채널 개별 삭제
    .delete(
        [
            param('id')
                .notEmpty().withMessage('id가 없습니다').bail()
                .isInt().withMessage('id는 숫자여야 합니다'),
            validate
        ],
        (req, res) => {
            let { id } = req.params
            id = parseInt(id)

            const sql = `DELETE FROM channels WHERE id = ?`
            conn.query(sql, id, (err, result) => {
                if (err) throw err
                if (result.affectedRows) {
                    res.status(200).send('Channel deleted')
                } else {
                    res.status(400).send('Channel not found')
                }
            })
        })
    // 채널 개별 수정
    .put(
        [
            param('id')
                .notEmpty().withMessage('id가 없습니다').bail()
                .isInt().withMessage('id는 숫자여야 합니다'),
            body('newName')
                .notEmpty().withMessage('새로운 채널명을 입력하세요').bail()
                .isString().withMessage('name은 문자열이어야 합니다'),
            validate
        ],
        (req, res) => {
            let { id } = req.params
            id = parseInt(id)
            const { newName } = req.body

            const sql = `UPDATE channels SET name = ? WHERE id = ?`
            const values = [newName, id]
            conn.query(sql, values, (err, result) => {
                if (err) throw err
                if (result.affectedRows) {
                    res.status(200).json({ message: `채널명이 ${newName}로 변경되었습니다` })
                }
                res.status(400).json({ message: 'Channel not found' })
            })
        })

module.exports = router