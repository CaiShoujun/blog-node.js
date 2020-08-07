// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin  超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 创建文档
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'caishoujun',
        email: 'caishoujun@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
};

// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象验证规则
    const schema = Joi.object({
        username: Joi.string().required().min(2).max(12).error(new Error('用户名不符合要求')),
        email: Joi.string().required().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().required().regex(/^[a-zA-Z]{3,30}$/).error(new Error('密码格式不符合要求')),
        role: Joi.string().required().valid('normal', 'admin').error(new Error('角色值非法')),
        state: Joi.number().required().valid(0, 1).error(new Error('状态值非法'))
    });

    // 实施验证
    return schema.validateAsync(user);
};


// 将用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
};