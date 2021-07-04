import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'

//设置请求拦截器
axios.interceptors.request.use(config=>{
    //为请求头对象，添加Token验证的Authorization字段
    config.headers.Authorization=sessionStorage.getItem('token')
    return config
})