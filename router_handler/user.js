// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
// 导入生成的token的包
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../schema/config')


// 注册新用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  // 对表单中的数据，进行合法性的校验
  // if (!userinfo.username || !userinfo.password) {
  //   return res.send({ status: 1, message: '用户名或密码不合法！' })
  // }

  // 定义 SQL 语句，查询用户名是否被占用
  const sqlStr = 'select * from ev_users where username= ?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    console.log(1);
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // return res.send({ status: 1, message: err.message })


    // 判断用户名是否被占用
    if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
    // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })


    // 调用 bcrypt.hashSync() 对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 定义插入新用户的 SQL 语句
    const sql = 'insert into ev_users set ?'
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      // 判断 SQL 语句是否执行成功
      // if (err) return res.send({ status: 1, message: err.message })
      if (err) return res.cc(err)
      // 判断影响行数是否为 1
      // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
      // 注册用户成功
      // res.send({ status: 0, message: '注册成功！' })
      res.cc('注册成功！', 0)
      console.log(2);
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;
  const { username, password } = req.body;
  // console.log(userinfo, username, password, 1);
  // 定义 sql 语句
  const sql = 'select * from ev_users where username=?'

  db.query(sql, userinfo.username, (err, result) => {
    // 执行sql 语句失败了
    if (err) return res.cc(err)

    // 执行sql 语句成功，但是获取到的数据条数不等于1
    if (result.length !== 1) return res.cc('登录失败')


    // TODO:判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
    if (!compareResult) return res.cc('登录失败！')


    // TODO:在服务器端生成token字符串
    const user = { ...result[0], password: '', user_pic: '' }

    // 对用户信息进行加密
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    // 调用res.send()将 token 响应给客户端
    res.send({ status: 200, message: '登录成功', token: 'Bearer ' + tokenStr, })
  })



}


