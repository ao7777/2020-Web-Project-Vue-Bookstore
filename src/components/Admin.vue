<template>
    <b-container v-if="$store.state.user.type==='admin'" class="typical">
        <h1>管理系统</h1>
        <b-nav tabs pills >
            <b-nav-item v-for="nav in navs"
                        :to="'/manage'+nav.route"
                        link-classes="navigate"
                        active-class="active"
                        :key="nav.desc"
            >{{nav.desc}}</b-nav-item>
            <b-nav-item to="/manage/rank" active-class="active" link-classes="navigate">榜单</b-nav-item>
            <b-nav-item disabled>库存管理</b-nav-item>
        </b-nav>
        <router-view></router-view>
    </b-container>
    <b-container v-else class="typical">
        <p>您无权访问此页面</p>
    </b-container>
</template>

<script>
    export default {
        name: "Admin",
        data:function(){
            return{
                addBook:false,
                navs:[
                    {route:'/book',desc:'书籍管理'},
                    {route:'/user',desc:'用户管理'},
                    {route:'/order',desc:'订单管理'},
                ]
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
.typical{
    margin-top:88px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
}
.navigate{
    color: #212529;
}
</style>