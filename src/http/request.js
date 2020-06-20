
import axios from 'axios'
import router from "@/router/router";
const server = axios.create({
    baseURL:"http://localhost:8070/",
    timeout:5000,
});
// 设置拦截器
// 请求拦截器
server.interceptors.request.use(
    (config)=>{
        if(config.method==="post"){
            config.headers['Content-Type']='text/plain';
        }
        return config;
    },(error)=>{
        this.$dialog.alert(error);
        return Promise.reject(error);
    }
);
// 响应拦截器
server.interceptors.response.use(
    response => {
        if(response.data.code === 200){
            console.log("操作成功")
        }else if(response.data.code === 300){
            console.log("没有这条数据或者查询失败")
        }else{
            console.log("操作成功")
        }
        return response;
    },
    error => {
        switch (
            error.response.status
            ) {
            case 500:
                router.push({
                    path: "/404"
                });
                break;
            case 401:
                router.push({
                    path: "/401"
                });
                break;
        }
    }
);

export default server;
