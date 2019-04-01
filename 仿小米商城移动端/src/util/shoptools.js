let shopTools = {}
let shop = JSON.parse(window.localStorage.getItem('shopInfo') || '{}')
// shop => {商品id1：商品数量， 商品id2：商品数量 , data : 商品总数量}

// 更新商品
shopTools.addUpdate = function(goods){
    //判断是否已存在商品id 存在就累加 goods={id:"21", num:5}
    if(shop[goods.id]){
        shop[goods.id] += goods.num
    }else{
        shop[goods.id] = goods.num
    }
    this.saveShops();
}

//删除
shopTools.delete = function(id){
    delete shop[id];
    this.saveShops();
}

//默认要获取商品
shopTools.getShop = function(){
    return JSON.parse(window.localStorage.getItem('shopInfo') || '{}')
}

//不管什么操作都要存储
shopTools.saveShops = function(obj){
    let newShop = Object.assign({}, shop, obj);
    window.localStorage.setItem('shopInfo', JSON.stringify(newShop));
}

export default shopTools