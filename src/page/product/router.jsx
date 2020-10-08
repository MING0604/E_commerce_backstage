import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'
class ProductRouter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <Switch>
                <Route path='/product/index' component={ProductList}></Route>
                <Route path='/product/save/:pid?' component={ProductSave}></Route>
                <Route path='/product/detail/:pid' component={ProductDetail}></Route>
                <Redirect exact from='/product' to='/product/index' />
            </Switch>
        )
    }
}

export default ProductRouter