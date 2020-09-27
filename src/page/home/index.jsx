import React, { Component } from 'react'
import PageTitle from 'component/page-title/index.jsx'

import 'page/home/index.css'
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页">
                    <button className="btn btn-warning">error</button>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        )
    }
}

export default Home