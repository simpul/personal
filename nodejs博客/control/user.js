const User = require("../module/user"); //得到操控集合的对象
const crypto = require("../utils/encrypt"); //得到加密的方法
const fs = require("fs");
const Router = require("koa-router");
const router_user = new Router; //定义在这里使用的router
let obj = null;

exports.router_user = router_user;

//处理用户注册的中间件//
exports.reg = async (ctx) => {
    //得到post发过来的数据  得到用户名和密码
    ctx.body = fs.readFileSync("./public/html/reg-state.html", "utf8");
    let {
        nickname,
        password,
        email
    } = ctx.request.body;
    await new Promise((res, rej) => {
        //先去数据库user集合查询是否有同名
        User.find({
            nickname
        }, (err, data) => {
            // 查询报错了
            if (err) return rej(err); //报错，传递失败状态和错误对象

            //查询中没报错,但是找到同名的数据了
            if (data.length !== 0) return res("");

            //查询中没报错，并且没有找到同名的数据,可以注册
            const userobj = new User({
                nickname,
                password: crypto(password), //加密的密码
                email
            });

            //将数据保存到数据库
            userobj.save((err, data) => {
                if (err) {
                    rej("save fail");
                } else {
                    res("save success");
                }
            });
        });
    }).then(async data => {
        if (data) {
            //注册成功 ，渲染等待页,之后跳转登录页
            router_user.get("/reg-state", async (ctx) => {
                ctx.body = {
                    text: "Hi新朋友，注册成功，即将为你跳转至登陆页面...",
                    url: "/login"
                };
            });
        } else {
            //空字符串，用户名已存在
            router_user.get("/reg-state", async (ctx) => {
                ctx.body = {
                    text: "Sorry，有人与你有缘抢先注册了你的名字，请换个ID再来吧...",
                    url: "/register"
                };
            });
        }
    }, async err => {
        router_user.get("/reg-state", async (ctx) => {
            ctx.body = {
                text: "Opps，服务器菌抽风导致注册失败，请重新尝试...",
                url: "/register"
            };
        });
    });
};

//处理用户登录的中间件//
exports.login = async (ctx, next) => {
    //得到post发过来的数据  得到用户名和密码
    let {
        nickname,
        password
    } = ctx.request.body;
    await new Promise((res, rej) => {
        //先去数据库user集合查询是否有同名
        User.find({
            nickname
        }, (err, data) => {
            // 查询报错了
            if (err) return rej(err); //报错，传递失败状态和错误对象
            //查询中没报错,但是没查到数据
            if (data.length === 0) return rej(0);
            console.log('data is here!!!',data);
            //用户名存在，比对密码是否一致
            //将用户传过来的密码加密，和数据库中中的加密密码进行比对
            if (data[0].password === crypto(password)) {
                return res(data);
            } else {
                return res(""); //查询到数据，但是密码没对
            }
        });
    }).then(async data => {
        if (data) {
            //登录成功
            obj = {
                text: "亲欢迎回来，即将为你跳转至首页...",
                url: "/"
            };
            //设置cookie
            ctx.cookies.set("nickname", nickname, {
                //配置cookie的属性
                domain: "localhost",
                path: "/",
                maxAge: 1000 * 60 * 60, //60分钟有效
                httpOnly: true, //不让客户端操控这条cookie
                overwrite: false
            });
            ctx.cookies.set("userId", data[0]._id, {
                domain: "localhost",
                path: "/",
                maxAge: 1000 * 60 * 60,
                httpOnly: true, 
                overwrite: false
            });
            ctx.cookies.set("avatar", data[0].avatar, {
                domain: "localhost",
                path: "/",
                maxAge: 1000 * 60 * 60,
                httpOnly: true, 
                overwrite: false
            });

            //设置后台的session内的字段
            ctx.session = {
                nickname,
                userId: data[0]._id,
                avatar: data[0].avatar,
                role: data[0].role
            };

        } else {
            //密码错误，登录不成功
            obj = {
                text: "是不是密码错了呀？翻翻小本本看下呗...",
                url: "/login"
            };
        }
    }, async err => {
        if (err === 0) {
            //用户名不存在
            obj = {
                text: "不存在的ID菌，去注册一个吧！",
                url: "/register"
            };
        } else {
            //其他错误
            obj = {
                text: "服务器菌睡着了，请再尝试一次...",
                url: "/login"
            };
        }
    });
    ctx.body = fs.readFileSync("./public/html/log-state.html", "utf8");  //返回前端一个判断登录状态的页面（会立即向路由/log-state发起一个ajax请求）
    await next();
};
exports.logstate = async (ctx) => {
    router_user.get("/log-state", async (ctx) => {
        ctx.body = obj;
    });
};

