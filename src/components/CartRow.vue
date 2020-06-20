<template>
    <div class="cartRow">
        <img class="cartPic" :src="'http://localhost:8070'+item.pic+'.jpg'" :alt="item.name"/>
        <div class="cartDesc" >
            <p >{{item.name}}</p>
            <p class="detail">
                <br />
                {{item.author}} 著
                <br />
                {{item.press}}
                <br />

            </p>
            <span class="price">￥{{item.price/100.0}}</span>
        </div>
        <p class="cartCount">{{item.quantity}}本<br/>
            小计 ￥{{item.quantity*item.price/100.0}}</p>
    </div>

</template>

<script>
    export default {
        name: "CartRow",
        props:['item']
    }
</script>

<style scoped>
.cartRow{
    display: flex;
    align-items: center;
    width: 95%;
    border-bottom: 1px solid #ccc;
    padding: 6px;
    height: 200px;
}
.cartPic{
    width: 125px;
    height:180px
}
.cartDesc{
    padding: 15px;
}
.cartCount{
    text-align: right;
    margin-left: auto;
}
</style>