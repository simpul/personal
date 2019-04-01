import React, {Component} from 'react';
import {connect} from "react-redux";
import { 
    NavLink
 } from "react-router-dom";
import './css/index.scss';

@connect(
    state=>({shop:state})
)
class Index extends Component {
    render() {
        let num = this.props.shop.carCount.data;
        return (
            <div className="tabbar">
                <ul>
                    <li>
                        <NavLink exact to='/'>
                            <i className='iconfont icon-shouye'></i>
                            <span>首页</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='' to="/">
                            <i className='iconfont icon-fenlei'></i>
                            <span>分类</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shopcar">
                            <i className='iconfont icon-gouwuche'></i>
                            <span>购物车</span>
                            <em>{num || '' }</em>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my'>
                            <i className='iconfont icon-wode'></i>
                            <span>我的</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Index;