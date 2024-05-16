const express = require('express');
const router = express();
router.use(express.json());

const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것

router.route('/')
    .get((req, res) => { // 채널 전체 조회
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
    .post((req, res) => { // 채널 생성
        const { userId, name } = req.body
        if (userId && name) {
            const sql = `INSERT INTO channels (user_id, name) VALUES (?, ?)`
            const values = [userId, name]
            conn.query(sql, values, (err, result) => {
                if (err) throw err
                console.log(result)
                res.status(201).send(`${userId}님, ${name} 채널을 응원합니다`)
            })
        } else {
            res.status(400).send('잘못된 요청')
        }
    })

router.route('/:id')
    .get((req, res) => { // 채널 개별 조회
        let { id } = req.params
        id = parseInt(id)

        conn.query(`SELECT * FROM channels WHERE user_id = ?`, id, (err, result) => {
            if (err) throw err
            if (result.length) {
                res.json(result)
            } else {
                res.status(404).json({ message: 'Channel not found' })
            }
        })
    })
    .delete((req, res) => { // 채널 개별 삭제
        let { id } = req.params
        id = parseInt(id)
        const sql = `DELETE FROM channels WHERE id = ?`
        
        if (id) {
            conn.query(sql, id, (err, result) => {
                if (err) throw err
                if (result.affectedRows) {
                    res.status(200).send('Channel deleted')
                } else {
                    res.status(400).send('Channel not found')
                }
            })
        } else {
            res.status(400).send('Channel not found')
        }
    })
    .put((req, res) => { // 채널 개별 수정
        let { id } = req.params
        id = parseInt(id)
            const { newName } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array())
            }

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

module.exports = router;