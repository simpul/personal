const Koa = require("koa"); //建立服务
const static = require("koa-static"); //管理静态资源
const views = require("koa-views"); //模块引擎
const router = require("./routers/router"); //处理路由
const {
    router_user
} = require("./control/user");
const {
    router_article
} = require("./control/article");
const {
    router_comment
} = require("./control/comments");
const logger = require("koa-logger"); //日志模块
const {
    join
} = require("path"); //路径拼接
const body = require("koa-body"); //得到post请求数据
const session = require("koa-session");

const app = new Koa();
app.keys = ["simple"];

//session 的配置对象
const CONFIG = {
    key: 'sessionId',
    maxAge: 1000 * 60 * 60,
    overwrite: true,
    httpOnly: true,
    // signed: true,
};

//注册中间件
app
    .use(logger()) //注册日志 
    .use(session(CONFIG, app)) //注册session
    .use(body())
    .use(static(join(__dirname, "public"))) //注册静态资源
    .use(views(join(__dirname, "views"), {
        extension: "pug"
    })); //注册pug模板

//注册路由信息
app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(router_user.routes())
    .use(router_user.allowedMethods())
    .use(router_article.routes())
    .use(router_article.allowedMethods())
    .use(router_comment.routes())
    .use(router_comment.allowedMethods());

app.listen(3000, () => {
    console.log("listen at 3000 port!");
});

{ //创建管理员用户
    const User = require("./module/user"); //得到操控集合的对象
    const crypto = require("./utils/encrypt"); //得到加密的方法
    User
        .find({
            nickname: "admin"
        })
        .then(data => {
            if (data.length === 0) {
                //不存在，创建管理员
                new User({
                        nickname: "admin",
                        password: crypto("123"),
                        role: 999
                    })
                    .save()
                    .then(data => {
                        console.log("创建管理员admin成功");
                    }, err => {
                        console.log("管理员创建失败");
                    })

            } else {
                //已存在
                console.log("管理员admin 密码：123");
            }
        });
}