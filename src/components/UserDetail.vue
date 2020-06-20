<template>
    <div>
        <div class="infoContainer">
            <div class="avatar">
                <img style="width: auto" :src="'http://localhost:8070'+user.avatar"/>
                <h2 class="welcome">欢迎，{{user.name}}。</h2>
            </div>
            <div class="description">
                <p>账号：{{user.ID}}</p>
                <p>注册日期：{{user.join_date}}</p>
                <p>账户类型：{{user.type}}</p>
                <p>账户余额：{{balance/100.0}}元</p>
                <p>个人信息：{{profile}}</p>
                <b-button @click.prevent="handleAvatar" title="更改头像">更改头像</b-button>
            </div>
        </div>
        <div class="infoContainer">
            <h2>近期订单</h2>
            <OrderRow v-for="order in orders" :order="order" :key="order.orderID"/>
        </div>
        <div class="infoContainer">
            <h2>猜你喜欢</h2>
        </div>

    </div>
</template>

<script>
    import OrderRow from "@/components/OrderRow";
    import server from "@/http/request";
    export default {
        name: "UserDetail",
        components: {OrderRow},
        data:function(){
            return {
                mode:this.$store.state.user.type,
                user:this.$store.state.user,
                orders:[],
                balance:0,
                profile:"",
            }
        },
        methods:{
            handleAvatar:function(){

            },
            handleOrder(response){
                for(let i in response.data) {
                    this.orders.push(
                        {
                            transactionDate:response.data[i].transaction_date,
                            orderID:response.data[i].order_id,
                            items:response.data[i].items
                        }
                    )
                }
                this.orders.sort((a,b)=>{
                    return -Date.parse(a.transactionDate)+Date.parse(b.transactionDate)
                });
                this.orders.splice(3,this.orders.length)
            }
        },
        created:function(){
            console.log(this.$store.state.user)
            server.get('/getOrder',{params:{
                    ID:this.user.ID
                }}
            )
                .then(
                    (response)=>this.handleOrder(response)
                ).catch(
                function(error){
                    console.log(error);
                }
            );
            server.get("/UserInfo",{
                    params:{
                        user_name:this.$store.state.user.name,
                    }
                }
            ).then(
                (response)=>{
                    this.balance=response.data.balance;
                    this.profile=response.data.profile;
                }
            );
        },
    }
</script>

<style scoped>

div.description{
    margin: 15px;
    font-size: medium;
}
    .avatar{
        width: 30%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 15px;
    }
    .avatar img{
        margin: auto;
    }
</style>