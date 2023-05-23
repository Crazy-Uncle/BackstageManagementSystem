const express = require('express')

const router = express.Router()
const userinfo = require('../router_handler/userinfo')


// 导入验证规则对象
const expressJoi = require('@escook/express-joi')
// 导入需要验证的规则对象
const { update_userinfo, update_password, update_avatar, add_user, look_for, delete_user } = require('../schema/user')

// 挂载路由
// 查找用户信息
router.post('/lookuser', expressJoi(look_for), userinfo.lookuser)

// 获取用户信息
router.get('/userinfo', userinfo.getUserInfo)

// 添加用户
router.post('/adduser', expressJoi(add_user), userinfo.adduser)

// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo), userinfo.updateUserInfo)

// 更新密码
router.post('/updatePwd', expressJoi(update_password), userinfo.updatePassword)

// 更换头像
router.post('/update/avatar', expressJoi(update_avatar), userinfo.updateAvatar)

// 退出系统
router.post('/exit', userinfo.exit)


// 删除用户信息
router.post('/deleteuser', express(delete_user), userinfo.deleteUser)
module.exports = router

