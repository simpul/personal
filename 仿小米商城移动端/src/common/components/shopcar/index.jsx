import React, {Component} from 'react';
import './css/index.scss';
import {addCar, delCar, getGoodsNum} from '../../../actions/car';
import {connect} from 'react-redux';

@connect(
    state=>({shop:state}),
    {addCar, delCar, getGoodsNum}
)
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            adr: '广东省深圳市',
            goods: [],
            count: 0,
            price: 0
        }
    }

    getData = ()=>{
        let {carCount} = this.props.shop;  //这里面shop包含carCount和user两个reducer分开的state
        //console.log(this.props.shop); // {11:1 ,12:2, 21:7}
        let {goods} = this.state;
        let shopid = Object.keys(carCount);  //[11, 12, 21]
        shopid.pop();
        shopid.forEach((item, index)=>{
            fetch('http://47.100.98.54:9020/api/buygoods/'+item)
                .then(res=>res.json())
                .then(data=>{
                    data['num'] = carCount[item];  //把商品数量也加到里面去渲染页面
                    goods.push(data);
                    this.setState({
                        goods
                    })
                })
        })
        this.getResult();
    }

    getResult = ()=>{
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.totalPrice();
        }, 500);
    }

    totalPrice = () =>{
        let goods = this.state.goods;
        let {getGoodsNum} = this.props;
        let count = 0;
        let price = 0;
        for(let key of goods){
            price += key.num * key.price;
            count += key.num;
        }
        this.setState({
            price,
            count
        });
        getGoodsNum({data:count});
    }

    componentDidMount(){
        this.getData();
    }

    reduceGoods = (index)=>{
        let goods = this.state.goods;
        let {addCar} = this.props;
        let id =  goods[index].shopid
        if(goods[index].num){
            goods[index].num --;
            this.setState({goods});
            addCar({
                id,
                num: -1  
            })
        }
        this.totalPrice();
    }

    addGoods = (index) =>{
        let goods = this.state.goods;
        let {addCar} = this.props;
        ++ goods[index].num;
        let id =  goods[index].shopid
        this.setState({goods});
        addCar({
            id,
            num: 1  //在util中这里是累加多少数量的值
        })
        this.totalPrice();
    }

    delGoods = (index) =>{
        let goods = this.state.goods;
        let {delCar} = this.props;
        let id =  goods[index].shopid;
        goods.splice(index, 1);
        this.setState({goods});
        delCar(id);
        this.totalPrice();
    }

    render() {
        let {adr, goods, price, count} = this.state;
        return (
            <div className="shopcar">
                <div className="shopcar_title">
                    <div className="shopcar_title_left">
                        <a href="/">
                            <i className='iconfont icon-tubiao-'></i>
                        </a>
                    </div>
                    <div className="shopcar_title_middle">
                        购物车
                    </div>
                    <div className="shopcar_title_right">
                        <a href="/">
                            <i className='iconfont icon-sousuo'></i>
                        </a>
                    </div>
                </div>
                {
                    goods.length > 0 && goods.map((item, index)=>{
                        return (
                            <div key={index} className="shopcar_content">
                                <div className="select">
                                    <div className="select_circle"></div>
                                </div>
                                <div className="image">
                                    <img src={item.picurl} alt={item.title}/>
                                </div>
                                <div className="information">
                                    <h3>{item.title}</h3>
                                    <p>售价： {item.symbol+item.price}</p>
                                    <div className="count">
                                        <div onClick={this.reduceGoods.bind(this, index)} className="minus">-</div>
                                        <div className="number">{item.num}</div>
                                        <div onClick={this.addGoods.bind(this, index)} className="plus">+</div>
                                    </div>
                                </div>
                                <div className="delete">
                                    <i onClick={this.delGoods.bind(this, index)} className='iconfont icon-icon--'></i>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="shop_addr">收货地址：{adr}</div>
                <div className="shopcar_menu">
                    <div className="total">
                        共{count}件 金额：
                        <span>{price}</span>元
                    </div>
                    <div className="continue">继续购物</div>
                    <div className="tocount">去结算</div>
                </div>
            </div>
        );
    }
}
export default Index;