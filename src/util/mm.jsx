import axios from 'axios'
class MUtil{
    request(param){
        return new Promise((resolve,reject)=>{
            axios({
                method      : param.type   || 'get',
                url         : param.url      || '',
                responseType: param.dataType || 'json',
                data        : param.data     || null
            })
            .then(res=>{
                // 数据请求成功
                if(res.data.status===0){
                    typeof resolve === 'function' && resolve(res.data.data,res.data.msg)
                }
                // 需要用户登陆
                else if(res.data.status===10){
                    this.doLogin()
                }
                // 错误
                else if(res.data.status===1){
                    typeof reject === 'function' && reject(res.data.msg || res.data.data)
                }
            })
            .catch(err=>{
                typeof reject === 'function' && reject(err)
            })
        })
    }
    // 跳转登陆
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParams(name){
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg)
        return result ? encodeURIComponent(result[2]) : null
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg||'好像哪里不对了')
    }
}
export default MUtil