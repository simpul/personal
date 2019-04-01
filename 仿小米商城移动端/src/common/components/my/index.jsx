import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './css/index.scss';
import Tabbar from '../tabbar';
class Index extends Component {
    render() {
        return (
            <div className="my">
                <div className="login">
                    <div className="login_button"></div>
                    <div className="login_text">
                        登陆/注册
                    </div>
                </div>
                <div className="myorder">
                    <div className="myorder_my">
                        我的订单
                    </div>
                    <div className="myorder_all">
                        全部订单
                        <span>&gt;</span>
                    </div>
                </div>
                <div className="status">
                    <div className="pay">
                        <a href="/">
                            <div className='iconfont icon-fukuan'></div>
                            <span>待付款</span>
                        </a>
                    </div>
                    <div className="receive">
                        <a href="/">
                            <div className='iconfont icon-daishouhuo'></div>
                            <span>待收货</span>                        
                        </a>
                    </div>
                    <div className="repair">
                        <a href="/">
                            <div className='iconfont icon-iconset0204'></div>
                            <span>退换修</span>                        
                        </a>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            <NavLink to="/">
                                <div className="menu_img">
                                    <img src={require('./img/VIP.png')} alt=""/>
                                </div>
                                <div className="menu_text">
                                    会员中心
                                    <span>&gt;</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className='border'></li>
                        <li>
                            <NavLink to="/">
                                <div className="menu_img">
                                    <img src={require('./img/discount.png')} alt=""/>
                                </div>
                                <div className="menu_text">
                                    我的优惠
                                    <span>&gt;</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <div className="menu_img">
                                    <img src={require('./img/service.png')} alt=""/>
                                </div>
                                <div className="menu_text">
                                    服务中心
                                    <span>&gt;</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className='border'></li>
                        <li>
                            <NavLink to="/">
                                <div className="menu_img">
                                    <img src={require('./img/home.png')} alt=""/>
                                </div>
                                <div className="menu_text">
                                    小米之家
                                    <span>&gt;</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <div className="menu_img">
                                    <img src={require('./img/F.png')} alt=""/>
                                </div>
                                <div className="menu_text">
                                    F码通道
                                    <span>&gt;</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <div className="menu_img">
                                    <img src={require('./img/setting.png')} alt=""/>
                                </div>
                                <div className="menu_text">
                                    设置
                                    <span>&gt;</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Tabbar></Tabbar>
            </div>
        );
    }
}
export default Index;