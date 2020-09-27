import React, { Component } from 'react'
import Mutil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
import './index.scss'

const _user = new User()
const _mm = new Mutil()
class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:'',
            redirect:_mm.getUrlParams('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登陆 - SPCMING MMALL'
    }
    // 表单元素数据改变
    onInputChange(e){
        let inputValue = e.target.value,
            inputName  = e.target.name
        this.setState({
            [inputName]:inputValue
        })
    }
    // 表单提交
    onSubmit(e){
        let loginInfo = {
            username:this.state.username,
            password:this.state.password
        },
            checkResult = _user.checkLoginInfo(loginInfo)
        // 验证通过
        if(checkResult.status){
            _user.login(loginInfo)
            .then(res=>{
                // console.log(this.state.redirect)
                this.props.history.push(this.state.redirect)
            },err=>{
                _mm.errorTips(err)
            })
        }
        else{
            _mm.errorTips(checkResult.msg)
        }
        
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit()
        }
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆 —— MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text" 
                                    name='username'
                                    className="form-control"
                                    placeholder="请输入用户名" 
                                    value={this.state.username}
                                    onKeyUp={e=>{this.onInputKeyUp(e)}}
                                    onChange={e=>{this.onInputChange(e)}}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name='password'
                                    className="form-control"
                                    placeholder="请输入密码"
                                    value={this.state.password}
                                    onKeyUp={e=>{this.onInputKeyUp(e)}}
                                    onChange={e=>{this.onInputChange(e)}}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={e=>this.onSubmit(e)}>登陆</button>
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default Login