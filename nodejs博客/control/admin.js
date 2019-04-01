const fs = require("fs");

exports.index = async ctx => {
    ctx.body = fs.readFileSync("./public/html/personal.html", "utf8");
};