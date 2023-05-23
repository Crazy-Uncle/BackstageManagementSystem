// 文章的路由模块

const express = require('express')

const router = express.Router()
const article = require('../router_handler/article')

router.post('/add', article.addArticle)

module.exports = router