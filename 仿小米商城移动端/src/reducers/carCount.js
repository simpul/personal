import shopTools from '../util/shoptools';

//购物车的功能
//事件交互 所改变的状态 都交给 redux处理
export default function (state = {}, action) {
    let goods = action.data;  // action.data = {id, num}
    switch (action.type) {
        case 'CAR_ADD':
            shopTools.addUpdate(goods);
            return shopTools.getShop();
        case 'CAR_DEL':
            shopTools.delete(goods)
            return shopTools.getShop();
        case 'CAR_GOODS_NUM':
            let newState = Object.assign({},state,goods);
            shopTools.saveShops(newState);
            return newState;
        default:
            return shopTools.getShop();
    }
}