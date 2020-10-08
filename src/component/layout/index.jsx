import React, { Component } from 'react'

import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

import './theme.css'
import './index.scss'

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div id="wrapper">
                <TopNav />
                <SideNav />
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default Layout