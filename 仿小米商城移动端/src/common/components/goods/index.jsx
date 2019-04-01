import React, {Component} from 'react';
import './css/index.scss';
import {Link} from 'react-router-dom';

class Index extends Component {
    state = {
        data: []
    }
    componentDidMount(){
        fetch('http://47.100.98.54:9020/api/goods')
            .then(res=>res.json())
            .then(data=>{
            if(data.status === 200){
                this.setState({
                    data: data.data
                })
            }
        })
    }
    render() {
        const data = this.state.data;
        return (
            <div className="goods">
                <ul>
                    {
                        data.length > 0 && data.map((item, index)=>{
                            return (
                                <li key={item.id}>
                                    <Link to={`/shopbuy/${item.shopid}`}>
                                        <div className='goods_shop'>
                                            <img src={item.picurl} alt={item.title}/>
                                        </div>
                                        <div className="info">
                                            <p className='goods_title'>{item.title}</p>
                                            <p className='goods_des'>{item.des}</p>
                                            <p className='goods_price'>
                                                {item.symbol+item.price+item.font}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
export default Index;