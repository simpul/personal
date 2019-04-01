const multer = require("koa-multer");
const {join} = require("path");

//配置跟存储相关的属性
const storage = multer.diskStorage({
    destination: join(__dirname, "../public/img/avatar"),
    filename(req, file, cb){
        const arrFileName = file.originalname.split(".");
        cb(null, `${Date.now()}.${arrFileName[arrFileName.length - 1]}`);
    }
});

module.exports = multer({storage});