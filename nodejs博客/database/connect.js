const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://localhost:27017/blog", {
    useNewUrlParser : true
});
mongoose.Promise = global.Promise;

db.on("error", () => {
    console.log("database connection fail!");
});
db.on("open", () => {
    console.log("database connection success!");
});

const Schema = mongoose.Schema;  //得到Schema类，用于规范数据类型

module.exports = {
    db,
    Schema
};