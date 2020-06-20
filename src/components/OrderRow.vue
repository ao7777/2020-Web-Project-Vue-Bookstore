<template>
    <div class="orderRow">
        <div v-for="orderItem in order.items" :key="orderItem.isbn" class="orderitem">
            <img :src="'http://localhost:8070'+'/bookpic/'+orderItem.isbn.toString()+'.jpg'" alt="bookPicture"/>
            <p>数量：{{orderItem.quantity}} <br/> {{orderItem.amount/100.0}}元</p>
        </div>
        <p class="check">
            购买时间:{{order.transactionDate}}<br/>
            订单号：{{order.orderID}}<br/>
            <span v-if="manager">用户ID:{{order.userID}}</span>
            实付：{{totalAmount/100.0}}元
        </p>

    </div>

</template>

<script>
    export default {
        name: "OrderRow",
        props:['order','manager'],
        data:function(){
            return {
            }
        },
        computed:{
          totalAmount:function(){
            let ta=0;
            this.order.items.forEach(
                orderItem=>{
                    ta+=orderItem.amount;
                }
            );
              return ta;
          }
        },
    }
</script>

<style scoped>
.orderRow{
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid #ccc;
    padding: 6px;
    width: 100%;
}
.orderitem{
    height:200px;
    width:auto;
    margin: 6px;
}
.orderitem img{
    height: 150px;
}
.check{
    text-align: right;
    position: relative;
    margin-right: 0;
    margin-left: auto;
}
</style>