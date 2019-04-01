const Comment = require("../module/comments");
const Article = require("../module/article");
const Router = require("koa-router");
const router_comment = new Router; //定义在这里使用的router

exports.router_comment = router_comment;

exports.publish = async ctx => {  //提交评论
    if (ctx.session.isNew) {
        ctx.body = {
            status: 0,
            msg: '登陆后才能够评论噢'
        };
    } else {
        const data = {
            content: ctx.request.body.content,
            author: ctx.session.userId,
            article: ctx.request.body.artid
        };
        let objComment = new Comment(data);
        await objComment
            .save()
            .then(data => {
                ctx.body = {
                    status: 1,
                    msg: '评论成功'
                };
                Article
                    .update({_id: ctx.request.body.artid}, {$inc : { commentNum : 1 }})
                    .then(data => console.log("评论数增1成功"), err => console.log("评论数增1失败"));
            }, err => {
                ctx.body = {
                    status: 0,
                    msg: '评论失败请重试'
                }
            });
    }
};

exports.display = async ctx => {  //显示评论信息
    let comment = await Comment
        .find({
            article: ctx.request.body.id
        })
        .sort("-createTime")
        .populate("author", "nickname avatar")
        .then(data => data, err => {
            console.log("文章相关评论查询失败");
        });
    ctx.body = comment;
};