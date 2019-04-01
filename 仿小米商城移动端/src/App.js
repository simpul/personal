import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from './common/components/home';
import Notfound from './common/components/notfound';
import My from './common/components/my';
import Shopcar from './common/components/shopcar';
import Shop from './common/components/shop';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/my' component={My} />
                    <Route path='/shopcar' component={Shopcar} />
                    <Route path='/shopbuy/:shopid' component={Shop} />
                    <Route component={Notfound} />                    
                </Switch>
            </Router>          
        );
    }
}

export default App;
