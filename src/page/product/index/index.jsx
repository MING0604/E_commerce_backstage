import React, { Component } from 'react'
import Product from 'service/product-service.jsx'
import Mutil from 'util/mm.jsx'

import ListSearch from './index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx'
import { Link } from 'react-router-dom';

import './index.scss'
const _mm = new Mutil()
const _product = new Product()

class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list:[],
            pageNum:1,
            listType:'list'
        }
    }
    componentDidMount(){
        this.loaderList()
    }
    // 加载商品列表
    loaderList(){
        let listParam ={};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是搜索需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
            console.log(listParam)
        }
        // 请求接口
        _product.getProductList(listParam).then(res=>{
            this.setState(res)
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg)
        })
    }
    // 搜索
    onSearch(searchType,searchKeyword){
        let listType = searchKeyword === ''?'list' : 'search'
        this.setState({
            listType,
            pageNum:1,
            searchType,
            searchKeyword
        },()=>{
            this.loaderList();
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
    onSetProductStatus(e,productId,currentStatus){
        let newStatus = currentStatus ==1 ? 2 : 1,
            confirmTips = currentStatus ==1 ? '确定要下架该商品？':"确定要上架该商品？"
        if(window.confirm(confirmTips)){
            console.log('test1')
            _product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then(res=>{
                _mm.successTips(res)
                this.loaderList()
            },errMsg=>{
                _mm.errorTips(errMsg)
            })
        }
    }
    render() {
        let tableHeads = [
            {name:'商品ID',width:'10%'},
            {name:'商品信息',width:'50%'},
            {name:'价格',width:'10%'},
            {name:'状态',width:'15%'},
            {name:'操作',width:'15%'}
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title='商品列表' >
                    <div className="page-header-right">
                        <Link className='btn btn-primary' to='/product/save'>
                            <i className='fa fa-plus'></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword)=>this.onSearch(searchType,searchKeyword)}></ListSearch>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status === 1 ? '在售':'已下架'}</p>
                                        <button className="btn btn-xs btn-warning" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status === 1 ? '下架':'上架'}</button>
                                    </td>
                                    <td>
                                        <Link className="opera" to={`/product/detail/${product.id}`}>查看详情</Link>
                                        <Link className="opera" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} 
                            total={this.state.total} 
                            onChange={(pageNum)=>this.pageNumChange(pageNum)}/>
                
            </div>
        )
    }
}

export default ProductList