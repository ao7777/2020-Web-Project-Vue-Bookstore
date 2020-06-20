import Vue from 'vue'

//0. 使用路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//1. 定义 (路由) 组件。
import BookAdder from "@/components/management/BookAdder";
import Admin from "@/components/Admin";
import Browser from "@/components/Browser";
import Cart from "@/components/Cart";
import Order from "@/components/Order";
import UserDetail from "@/components/UserDetail";
import SignIn from "@/components/SignIn";
import Login from "@/components/Login";
//2. 定义路由
const routes = [

    {
    path: '/books',
    component: Browser
},
{
    path: "/manage",
    component: Admin,
    children:[
        {
            path:'/addBook',
            component: BookAdder
        }
    ]
},
    {
        path:'/cart',
        component: Cart
    },
    {
        path:'/orders',
        component: Order
    },
    {
        path:'/account',
        component: UserDetail
    },
    {
        path:'/signIn',
        component: SignIn,
    },
    {
        path:'/Login',
        component: Login
    }

];

//3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    mode:'history',
    routes: routes
});

//4.导出路由
export default router;