import React, { Component } from 'react'
import User from 'service/user-service.jsx'
import Mutil from 'util/mm.jsx'

import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx'

const _mm = new Mutil()
const _user = new User()

class UserList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list:[],
            pageNum:1
        }
    }
    componentDidMount(){
        this.loaderList()
    }
    loaderList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res)
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg)
        })
    }
    // 页数发生变化的时候
    pageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loaderList()
        })
    }
    render() {
        let listBody=this.state.list.map((user,index)=>{
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        return (
            <div id="page-wrapper">
                <PageTitle title='用户列表'>
                    <TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
                        {listBody}
                    </TableList>
                    <Pagination current={this.state.pageNum} 
                                total={this.state.total} 
                                onChange={(pageNum)=>this.pageNumChange(pageNum)}/>
                </PageTitle>
            </div>
        )
    }
}

export default UserList