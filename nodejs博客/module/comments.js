const {db} = require("../database/connect"); //得到数据库的操控对象
const commentSchema = require("../Schema/comments"); //得到comment表数据的规范
const objUser = db.model("comments", commentSchema); //操控users表的对象

module.exports = objUser; //导出能操控comment表的对象
//comment   comments