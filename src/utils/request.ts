import axios from "axios";
import type { AxiosInstance } from "axios";
import { ElMessage } from "element-plus";

const request:AxiosInstance=axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API as string,
        timeout:20000
});

request.interceptors.request.use(config=>{
        return config
},error=>{
    return Promise.reject(error)
})

request.interceptors.response.use(response=>{
    const res=response.data;
    if(res.code===20000){
        return res
    }
    ElMessage.error(res.message)
    return Promise.reject(res)
},error=>{
    const {message,response}=error
    if(message.indexOf('timeout')!==-1){
        ElMessage.error('请求超时')
    }else if(message==='Network Error'){
        ElMessage.error('网络错误')
    }else{
        if(response.data) ElMessage.error(response.statusText)
        else ElMessage.error('接口路径找不到')
    }
    return Promise.reject(error)
})
export default request