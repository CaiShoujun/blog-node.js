// 将平路集合构造函数进行导入
const { Comment} = require('../../model/comment');
const comment = require('../../model/comment');
module.exports = async (req,res)=>{
    // 接收客户端传递过来的请求参数
    const { content,aid,uid } = req.body;
    // 将评论信息添加到数据库中
    await Comment.create({
        content : content,
        aid : aid,
        uid : uid,
        time : new Date()
    });

    // 将页面重定向回文章详情页面
    res.redirect('/home/article?id=' + aid);
};