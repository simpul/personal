import React, {Component} from 'react';
import Head from '../indextop';
import Banner from '../banner';
import Catagory from '../catagory';
import Recommend from '../recommend';
import Conference from '../conference';
import Goods from '../goods';
import Tabbar from '../tabbar';
import LazyLoad from 'react-lazyload';

class Index extends Component {
    render() {
        return (
            <div className="App">
                <Head/>
                <Banner/>
                <Catagory/>
                <Recommend/>
                <Conference/>
                <LazyLoad height={200}>
                    <Goods/>    
                </LazyLoad>
                
                <Tabbar/>
            </div>
        );
    }
}
export default Index;