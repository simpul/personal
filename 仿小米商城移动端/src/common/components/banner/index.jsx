import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import './css/index.scss';
import Swiper from 'swiper';   //引用swiper组件
import 'swiper/dist/css/swiper.min.css';  //引用swiper内置的css样式


class Index extends Component {
    state = {
        data: []
    }
    play(){
        new Swiper('.swiper-container', {
            autoplay: {
              disableOnInteraction : false,  
            },
            pagination: {
                el: '.swiper-pagination',
            },
            loop: true
        });
    }
    componentDidMount(){
        fetch('http://47.100.98.54:9020/api/banner')
            .then(res=>{
                return res.json()
            })
            .then(data=>{
            if(data.status === 200){
                this.setState({data: data.data}, this.play)  //这里需要state更新和DOM渲染完毕后，swiper组件才能起效
            }
        })
    }
    render() {
        return (
            <div className="banner swiper-container">
                <ul className='swiper-wrapper'>
                    {   
                        this.state.data.length > 0 && this.state.data.map((item, index) => {
                            return (
                                <li className='swiper-slide' key={item.id}>
                                    <Link to={`/shopbuy/${item.shopid}`}>
                                        <img src={item.picurl} alt={item.alt} />
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="swiper-pagination"></div>
            </div>
        );
    }
}
export default Index;