<template >
    <div class="mainInterface">
        <UserInfo
                   @logout="handleLogout"
        />
        <router-view v-if="loginStatus"></router-view>
        <Login v-else />
        <ShoppingIndicator v-if="loginStatus" />

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">© 2020-2020 Kiwi Bookstore</p>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
        </footer>
    </div>
</template>

<script>
    // import Browser from "@/components/Browser";
    import UserInfo from "@/components/navigation/UserInfo";
    import Login from "@/components/utils/Login";
    import server from "@/http/request";
    import ShoppingIndicator from "@/components/ShoppingIndicator";
    // import UserDetail from "@/components/UserDetail";
    // import Order from "@/components/Order";
    // import Cart from "@/components/Cart";
    // import Admin from "@/components/Admin";
    export default {
        name: "Main",
        data:function(){
            return {
                filterText:'',
                user:{},
                remember:false,
                cartItem:[],
            }
        },
        // components:{Cart, UserDetail, UserInfo,Browser,Login,Order,Admin},
        components:{UserInfo,Login,ShoppingIndicator},
        beforeCreate(){
            this.$store.commit('init');
        },
        created(){
            server.get('/getBooks',).then(
                (response)=>this.handleInfo(response)
            ).catch(
                function(error){
                    console.log(error);
                }
            );
        },
        computed:{
            guessLike:function(){
                return localStorage.books.slice(0,3);
            },
            loginStatus:function(){
                return this.$store.state.loginStatus;
            }
        },
        methods:{
            handleInfo(response){
                let books=[];
                for(let i in response.data) {
                        books.push(
                            {
                                name: response.data[i].book_name,
                                author: response.data[i].author,
                                price: response.data[i].price,
                                press: response.data[i].press,
                                isbn: response.data[i].isbn,
                                publishDate:response.data[i].publish_date,
                                pic:response.data[i].pic,
                                storage:response.data[i].storage,
                                sales:response.data[i].sales,
                                show: false,
                                add:false,
                            }
                        )
                }
                localStorage.setItem('books',JSON.stringify(books));

            },
            handleLogout:function(){
                if(this.remember){
                this.orders.clear();
                }
                this.remember=false;
                this.$store.commit('clear');
                localStorage.loginStatus=false;
            },
    },

    }
</script>

<style scoped>

</style>