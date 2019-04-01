const Router = require("koa-router");
const fs = require("fs");
const router = new Router;
const user = require("../control/user");  //得到需要特殊处理的中间件
const article = require("../control/article");
const comment = require("../control/comments");
const admin = require("../control/admin");
const upload = require("../utils/upload");

//处理路由
//根路由//
router.get("/", user.keepLogin, async (ctx, next) => {
    ctx.body = fs.readFileSync("./public/html/index.html", "utf8");
    await next();
}, user.islog);

//登陆页面//
router.get("/login", async (ctx) => {
    ctx.body = fs.readFileSync("./public/html/login.html", "utf8");
});

//注册页面//
router.get("/register", user.repeat);

//注册后状态判断//
router.post("/register", user.reg);

//登陆后状态判断//
router.post("/login", user.login, user.logstate);

//登出//
router.get("/logout", user.logout);

//进入编辑文章页面//
router.get("/publish", user.keepLogin, article.edit, user.islog);

//发表文章//
router.post("/publish", article.publish);

//前端技术文章页面//
router.get("/web/:id", user.keepLogin, article.web_query, user.islog, article.web_render);
router.get("/web", user.keepLogin, article.web_query, user.islog, article.web_render);

//摄影文章页面//
router.get("/photo/:id", user.keepLogin, article.photo_query, user.islog, article.photo_render);
router.get("/photo", user.keepLogin, article.photo_query, user.islog, article.photo_render);

//阅读文章页面//
router.get("/write/:id", user.keepLogin, article.write_query, user.islog, article.write_render);
router.get("/write", user.keepLogin, article.write_query, user.islog, article.write_render);

//聊天文章页面//
router.get("/chat/:id", user.keepLogin, article.chat_query, user.islog, article.chat_render);
router.get("/chat", user.keepLogin, article.chat_query, user.islog, article.chat_render);

//显示文章页面//
router.get("/article/:id", user.keepLogin, article.article_query, article.article_render, user.islog);

//提交评论//
router.post("/comment", comment.publish);

//显示评论信息//
router.post("/comment-display", comment.display);

//个人中心
router.get("/personal", admin.index);

//头像上传
router.post("/upload", upload.single("file"), user.unload);


module.exports = router;