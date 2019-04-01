import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './css/index.scss';

class Index extends Component {
    render() {
        return (
            <div className='notfound'>
                <img src={require('./img/404.jpg')} alt="404"/>
                <div>咦~页面不见了~</div>
                <NavLink to={'/'}>返回首页 mi.com</NavLink>
            </div>
        );
    }
}
export default Index;