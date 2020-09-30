import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import PageTitle from 'component/page-title/index.jsx'
class Error extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title='出错啦!'>
                    <div className="row">
                        <div className="col-md-12">
                            <span>找不到改路径，</span>
                            <Link to='/'>点我返回首页</Link>
                        </div>
                    </div>
                </PageTitle>
            </div>
        )
    }
}

export default Error