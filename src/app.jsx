import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
// 页面
import Home from 'page/home/index.jsx'

class App extends Component {
    render(){
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path='/' component={Home}/>
                        <Route path='/product' component={Home}/>
                        <Route path='/product-category' component={Home}/>
                    </Switch>
                </Layout>
                
            </Router>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)