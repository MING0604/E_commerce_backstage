import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

import Layout from 'component/layout/index.jsx'
import Login from 'page/login/index.jsx'
import ErrorPage from 'page/error/index.jsx'
import User from 'page/user/index.jsx'
// 页面
import Home from 'page/home/index.jsx'


class App extends Component {
    
    render(){
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' render={()=>{
                        return (
                            <Layout>
                                <Switch>
                                    <Route exact path='/' component={Home}/>
                                    <Route path='/product' component={Home}/>
                                    <Route path='/product-category' component={Home}/>
                                    <Route path='/user/index' component={User}/>
                                    <Redirect exact from='/user' to='/user/index' />
                                    <Route component={ErrorPage}/>
                                </Switch>
                            </Layout>
                        )
                    }}></Route>
                </Switch>
                
            </Router>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)