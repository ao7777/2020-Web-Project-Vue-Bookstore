<template>
    <b-container>
        <h2>订单管理</h2>
        <b-form-group  id="inputDate1" label="筛选" label-for="inputDate1" style="margin:auto;padding: 20px">
            <b-row style="padding: 15px">
                    <b-form-input class="mb-3"
                            id="input-1"
                            v-model="filterID"
                            required
                            placeholder="输入用户ID"
                    ></b-form-input>
            </b-row>
            <b-row>

                <b-col>
                    从<b-form-datepicker id="inputDate1"   v-model="filterDateAfter"   class="mb-3"></b-form-datepicker>
                </b-col>
                <b-col>
                    到<b-form-datepicker id="inputDate2"  v-model="filterDateBefore" class="mb-3"></b-form-datepicker>
                </b-col>
            </b-row>
        </b-form-group>
            <div v-if="orders.length>0" style="width: 100%">
            <OrderRow v-for="order in orders" :order="order" :key="order.orderID" :manager="true"/>
            <p  style="width: 100% ;text-align: center">我是有底线的。</p>
        </div>
    </b-container>
</template>

<script>
    import OrderRow from "@/components/OrderRow";
    import server from "@/http/request";

    export default {
        name: "OrderManage",
        components: {OrderRow},
        data:function(){
            return{
                staticOrders:[],
                orders:[],
                filterDateAfter:"2020-01-01",
                filterDateBefore:"2020-12-31",
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
            }
        },
        watch:{
            filterDateAfter:function(date){
                if(date!=null)
                    this.orders= this.staticOrders.filter((order)=>{
                        return ((Date.parse(date)-Date.parse(order.transactionDate))<0)&&(Date.parse(this.filterDateBefore)-Date.parse(order.transactionDate)>0);
                    })
            },
            filterDateBefore:function(date){
                if(date!=null)
                    this.orders= this.staticOrders.filter((order)=>{
                        return ((Date.parse(this.filterDateAfter)-Date.parse(order.transactionDate))<0)&&(Date.parse(date)-Date.parse(order.transactionDate)>0);
                    })
            }
        }
    }
</script>

<style scoped>

</style>