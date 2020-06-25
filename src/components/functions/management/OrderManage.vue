<template>
    <b-container style="background: #FFFFFF">
        <b-form-group  id="inputDate1" label="筛选" label-for="inputDate1" style="margin:auto;padding: 20px">
            <b-row style="padding: 15px">
                <b-form-input class="mb-3"
                              type="text"
                              id="input-1"
                              v-model="filterID"
                              required
                              placeholder="输入用户ID"
                ></b-form-input>
            </b-row>
            <DateSelector @submit="handleDateFilter"/>
        </b-form-group>
            <div v-if="orders.length>0" style="width: 100%">
            <OrderRow v-for="order in orders" :order="order" :key="order.orderID" :manager="true"/>
            <p  style="width: 100% ;text-align: center">我是有底线的。</p>
        </div>
    </b-container>
</template>

<script>
    import OrderRow from "@/components/functions/OrderRow";
    import server from "@/http/request";
    import DateSelector from "@/components/utils/DateSelector";

    export default {
        name: "OrderManage",
        components: {DateSelector, OrderRow},
        data:function(){
            return{
                staticOrders:[],
                orders:[],
                filterID:null,
            }
        },
        created:function(){
            //get orders
            server.get('/getOrders'
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
                            userID:response.data[i].user_id,
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
                    this.refreshID(this.filterID);
            },
        refreshID(ID){
            if(ID!==''&&ID!=null)
                this.orders=this.orders.filter((order)=>{return order.userID===Number(ID);})
        }
        },
        watch:{
            filterID:function(ID){
               this.refreshID(ID);
            },

        },
    }
</script>

<style scoped>

</style>