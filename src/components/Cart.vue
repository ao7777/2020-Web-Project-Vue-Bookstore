<template>
    <div class="infoContainer">
        <h1>购物袋</h1>
        <div v-if="books.length>0" style="width: 100%">
        <CartRow v-for="book in books" :item="book" :key="book.isbn" />
        <p style="text-align: right;width: 95%">共计 {{totalAmount/100}} 元</p>
        <button class="btn btn-primary btn-block btn-lg buy" @click="handleSubmit" >下单</button>
        </div>
        <div style="width: 100% ;text-align: center" v-else-if="!success">
            <p>你的购物袋空空如也。</p>
        </div>
        <div v-else style="width: 100% ;text-align: center">
            <h2>下单成功</h2>
            <p>你的书籍正在飞速赶来。</p>
        </div>

    </div>
</template>

<script>
    import CartRow from "@/components/CartRow";
    import server from "@/http/request";
    export default {
        name: "Cart",
        components: {CartRow},
        data:function () {
            return {
                books:[],
                success:false,
                cartItem:this.$store.state.cartItem
            }
        },
        computed: {
            totalAmount:function(){
                let ta=0;
                this.books.forEach(
                    book=>{
                        ta+=book.price*book.quantity;
                    }
                );
                return ta;
            }
        },
        created:function(){
            this.cartItem.forEach(
               (book)=>{
                server.get(
                    '/getBook',{
                        params:{
                            isbn:book.isbn
                        }
                    }).then(
                    (response)=>this.handleBook(response,book.quantity)
                ).catch(
                    function(error){
                        console.log(error);
                    }
                )
                }
            )
        },
        methods:{
            handleBook:function(response,quantity){
                this.books.push({
                    name: response.data.book_name,
                    author: response.data.author,
                    price: response.data.price,
                    press: response.data.press,
                    isbn: response.data.isbn,
                    publishDate:response.data.publish_date,
                    pic:response.data.pic,
                    storage:response.data.storage,
                    quantity:quantity,
                    show: false}
                )
            },
            handleSubmit:function(){
                server.post('/OrderSubmit',{
                        ID:this.$store.state.user.ID,
                    }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                ).then(
                    ()=>{
                this.success=true;
                this.books.splice(0,this.books.length);
                this.$store.state.cartItem.splice(0,this.books.length);
                }
                )
            }
        }
    }
</script>

<style scoped>
.buy{
    margin-left: auto;
    margin-right: 5%;
    width:200px;
    height: 100px;
    font-size: large;
}
</style>