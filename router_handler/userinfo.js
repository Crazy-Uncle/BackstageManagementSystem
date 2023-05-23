// 导入数据库模块
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')

// 导入 处理密码模块
const bcrypt = require('bcryptjs')


// 查找用户信息
exports.lookuser = (req, res) => {
    const sqlStr = 'select * from ev_users where id= ?'
    db.query(sqlStr, req.body.id, (err, result) => {


        if (err) return res.cc(err)

        if (result.length !== 1) return res.cc('获取用户信息失败！')

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result[0]
        })
    })

}


// 获取用户信息
exports.getUserInfo = (req, res) => {

    // 定义sql语句

    const sqlStr = 'SELECT * FROM ev_users'
    // 调用db.query()执行语句
    db.query(sqlStr, (err, result) => {

        // console.log(err);
        if (err) return res.cc(err)

        // if (result.length !== 1) return res.cc('获取用户信息失败！')

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: result
        })
    })

}


// 更新用户基本信息处理函数
exports.updateUserInfo = (req, res) => {

    // 定义sql语句
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, result) => {
        console.log(req.body);
        if (err) return res.cc(err)

        if (result.affectedRows !== 1) return res.cc('更新用户信息失败！')

        // 成功的
        res.cc('更新用户信息成功', 0)

    })
}


// 添加用户
exports.adduser = (req, res) => {

    const sql = 'insert into ev_users set? '
    db.query(sql, req.body, (err, result) => {

        if (err) return res.cc(err)

        if (result.affectedRows !== 1 || result.username == req.body.username) return res.cc("此用户已存在")

        // req.body.password = bcrypt.hashSync(req.body.password, 10)

        console.log(result);
        res.cc('添加用户成功', 0)
    })
}


// 重置密码处理函数
exports.updatePassword = (req, res) => {

    //    根据 id 查询用户的信息
    const sql = 'select  * from ev_users where id=?'

    // 执行根据id 查询用户的sql语句
    db.query(sql, req.user.id, (err, result) => {

        if (err) return res.cc(err)

        if (result.length !== 1) return res.cc('用户不存在！')



        // TODO:判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('旧密码错误')



        // TODO:更新数据库中的密码
        const sqlStr = 'update ev_users set password=? where id=?'
        // 对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sqlStr, [newPwd, req.user.id], (err, result) => {

            if (err) return res.cc(err)

            if (result.affectedRows !== 1) return res.cc('更新密码失败！')

            res.cc('更新密码成功！', 0)
        })
    })
}


// 更换头像处理函数
exports.updateAvatar = (req, res) => {

    const sql = 'update ev_users set user_pic=? where id=?'

    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {

        if (err) return res.cc(err)

        if (result.affectedRows !== 1) return res.cc('更换头像失败！')

        res.cc('更换头像成功！', 0)
    })
}

// 根据id删除用户信息
exports.deleteUser = (req, res) => {
    const sql = 'delete from ev_users where id= ?'

    db.query(sql, req.body.id, (err, result) => {

        if (err) return res.cc(err)

        if (result.affectedRows !== 1) return res.cc('删除失败')
        res.cc('删除用户成功！', 0)

    })
}

exports.exit = (req, res) => {


}