import Mutil from 'util/mm.jsx'
const _mm = new Mutil()

class User{
    // 用户登录
    login(loginInfo){
        let data = `username=${loginInfo.username}&password=${loginInfo.password}`
        return _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:data
        })
    }

    // 检查登陆接口的数据是否合法
    checkLoginInfo(loginInfo){  
        let username = loginInfo.username.trim()
        let password = loginInfo.password.trim()
        // 判断用户名不为空
        if(typeof username!=='string' || username.length===0){
            return {
                status:false,
                msg:'用户名不能为空!'
            }
        }
        // 判断密码不为空
        if(typeof password!=='string' || password.length===0){
            return {
                status:false,
                msg:'密码不能为空!'
            }
        }
        return {
            status:true,
            msg:'验证通过'
        }
    }
    // 用户退出登录
    logout(){
        return _mm.request({
            type:'post',
            url:'/user/logout.do'
        })
    }
    getUserList(pageNum){
        return _mm.request({
            type:'post',
            url:"/manage/user/list.do",
            data:{
                pageNum:pageNum
            }
        })
    }
}
export default User