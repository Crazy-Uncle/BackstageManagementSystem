const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}


// 验证规则对象，删除分类
exports.delete_cate = {
    params: {
        id
    }
}

// 验证规则对象，根据id获取文章分类
exports.get_cate = {
    params: {
        id
    }
}

// 验证规则对象，根据id跟新文章分类
exports.update_cate = {
    body: {
        id,
        name,
        alias
    }
}