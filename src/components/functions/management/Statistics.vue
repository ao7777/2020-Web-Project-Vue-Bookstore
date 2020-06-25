<template>
    <b-container class="infoContainer">
        <h2>统计</h2>
        <b-form-group style="width: 100%;">
                <DateSelector @submit="handleDateFilter" />
        </b-form-group>
        <b-alert variant="info" :show="show" fade dismissible>该时段消费{{total.amount/100}}元，共入手{{total.quantity}}本书。</b-alert>
        <b-card-group columns="6">
            <b-card :title="book.name"
                    :sub-title="'ISBN:'+book.isbn"
                    v-for="book in books"
                    :header="'已购'+book.sales+'本'"
                    :key="book.isbn"
                    style="max-width: 400px"
            >
                <b-card-img-lazy :src="'http://localhost:8070'+book.pic+'.jpg'" style="height: 80%" class="rounded-0" :alt="book.name"/>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
    import DateSelector from "@/components/utils/DateSelector";
    import server from "@/http/request";
    export default {
        name: "Statistics",
        components: {DateSelector},
        data(){
            return{
                    staticBooks:JSON.parse(localStorage.getItem('books')),
                    books:[],
                    orders:[],
                    staticOrders:[],
                    total:{quantity:0,amount:0},
                    userID:this.$store.state.user.ID,
                    show:false
            }
        },
        methods:{
            handleOrder:function(orders){
                for(let i in orders) {
                    let ta=0;
                    orders[i].items.forEach(
                        orderItem=>{
                            ta+=orderItem.amount*orderItem.quantity;
                        }
                    );
                    this.orders.push(
                        {
                            transactionDate:orders[i].transaction_date,
                            orderID:orders[i].order_id,
                            userID:orders[i].user_id,
                            items:orders[i].items,
                            totalAmount:ta,
                        }
                    );
                }
                this.staticOrders=this.orders;
            },
            handleDateFilter(date){
                this.show=true;
                this.orders= this.staticOrders.filter((order)=>{
                    return ((Date.parse(date.after)-Date.parse(order.transactionDate))<=0)&&(Date.parse(date.before)-Date.parse(order.transactionDate)>=0);
                });
                this.refreshBooks();
            },
            refreshBooks(){
                this.total={amount: 0,quantity: 0}
                this.books=this.staticBooks;
                this.books.forEach(
                    (book)=>{
                        book.sales=0;
                    }
                );
                this.orders.forEach(
                    order=>{
                        order.items.forEach(
                            item=>{
                                console.log(item);
                                let index=this.books.findIndex(
                                    (book)=>{
                                        return book.isbn===item.isbn
                                    }
                                );
                                if(index!==-1){
                                    this.books[index].sales+=item.quantity;
                                    this.total.amount+=this.books[index].price*item.quantity;
                                    this.total.quantity+=item.quantity;
                                }
                            }
                        )
                    }
                );
                this.books.sort((book1,book2)=>{return book2.sales-book1.sales});
            },
        },
        created(){
            server.get('/getOrder',{params:{
                    ID:this.userID
                }}
            )
                .then(
                    (response)=>this.handleOrder(response.data)
                ).catch(
                function(error){
                    console.log(error);
                }
            );
        }
    }
</script>

<style scoped>

</style>