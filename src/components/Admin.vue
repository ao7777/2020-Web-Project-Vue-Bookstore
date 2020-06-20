<template>
    <div class="infoContainer">
        <h1>管理系统</h1>

        <BookManage/>
        <UserManage />
        <OrderManage />
    </div>
</template>

<script>
    import UserManage from "@/components/management/UserManage";
    import BookManage from "@/components/management/BookManage";
    import OrderManage from "@/components/management/OrderManage";
    export default {
        name: "Admin",
        components:{OrderManage, UserManage,BookManage},
        data:function(){
            return{
                addBook:false,
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>