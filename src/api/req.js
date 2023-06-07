import axios from 'axios';      // 引入axios      

// axios 默认配置  更多配置查看Axios中文文档
axios.defaults.timeout       = 1000000;             // 超时默认值
// axios.defaults.baseURL       = APIUrl.baseURL;   // 默认baseURL
axios.defaults.withCredentials = true
document.cookie = "name=value; SameSite=None";

// http request 拦截器
// 在ajax发送之前拦截 比如对所有请求统一添加header token
axios.interceptors.request.use(
    config => {
        config.withCredentials = true;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // return Promise.reject(error);
        console.error("服务器未返回数据")
    }
);

export default axios;  // 这句千万不能漏下！！！