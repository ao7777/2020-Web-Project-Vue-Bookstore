<template>
    <div class="shoppingIndicator" >
        <div class="indicator">{{cartCount}}</div>
        <router-link to="/cart" class="buyButton" >
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ShoppingIndicator",
        computed:{
        cartCount:function(){
            return this.$store.state.count;
        },
        }
    }
</script>

<style scoped>
    .shoppingIndicator{
        position: fixed;
        padding:15px;
        bottom: 20px;
        width: 100px;
    }
    .fa-shopping-bag{
        font-size: 75px;
    }
    .indicator{
        position: relative;
        top:30px;
        margin-left: auto;
        width:20px;
        height:20px;
        border-radius:50%;
        background: #2c3e50;
        color: #FFFFFF;
        font-weight: normal;
        text-align: center;
        line-height: normal;
    }
</style>