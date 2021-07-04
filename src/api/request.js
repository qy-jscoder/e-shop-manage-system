import axios from "axios";
//引入qs，实现将参数以url形式展开
const qs = require('qs')

//使用async封装axios请求
const api = {
    async get(url, data) {
        try {
            const res= await axios.get(url, { params: data })
            return res.data
        } catch (err) {
            // alert('服务器出错')
            console.log(err)
        }
    },
    async post(url, data) {
        try {
            const res= await axios.post(url, qs.stringify(data))
            return res.data
        } catch (err) {
            // return (e.message)
            // console.log('服务器出错')
            console.log(err)
        }
    }
}
export {api}