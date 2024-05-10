const express = require('express');
const router = express();
router.use(express.json());

const conn = require('../mariaDB'); // db connection 객체. conn은 connection을 줄인 것

let id = 1
let db = new Map()

router.route('/')
    .get((req, res) => { // 채널 전체 조회
        const {userId} = req.body
        if (userId){
            const channels = [...db.values()].filter(channel => channel.userId === userId)
            if (channels.length){
                res.json(channels)
            }else{
                res.status(404).send('해당 유저의 채널이 없습니다')                
            }
        }else{
            res.status(400).send('로그인이 필요합니다')
        }
    })
    .post((req, res) => { // 채널 생성
        const {userId, channelTitle} = req.body
        if (userId && channelTitle){
            db.set(id++,{userId, channelTitle, subscriber:0, video:0})
            res.status(201).send(`${userId}님, ${channelTitle} 채널을 응원합니다`)
        }else{
            res.status(400).send('잘못된 요청')
        }
    })

router.route('/:id')
    .get((req, res) => { // 채널 개별 조회
        let {id} = req.params
        id = parseInt(id)
        const channel = db.get(id)
        if (channel){
            res.json({
                channelTitle: channel.channelTitle,
                subscriber: channel.subscriber,
                video: channel.video
            })
        }else{
            res.status(404).send('해당 채널이 없습니다')
        }
    })
    .delete((req, res) => { // 채널 개별 삭제
        let {id} = req.params
        id = parseInt(id)
        const channel = db.get(id)
        if (channel){
            db.delete(id)
            res.status(200).send(`${channel.channelTitle}채널이 삭제되었습니다`)
        }else{
            res.status(404).send('해당 채널이 없습니다')
        }
    })
    .put((req, res) => { // 채널 개별 수정
        let {id} = req.params
        id = parseInt(id)
        const {newTitle} = req.body
        if (!newTitle){
            res.status(400).send('새로운 채널명을 입력하세요')
        }
        const channel = db.get(id)
        if (channel){
            db.set(id, {channelTitle: newTitle, subscriber:0, video:0})
            res.status(200).json({message: `채널명이 ${channel.channelTitle}에서 ${newTitle}로 변경되었습니다`})
        } else{
            res.status(400).send('id에 해당하는 채널이 없다')
        }
    })

module.exports = router;