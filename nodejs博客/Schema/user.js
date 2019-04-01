//得到Schema对象
const {Schema} = require("../database/connect");

//设置规范
const userSchema = new Schema({
    nickname : String,
    password : String,
    email : String,
    avatar : {
        type: String,
        default: "/img/avatar/lemon.jpg"
    },
    role: {
        type: Number,
        default: 1
    }
}, {versionKey : false});

//导出
module.exports = userSchema;