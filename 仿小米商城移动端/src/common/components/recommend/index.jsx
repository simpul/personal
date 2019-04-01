import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/index.scss';

class Index extends Component {
    state = {
        data:['./img/1.jpg', './img/2.jpg', './img/3.jpg'],
        shopid: 22
    }
    render() {
        const data = this.state.data;
        return (
            <div className="recommend">
                <Link to={`/shopbuy/${this.state.shopid}`}>
                    <ul className='clearfix'>
                        {
                            data.length > 0 && data.map((item,index)=>{
                                return (
                                    <li key={index}><i><img src={require(`${item}`)} alt=""/></i></li>
                                )
                            })
                        }
                    </ul>                    
                </Link>

            </div>
        );
    }
}
export default Index;