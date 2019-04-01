const crypto = require("crypto"); //导入加密模块 得到加密对象


module.exports = function(pwd, key = "simple"){ 
    let hmac = crypto.createHmac("sha256", key);
    hmac.update(pwd);
    return hmac.digest("hex");  //加密后的数据
};
