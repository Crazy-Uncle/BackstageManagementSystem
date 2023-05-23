// 导入定义验证规则的包
const joi = require('@hapi/joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 验证 avatar 头像的验证规则
const avatar = joi.string().dataUri().required()
exports.update_avatar = {
  body: {
    avatar
  }
}


// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,

  },
}

// 验证规则对象 跟新用户信息
exports.update_userinfo = {
  body: {
    id,
    username,
    password,
    nickname,
    email
  }
}


// 验证规则对象 - 更新密码
exports.update_password = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

// 验证添加用户 账号密码邮箱
exports.add_user = {
  body: {
    username,
    password,
    email
  }
}

// 验证查找用户规则
exports.look_for = {
  body: {
    id
  }
}

// 验证删除用户验证id用户规则
exports.delete_user = {
  body: {
    id
  }
}