<template>
        <b-card style="border-top: 0">
            <template v-slot:header>
                <b-nav card-header pills align="center">
                    <b-nav-item :active="content==='bestSeller' " @click="content='bestSeller'">热销榜</b-nav-item>
                    <b-nav-item :active="content==='consume'" @click="content='consume'">消费榜</b-nav-item>
                    <b-nav-item disabled>好评榜</b-nav-item>
                </b-nav>
            </template>
            <b-container>
                <DateSelector @submit="handleDateFilter"/>
            </b-container>
            <transition>
                <b-container v-if="content==='bestSeller'">
                    <b-card v-for="(book,index) in books"
                            :key="book.isbn"
                            overlay
                            text-variant="white"
                            align="center"
                            :img-src="'http://localhost:8070'+book.pic+'.jpg'"
                    >
                        <b-row style="line-height: 129px">
                            <b-col md="2" >
                                <span style="font-size: 5rem">{{index+1}}</span>
                            </b-col>
                            <b-col style="margin-top: auto;margin-bottom: auto" md="7">
                                <b-card-text style="font-size: 2rem">
                                    {{'《'+book.name+'》'}}
                                </b-card-text>
                            </b-col>
                            <b-col style="margin-top: auto;margin-bottom: auto">
                                <b-card-text style="font-size: 2.5rem">
                                    {{book.sales}}本
                                </b-card-text>
                            </b-col>

                        </b-row>

                    </b-card>
                </b-container>
                <b-container v-else>
                    <b-card v-for="(user,index) in users"
                            :key="user.id"
                            overlay
                            text-variant="white"
                            align="center"
                            :img-src="'http://localhost:8070'+user.avatar"
                    >
                        <b-row style="line-height: 129px">
                            <b-col md="2" >
                                <span style="font-size: 5rem">{{index+1}}</span>
                            </b-col>
                            <b-col style="margin-top: auto;margin-bottom: auto" md="7">
                                <b-card-text style="font-size: 2rem">
                                    {{user.name}}
                                </b-card-text>
                            </b-col>
                            <b-col style="margin-top: auto;margin-bottom: auto">
                                <b-card-text style="font-size: 2.5rem">
                                    {{user.consumption/100}}元
                                </b-card-text>
                            </b-col>

                        </b-row>

                    </b-card>
                </b-container>
            </transition>
        </b-card>

</template>

<script>
    import server from "@/http/request";
    import DateSelector from "@/components/DateSelector";
    export default {
        name: "Rank",
        components: {DateSelector},
        data(){
            return{
                content:'bestSeller',
                staticBooks:JSON.parse(localStorage.getItem('books')),
                books:[],
                staticUsers:[],
                users:[],
                orders:[],
                staticOrders:[]
            }
    },
        created(){
            this.books=this.staticBooks;
            this.books.sort((book1,book2)=>{return book2.sales-book1.sales});
            this.books.splice(10,this.books.length-10);
            server.get('/getOrders'
            )
                .then(
                    (response)=>this.handleOrder(response.data)
                ).catch(
                function(error){
                    console.log(error);
                }
            );
            server.get('/GetUsers'
            )
                .then(
                    (response)=>{
                        this.handleUser(response.data);}
                ).catch(
                function(error){
                    console.log(error);
                }
            );
        },
        methods:{
            handleUser(users){
                for(let i in users) {
                    this.users.push(
                        {
                            name:users[i].name,
                            id:users[i].id,
                            joinDate:users[i].join_date,
                            type:users[i].type,
                            avatar:users[i].avatar,
                            email:users[i].email,
                            consumption:users[i].consumption
                        }
                    )
                }
                this.staticUsers=this.users;
                this.refreshUsers();
            },
            handleOrder(orders){
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
                this.orders= this.staticOrders.filter((order)=>{
                    return ((Date.parse(date.after)-Date.parse(order.transactionDate))<=0)&&(Date.parse(date.before)-Date.parse(order.transactionDate)>=0);
                });
                if(this.content==='bestSeller'){
                    this.refreshBooks();
                }
                else{
                    this.refreshUsers();
                }
            },
            refreshBooks(){
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
                                if(index!==-1)
                                this.books[index].sales+=item.quantity;
                            }
                        )
                    }
                )
                this.books.sort((book1,book2)=>{return book2.sales-book1.sales});
                this.books.splice(10,this.books.length-10);

            },
            refreshUsers(){
                this.users=this.staticUsers;
                this.users.forEach(
                    (user)=>{
                        user.consumption=0;
                    }
                );
                this.orders.forEach(
                    order=>{
                        let index=this.users.findIndex(
                            (user)=>{
                                return user.id===order.userID;
                            }
                        );
                        if(index!==-1)
                            this.users[index].consumption+=order.totalAmount;
                    }
                )
                this.users.sort((user1,user2)=>{return user2.consumption-user1.consumption});
                this.users.splice(10,this.users.length-10);
            }
        }
    }
</script>

<style scoped>
.card-img-overlay{
    background: rgba(80, 80, 80, 0.8);
    backdrop-filter: saturate(200%) blur(20px);
}
.card-img{
    max-height: 200px;
    width: auto;
}
</style>