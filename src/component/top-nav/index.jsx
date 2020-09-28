import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Mutil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
 
let _user = new User()
let _mm = new Mutil()
class TopNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:_mm.getStorage('userInfo').username || ''
        }
    }
    // 这是退出登录
    onLogout(){
        _user.logout().then(res=>{
            _mm.removeStorage('userInfo')
            window.location.reload()
        },errMsg=>{
            _mm.errorTips(errMsg)
        })
    }
    onLogin(){
        _mm.doLogin()
    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>SPCMING</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                                {
                                    this.state.username?
                                    <span>欢迎，{this.state.username}</span>
                                    :
                                    <span>请登录</span>
                                }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                {
                                    this.state.username?
                                    <a onClick={()=>{this.onLogout()}} href='javascript:;'>
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span>退出登录</span>
                                    </a>
                                    :
                                    <a onClick={()=>{this.onLogin()}} href='javascript:;'>
                                    <i className="fa fa-address-book">&nbsp;&nbsp;&nbsp;</i> 
                                    <span>登录</span>
                                    </a>
                                }
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TopNav