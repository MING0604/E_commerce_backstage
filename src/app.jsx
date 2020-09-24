import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
class A extends Component {
    constructor(props){
        super(props)
        
    }
   render() {
       console.log(this.props.match.params)
        return (
            <div>
                Component A
                <Switch>
                     <Route exact path={`${this.props.match.path}`} render={(route)=>{
                        return <div>当前组件无参数</div>
                    }}></Route>
                    <Route path={`${this.props.match.path}/:id`} render={(route)=>{
                        return <div>当前组件的参数是 {route.match.params.id}</div>
                    }}></Route>
                    
                </Switch>
            </div>
        )
    }
}
class B extends Component {
    render() {
        return (
            <div>Component B</div>
        )
    }
}
class Wrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to='/a/123'>有参数组件A</Link>
                <br/>
                <Link to='/a'>无参数组件A</Link>
                <br/>
                <Link to='/b'>组件B</Link>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path="/a" component={A}></Route>
            <Route path='/b' component={B}></Route>
        </Wrapper>       
    </Router>
,
    document.querySelector('#app')
)