//确定用户状态的中间件//
exports.keepLogin = async (ctx, next) => {
    //判断session是否存在
    // console.log(ctx.session.isNew);
    if (ctx.session.isNew) {
        //从未登录过
        if (ctx.cookies.get("userId")) {
            //cookie有，session 没有
            //更新一下session
            ctx.session = {
                nickname: ctx.cookies.get("nickname"),
                userId: ctx.cookies.get("userId"),
                avatar: ctx.cookies.get("avatar")
            };
        }
    }
    await next();
    /* 
        若未登陆过，session有一个isNew的属性值为true
        ctx.session = { isNew : true }
    */
};

//根据登录状态显示不同内容//
exports.islog = async (ctx, next) => {
    router_user.get("/islog", async (ctx) => {
        if (ctx.session.isNew) { //从未登陆过
            ctx.body = {
                element: ".nolog"
            };
        } else { //保持登陆状态
            ctx.body = {
                element: ".log",
                nickname: ctx.session.nickname,
                avatar: ctx.session.avatar
            };
        }
    });
    await next();
};

//判断注册id是否重名//
exports.repeat = async (ctx) => {   
    ctx.body = fs.readFileSync("./public/html/register.html", "utf8"); //先渲染出注册的页面
    router_user.post("/repeat", async (ctx) => {  //等待前端发起ajax请求
        let {
            nickname
        } = ctx.request.body,  //取得用户填的id名
        obj = null;
        await User.find({    //在数据库中查找
            nickname
        }, (err, data) => {
            if (err) obj = {
                text: "发生错误，无法查询id是否重名",
                clear: false  //是否自动清空id栏内的内容
            }; 
            if (data.length === 0){
                obj = {
                    text: "可用的id名字",
                    clear: false
                };
            }else{
                obj = {
                    text: "有人已经用过这个id咯，再想一个吧",
                    clear: true
                };
            }
        });
        ctx.body = obj;
    });
};

//登出//
exports.logout = async (ctx) => {
    ctx.session = null; //重置session
    ctx.cookies.set("nickname", null, {
        maxAge: 0
    });
    ctx.cookies.set("userId", null, {
        maxAge: 0
    });
    ctx.cookies.set("avatar", null, {
        maxAge: 0
    });
    // 重定向 到根路由 ---首页
    ctx.redirect("/");    
};





//更改头像
exports.unload = async (ctx) => {
    const filename = ctx.req.file.filename;
    var isChange = false;
    await User.update(
        {_id: ctx.session.userId},
        {$set: {avatar: "/img/avatar/" + filename}}
    ).then(data => {
        isChange = true;
        ctx.session.avatar = "/img/avatar/" + filename;
        ctx.cookies.set("avatar", "/img/avatar/" + filename, {
            domain: "localhost",
            path: "/",
            maxAge: 1000 * 60 * 60, 
            httpOnly: true, 
            overwrite: false
        });
        ctx.body = {
            "status": 1,
            "msg": "上传成功"
        }
    }, err => {
        ctx.body = {
            "status": 0,
            "msg": "上传失败"
        }
    });
    console.log(isChange);
};