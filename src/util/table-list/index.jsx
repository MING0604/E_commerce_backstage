import React, { Component } from 'react'

// 通用分页
class Pagination extends Component{
    constructor(props){
        super(props)
        this.state={
            isFirstLoading:true
        }
    }
    componentWillReceiveProps(){
        // 只有在第一次挂载的时候inFirstLoading为true，其他都是false
        this.setState({
            isFirstLoading:false
        })
    }
    render(){
        // 表头信息
        let tableHeader = this.props.tableHeads.map(
            (tableHead,i) => {
                if(typeof tableHead === 'object'){
                    return <th key={i} width={tableHead.width} >{tableHead.name}</th>
                }else if(typeof tableHead === 'string'){
                    return <th key={i}>{tableHead}</th>
                }
            }
        );
        // 列表内容
        let listBody = this.props.children;
        // 列表信息
        let listInfo =(
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">{this.state.isFirstLoading?"正在加载数据...":"没有找到相应结果"}</td>
            </tr>
        )
        let tableBody = listBody.length>0? listBody:listInfo
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                               {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableBody
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Pagination;