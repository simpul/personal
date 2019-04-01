//得到Schema对象
const {Schema} = require("../database/connect");

//声明 ObjectId 
const ObjectId = Schema.Types.ObjectId;

//设置规范
const commentSchema = new Schema({
    content : String, //评论内容
    author : {  //用户自己的id值
        type : ObjectId,
        ref : "users"  //关联users表
    }, //作者
    article : { //文章id
        type : ObjectId,
        ref : "articles"  //关联articles表
    }
}, {
    versionKey : false,
    timestamps : {
        createdAt : "createTime"
    }
});

//导出
module.exports = commentSchema;