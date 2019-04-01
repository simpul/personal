export default function (state = {}, action) {
    let goods = action.data;
    switch (action.type) {
        case 'GET_NAME':
            return goods
        default:
            return state
    }
}