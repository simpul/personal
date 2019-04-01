import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './css/index.scss';
import {addCar, getGoodsNum} from '../../../actions/car';

@connect(
    state=>({shop:state}),
    {addCar, getGoodsNum}
)
class Index extends Component {
    state = {
        data: {},
        num: 0,
        id: undefined,
        carNum: this.props.shop.carCount.data,
        isAdd : false
    }
    componentDidMount(){
        let id = this.props.match.params.shopid;
        fetch('http://47.100.98.54:9020/api/buygoods/'+id)
            .then(res=>res.json())
            .then(data=>{
                this.setState({data, id})
            })
        
    }

    reduceGoods = ()=>{
        let num = this.state.num - 1;
        if(num < 0) return
        this.setState({num});    
    }

    addGoods = ()=>{
        let num = this.state.num + 1;
        this.setState({num});
    }

    submitRedux = (e)=>{
        let {num, id} = this.state;
        let {addCar} = this.props;
        let target = e.currentTarget;
        if(num && !this.state.isAdd){
            addCar({
                id,
                num
            })
            let carNum = JSON.parse(window.localStorage.getItem('shopInfo')).data+this.state.num;          
            this.props.getGoodsNum({data:carNum});
            setTimeout(() => {
                this.setState({carNum:this.props.shop.carCount.data, isAdd: true});
                target.style.background = 'grey';
            }, 500);
        }
    }

    render() {
        const data = this.state.data;
        const num = this.state.carNum;
        return (
            <div className="shop">
                <div className='shop_img'>
                    <img src={data.picurl} alt={data.title} />
                </div>
                <div className="shop_des">
                    <h3>{data.title}</h3>
                    <p>
                        <span></span>
                        {data.des}
                    </p>
                    <p>
                        <span>{data.symbol+data.price}</span>
                    </p>
                </div>
                <div className="shop_count">
                    <div className="shop_buy">购买数量：</div>
                    <div className="shop_total">
                        <div className="minus" onClick={this.reduceGoods}>-</div>
                        <div className="number">{this.state.num}</div>
                        <div className="plus" onClick={this.addGoods}>+</div>
                    </div>    
                </div>
                <Link to="/"><i className='iconfont icon-tubiao-'></i></Link>
                <Link to="/"><i className='iconfont icon-iconfontzhizuobiaozhun20'></i></Link>
                <div className="shop_menu">
                    <div className="shop_menubody">
                        <div className="shop_list">
                            <ul>
                                <li>
                                    <Link to="/">
                                        <i className='iconfont icon-shouye'></i>
                                        <br/>
                                        <span>首页</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/shopcar">
                                        <i className='iconfont icon-gouwuche'></i>
                                        <br/>
                                        <span>购物车</span>
                                        {
                                            num ? <b>{num}</b> : ''
                                        }
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div onClick={this.submitRedux} className="shop_tocar">
                            <div >{this.state.isAdd ? '添加成功！' : '加入购物车'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Index;