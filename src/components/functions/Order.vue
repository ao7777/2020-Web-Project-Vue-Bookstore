<template>
    <div class="infoContainer">
        <h1>订单</h1>
        <b-form-group id="inputDate1" label="筛选" label-for="inputDate1" style="width:100%;margin:auto;padding: 20px">
            <DateSelector @submit="handleDateFilter"/>
        </b-form-group>
        <div v-if="orders.length>0" style="width: 100%">
            <OrderRow v-for="order in orders" :order="order" :key="order.orderID" :manager="false"/>
            <p  style="width: 100% ;text-align: center">我是有底线的。</p>
        </div>
        <p v-else style="width: 100% ;text-align: center">还没有订单哦。</p>
    </div>
</template>

<script>
    import OrderRow from "@/components/functions/OrderRow";
    import server from "@/http/request";
    import DateSelector from "@/components/utils/DateSelector";
    export default {
        name: "Order",
        components: {DateSelector, OrderRow},
        data:function(){
            return{
                staticOrders:[],
                orders:[],
                userID:this.$store.state.user.ID,
                type:this.$store.state.user.type,
            }
        },
        created:function(){
          //get orders
            server.get('/getOrder',{params:{
                ID:this.userID
            }}
            )
                .then(
                (response)=>this.handleOrder(response)
            ).catch(
                function(error){
                    console.log(error);
                }
            );
        },
        methods:{
            handleOrder:function(response){
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
                this.staticOrders=this.orders;
                },

            handleDateFilter(date){
                this.orders= this.staticOrders.filter((order)=>{
                    return ((Date.parse(date.after)-Date.parse(order.transactionDate))<=0)&&(Date.parse(date.before)-Date.parse(order.transactionDate)>=0);
                });
            },
        },
    }
</script>

<style scoped>

</style>