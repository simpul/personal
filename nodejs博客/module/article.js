const {db} = require("../database/connect"); //得到数据库的操控对象
const articleSchema = require("../Schema/article"); //得到article表数据的规范
const objUser = db.model("articles", articleSchema); //操控users表的对象

module.exports = objUser; //导出能操控article表的对象
//article   articles