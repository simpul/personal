import React, {Component} from 'react';
import "./index.scss";

class Index extends Component {
    state = {
        data: '请搜索商品名称'
    }
    render() {
        return (
            <header className='index_top'>
                <div className="logo">
                    <img
                        src={require('./img/logo.png')}
                        alt="logo.png"
                        width='100%'
                        height='100%'/>
                </div>
                <div className="search">
                    <i className="iconfont icon-sousuo"></i>
                    <span>{this.state.data}</span>
                </div>
                <div className="login iconfont icon-wode"></div>
            </header>
        );
    }
}
export default Index;