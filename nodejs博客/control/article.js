const fs = require("fs");
const Article = require("../module/article"); //得到操控Article集合的对象
const Router = require("koa-router");
const router_article = new Router; //定义在这里使用的router
let web_obj, photo_obj, write_obj, chat_obj, article_obj;

exports.router_article = router_article;

//编辑文章//
exports.edit = async (ctx, next) => {
    ctx.body = fs.readFileSync("./public/html/publish.html", "utf8");
    await next();
};

//发表文章//
exports.publish = async (ctx) => {
    //用户没登录，提示请登录
    if (ctx.session.isNew) {
        //没登录
        return ctx.body = {
            status: 0,
            msg: "请登录"
        };
    }

    //取出发过来的数据
    let data = ctx.request.body;
    data.author = ctx.session.userId; //得到作者
    await new Promise((res, rej) => {
        new Article(data)
            .save((err, data) => {
                if (err) return rej(err);
                res(data);
            })
    }).then(() => {
        ctx.body = {
            status: 1,
        };
    }, () => {
        ctx.body = {
            status: 0,
            msg: "保存数据发生错误"
        };
    })
};

//前端文章页面
exports.web_query = async (ctx, next) => {  //查询页面内容
    let page = ctx.params.id || 1;
    let maxNum = await Article.find({tips: "web"}).then(data => data.length, err => 0);
    let artList = await Article
        .find({tips: "web"})
        .sort("-createTime")
        .skip((page-1) * 10)
        .limit(10)
        .populate("author", "_id nickname avatar")
        .then(data => data, err => {
            console.log("查询前端文章内容出错");
        });
    web_obj = {artList, maxNum};
    ctx.body = fs.readFileSync("./public/html/web.html", "utf8");
    await next();
};
exports.web_render = async (ctx) => {  //渲染页面
    router_article.get("/web-query", async (ctx) => {
        ctx.body = web_obj;
    });
};

//摄影文章页面//
exports.photo_query = async (ctx, next) => {  //查询页面内容
    let page = ctx.params.id || 1;
    let maxNum = await Article.find({tips: "photo"}).then(data => data.length, err => 0);
    let artList = await Article
        .find({tips: "photo"})
        .sort("-createTime")
        .skip((page-1) * 10)
        .limit(10)
        .populate("author", "_id nickname avatar")
        .then(data => data, err => {
            console.log("查询前端文章内容出错");
        });
    photo_obj = {artList, maxNum};
    ctx.body = fs.readFileSync("./public/html/photo.html", "utf8");
    await next();
};
exports.photo_render = async (ctx) => {  //渲染页面//
    router_article.get("/photo-query", async (ctx) => {
        ctx.body = photo_obj;
    });
};

//阅读文章页面
exports.write_query = async (ctx, next) => {  //查询页面内容
    let page = ctx.params.id || 1;
    let maxNum = await Article.find({tips: "write"}).then(data => data.length, err => 0);
    let artList = await Article
        .find({tips: "write"})
        .sort("-createTime")
        .skip((page-1) * 10)
        .limit(10)
        .populate("author", "_id nickname avatar")
        .then(data => data, err => {
            console.log("查询前端文章内容出错");
        });
    write_obj = {artList, maxNum};
    ctx.body = fs.readFileSync("./public/html/write.html", "utf8");
    await next();
};
exports.write_render = async (ctx) => {  //渲染页面
    router_article.get("/write-query", async (ctx) => {
        ctx.body = write_obj;
    });
};

//聊天文章页面
exports.chat_query = async (ctx, next) => {  //查询页面内容
    let page = ctx.params.id || 1;
    let maxNum = await Article.find({tips: "chat"}).then(data => data.length, err => 0);
    let artList = await Article
        .find({tips: "chat"})
        .sort("-createTime")
        .skip((page-1) * 10)
        .limit(10)
        .populate("author", "_id nickname avatar")
        .then(data => data, err => {
            console.log("查询前端文章内容出错");
        });
    chat_obj = {artList, maxNum};
    ctx.body = fs.readFileSync("./public/html/chat.html", "utf8");
    await next();
};
exports.chat_render = async (ctx) => {  //渲染页面
    router_article.get("/chat-query", async (ctx) => {
        ctx.body = chat_obj;
    });
};

//显示文章具体内容
exports.article_query = async (ctx, next) => {
    let _id = ctx.params.id;
    let article = await Article
        .findById(_id)
        .populate("author", "nickname")
        .then(data => data, err => err);
    article_obj = article;
    await next();
};
exports.article_render = async (ctx, next) => {
    ctx.body = fs.readFileSync("./public/html/article.html", "utf8");
    router_article.get("/article-content", async (ctx) => {
        ctx.body = article_obj;
    });
    await next();
};
