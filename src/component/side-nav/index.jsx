import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class SideNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item_data:[
                {
                    name:'首页',
                    url:'/',
                    isExact:true,
                    iconClass:'fa fa-dashboard',
                    hasChild:false,
                    isActive:false,
                    children:null
                },
                {
                    name:'商品',
                    url:'/product',
                    isExact:false,
                    iconClass:'fa fa-sitemap',
                    hasChild:true,
                    isActive:false,
                    children:[
                        {
                            name:'商品管理',
                            url:'/product'
                        },
                        {
                            name:'品类管理',
                            url:'/product-category'
                        }
                    ]
                },
                {
                    name:'订单',
                    url:'/order',
                    isExact:false,
                    iconClass:'fa fa-sitemap',
                    hasChild:true,
                    isActive:false,
                    children:[
                        {
                            name:'订单管理',
                            url:'/order'
                        }
                    ]
                },
                {
                    name:'用户',
                    url:'/user',
                    isExact:false,
                    iconClass:'fa fa-sitemap',
                    hasChild:true,
                    isActive:false,
                    children:[
                        {
                            name:'用户管理',
                            url:'/user'
                        }
                    ]
                }
            ]
        }
    }

    handleClick(index){
        let item_data=JSON.parse(JSON.stringify(this.state.item_data))
        item_data=item_data.map((v,i)=>{
            if(i==index){
                v.isActive=!v.isActive;
            }else{
                v.isActive=false;
            }
            return v
        })
        this.setState({
            item_data
        })
    }
    render() {
        return (
            <div className="navbar-default navbar-side">
            <div className="sidebar-collapse">
                <ul className="nav" >
                    {this.state.item_data.map((v,i)=>{
                        return(
                            <li key={i} className={v.isActive?'active':''}>
                                {
                                    v.children?
                                    (
                                        <Link to={v.url} data-index={i} onClick={(e)=>{this.handleClick(e.target.getAttribute("data-index"))}}>
                                            <i className={v.iconClass}></i>
                                            <span>{v.name}</span>
                                            {
                                                v.children?(
                                                    <span className="fa arrow"></span>
                                                ):null
                                            }
                                        </Link>
                                    )
                                    :
                                    (
                                        <NavLink to={v.url} exact={v.isExact} activeClassName='active-menu'>
                                            <i className={v.iconClass}></i>
                                            <span>{v.name}</span>
                                            {
                                                v.children?(
                                                    <span className="fa arrow"></span>
                                                ):null
                                            }
                                        </NavLink>
                                    )
                                }
                                {
                                    v.children?(
                                        <ul className={`nav nav-second-level collapse ${v.isActive?'in':''}`}>
                                            {
                                                v.children.map((v,i)=>{
                                                    return(
                                                        <li key={i}>
                                                            <NavLink to={v.url} activeClassName='active-menu'>{v.name}</NavLink>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )
                                    :
                                    null
                                }
                            </li>
                        )
                    })}
                   
                </ul>

            </div>

        </div>
        )
    }
}

export default SideNav
// 以下使原本教程中使用的代码，我将其进行了重写
{/* <li>
    <NavLink to="/" exact activeClassName='active-menu'>
        <i className="fa fa-dashboard"></i>
        <span>首页</span>
    </NavLink>
</li>
<li className='active'>
    <Link to="/product">
        <i className="fa fa-sitemap"></i> 
        <span>商品</span>
        <span className="fa arrow"></span>
    </Link>
    <ul className="nav nav-second-level collapse in" >
        <li>
            <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
        </li>
        <li>
            <NavLink to="/product-category" activeClassName="active-menu">品类管理</NavLink>
        </li>
    </ul>
</li>
<li className='active'>
    <Link to="/order">
        <i className="fa fa-sitemap"></i> 
        <span>订单</span>
        <span className="fa arrow"></span>
    </Link>
    <ul className="nav nav-second-level collapse in">
        <li>
            <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
        </li>
    </ul>
</li>
<li className='active'>
    <Link to="/user">
        <i className="fa fa-sitemap"></i> 
        <span>用户</span>
        <span className="fa arrow"></span>
    </Link>
    <ul className="nav nav-second-level collapse in">
        <li>
            <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
        </li>
    </ul>
</li> */}