//得到Schema对象
const {Schema} = require("../database/connect");

//声明 ObjectId 
const ObjectId = Schema.Types.ObjectId;

//设置规范
const articleSchema = new Schema({
    title: String,
    tips: String,
    content: String,
    author: {
        type: ObjectId,
        ref: "users"
    },
    commentNum: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "createTime"
    }
});

//导出
module.exports = articleSchema;