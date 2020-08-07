const { Atrcle } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 接收客户端传递过来的页码
    const page = req.query.page;

    // mongoose-sex-page：
    // page：指定当前页
    // size：指定每页显示的数据条数
    // display：指定客户端要显示的页码数量
    // exec：向数据库中发送 查询请求

    // 查询所有文章数据
    let atrcles = await pagination(Atrcle).find().page(page).size(2).display(3).populate('author').exec();

    // res.send(atrcles);

    //渲染文章列表页面模板 
    res.render('admin/article', {
        atrcles: atrcles
    });
};