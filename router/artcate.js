// 这是文章分类的路由模块

const express = require('express')
const router = express.Router()

// 导入文字分类处理函数模块
const artCate = require('../router_handler/artcate')

// 导入验证中间件
const expressJoi = require('@escook/express-joi')

// 导入需要验证的规则对象
const { add_cate_schema, delete_cate, get_cate, update_cate } = require('../schema/artcate')

// 获取文字分类列表数据的路由
router.get('/cates', artCate.getArtCates)

// 新增文章分类路由
router.post('/addcates', expressJoi(add_cate_schema), artCate.addArtCates)


// 根据文章分类删除路由
router.get('/deletecate/:id', expressJoi(delete_cate), artCate.deleteCateById)

// 根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate), artCate.getArtCatesById)

// 根据id更新文章分类数据
router.post('/updatecate', expressJoi(update_cate), artCate.updateArtCatesById)

module.exports = router