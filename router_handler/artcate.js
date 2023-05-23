
const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')


// 获取文字分类列表数据的处理函数
exports.getArtCates = (req, res) => {


    // 定义sql 语句
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'

    db.query(sql, (err, result) => {

        if (err) return res.cc(err)


        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: result
        })
    })
}

exports.addArtCates = (req, res) => {

    //    定义查重语句
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)

        // 判断数据length
        if (result.length == 2) return res.cc('分类名称和别名被占用，请更换后重试')
        // length 等于 1 的三种情况
        // console.log(result.length);
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称和别名被占用，请更换后重试')

        if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用')
        if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用')

        // TODO:分类名称和别名都可用执行添加的动作
        const sqlStr = 'insert into ev_article_cate set ?'
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')

            res.cc('新增文章分类成功！', 0)
        })
    })
}


// 删除文章分类处理函数
exports.deleteCateById = (req, res) => {

    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, result) => {

        if (err) return res.cc(err)

        if (result.affectedRows !== 1) return res.cc('删除文章失败！')

        res.cc('删除文章成功', 0)
    })
}


// 根据id获取文章分类数据
exports.getArtCatesById = (req, res) => {

    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, result) => {
        console.log(req.params);
        if (err) return res.cc(err)

        if (result.length !== 1) return res.cc('获取文章分类数失败！')

        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: result[0]
        })

    })
}

// 根据id更新文章分类数据
exports.updateArtCatesById = (req, res) => {
    //    定义查重语句
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)

        // 判断数据length
        if (result.length == 2) return res.cc('分类名称和别名被占用，请更换后重试')
        // length 等于 1 的三种情况
        // console.log(result.length);
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称和别名被占用，请更换后重试')

        if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用')
        if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用')

        // TODO:更新文章分类数据

        const sqlStr = 'update ev_article_cate set? where id=?'
        db.query(sqlStr, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('更新数据失败')

            res.cc('更新文章数据成功!', 0)
        })
    })

}