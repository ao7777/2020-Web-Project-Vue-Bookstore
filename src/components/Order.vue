<template>
    <div class="infoContainer">
        <h1>订单</h1>
        <div v-if="orders[0]&&orders[0].length>0" style="width: 100%">
            <OrderRow v-for="order in orders" :order="order" :key="order[0].orderSetID" />
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
        props:['type','userID'],
        data:function(){
            return{
                orders:[],
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
                let j=0;
                let ID=0;
                this.orders.push([]);
                if(response.data[0]){
                    ID=response.data[0].order_setid;
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
                    )
                }
                }
            }
        }
    }
</script>

<style scoped>

</style>