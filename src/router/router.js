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
import BookManage from "@/components/management/BookManage";
import UserManage from "@/components/management/UserManage";
import OrderManage from "@/components/management/OrderManage";
import Rank from "@/components/management/Rank";
//2. 定义路由
const routes = [
    {
      path:'/',
      redirect:'/books'
    },
    {
    path: '/books',
    component: Browser
},
{
    path: "/manage",
    component: Admin,
    children:[

        {
            path: 'book',
            component: BookManage,
            children:[
                {
                    path:'addBook',
                    component: BookAdder
                },
            ]
        },
        {
            path:'user',
            component: UserManage
        },
        {
            path:'order',
            component: OrderManage
        },
        {
            path:'rank',
            component: Rank
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
        component: Login,
        name:'Login'
    },
];

//3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    mode:'history',
    routes: routes
});
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && localStorage.loginStatus!=='true') next({ name: 'Login' });
    else next()
});
//4.导出路由
export default router;