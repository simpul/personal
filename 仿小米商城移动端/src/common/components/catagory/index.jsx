import React, {Component} from 'react';
import './css/index.scss';
import {Link} from 'react-router-dom';

class Index extends Component {
    state = {
        data: []
    }
    componentDidMount(){
        fetch('http://47.100.98.54:9020/api/category')
            .then(res => res.json())
            .then(data => {
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
            <div className="catagory">
                {
                    data.length > 0 && data.map((item, index) => {
                        return (
                            <Link key={item.id} to={`/shopbuy/${item.shopid}`}><img src={item.picurl} alt={item.alt}/></Link>
                        )
                    })
                }
            </div>
        );
    }
}
export default Index;