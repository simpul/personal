import {combineReducers} from 'redux';
import carCount from './carCount';
import user from './user';

//把一个由多个不同的reducer函数作为value的object合并成一个最终的reducer函数
export default combineReducers({
    carCount,
    user
})

