<template>
    <div class="infoContainer">
        <h1>订单</h1>
        <b-form-group id="inputDate1" label="筛选" label-for="inputDate1" style="width:100%;margin:auto;padding: 20px">
            <b-row>
                <b-col>
                    从<b-form-datepicker id="inputDate1"   v-model="filterDateAfter"  class="mb-3"></b-form-datepicker>
                </b-col>
                <b-col>
                    到<b-form-datepicker id="inputDate2"  v-model="filterDateBefore" class="mb-3"></b-form-datepicker>
                </b-col>
            </b-row>
        </b-form-group>
        <div v-if="orders.length>0" style="width: 100%">
            <OrderRow v-for="order in orders" :order="order" :key="order.orderID" :manager="false"/>
            <p  style="width: 100% ;text-align: center">我是有底线的。</p>
        </div>
        <p v-else style="width: 100% ;text-align: center">还没有订单哦。</p>
    </div>
</template>

<script>
    import OrderRow from "@/components/OrderRow";
    import server from "@/http/request";
    export default {
        name: "Order",
        components: {OrderRow},
        data:function(){
            return{
                staticOrders:[],
                orders:[],
                userID:this.$store.state.user.ID,
                type:this.$store.state.user.type,
                filterDateAfter:"2020-01-01",
                filterDateBefore:"2020-12-31",
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