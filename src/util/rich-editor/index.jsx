import React, { Component } from 'react'
import Simditor     from 'simditor';
import 'simditor/styles/simditor.scss'
import './index.scss'
// 通用的富文本编辑器，依赖于jQuery
class RichEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    componentDidMount(){
        this.loadEditor()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defalutDetail)
        }
    }
    loadEditor(){
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea:$(element),
            defaultValue:this.props.placeholder || '请输入内容',
            upload: {
                // 对应后端接口
                url:'/manage/product/richtext_img_upload.do',
                defalutImage:'',
                // 对应后端接口的字段名称
                fileKey:'upload_file'
            }
        })
        this.bindEditorEvent()
    }
    // 初始化富文本编译器事件
    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            this.props.onValueChange(this.simditor.getValue())
        })
    }
    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default RichEditor