export function addCar(data){
    return {
        type: 'CAR_ADD',
        data
    }
}

export function delCar(data){
    return {
        type: 'CAR_DEL',
        data
    }
}

export function getGoodsNum(data){
    return {
        type: 'CAR_GOODS_NUM',
        data
    }
}