<template>
    <div>
        <div class="infoContainer">
            <div class="avatar">
                <img style="width: auto" :src="'http://localhost:8090'+user.avatar"/>
                <h2 class="welcome">欢迎，{{user.name}}。</h2>
            </div>
            <div class="description">
                <p>账号：{{user.ID}}</p>
                <p>注册日期：{{user.join_date}}</p>
                <p>账户类型：{{user.type}}</p>
                <p>账户余额：{{balance/100.0}}元</p>
                <p>个人信息：{{profile}}</p>
                <button @click.prevent="handleAvatar" title="更改头像">更改头像</button>
            </div>
        </div>
        <div class="infoContainer">
            <h2>近期订单</h2>
            <OrderRow v-for="order in orders" :order="order" :key="order[0].orderSetID"/>
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
        props:['mode','user','guessLike'],
        data:function(){
            return {
                orders:[],
                balance:0,
                profile:"",
            }
        },
        methods:{
            handleAvatar:function(){

            },
            handleOrder(response){
                let j=0;
                let ID=response.data[0].order_setid;
                this.orders.push([]);
                for(let i in response.data) {
                    if(ID!==response.data[i].order_setid)
                    {
                        j++;
                        this.orders.push([]);
                        ID=response.data[i].order_setid;
                    }
                    this.orders[j].push(
                        {
                            transactionDate:response.data[i].transaction_date,
                            isbn:response.data[i].isbn,
                            orderID:response.data[i].orderID,
                            quantity:response.data[i].quantity,
                            orderSetID:response.data[i].order_setid,
                            amount:response.data[i].amount,
                        }
                    );
                    if(j>0)break;

                }
            }
        },
        created:function(){
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
                        user_name:this.user.name,
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