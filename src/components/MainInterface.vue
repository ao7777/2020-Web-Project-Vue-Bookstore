<template >
    <div class="mainInterface">
        <UserInfo :init-book-data="bookData" @requestSearch="handleSearch"
                  :login-status="loginStatus" :init-user-info-data="user"
                :user-init-i-d="user.name" @logout="handleLogout" @switch="handleSwitch"
                  :display="display"
        />
        <Browser v-if="display==='books'&&loginStatus" :type="display" :book-data="bookData" :filterText="filterText"
        :is-search="isSearch" :mode="user.type" @addItem="handleAdd"
        />
        <UserDetail v-if="display==='account'&&loginStatus" :mode="user.type" :user="user" :guess-like="guessLike"/>
        <Order v-if="display==='orders'&&loginStatus" type="full" :user-i-d=user.ID />
        <Cart v-if="display==='cart'&&loginStatus" :user-i-d="user.name" :cart-item="cartItem" @submit="handleBuy"/>
        <Login v-if="!loginStatus" @submit="handleLogin"/>
        <div class="shoppingIndicator" >
            <div class="indicator">{{cartCount}}</div>
            <a @click="handleSwitch('cart')" class="buyButton" href="#">
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</template>

<script>
    import Browser from "@/components/Browser";
    import UserInfo from "@/components/UserInfo";
    import Login from "@/components/Login";
    import server from "@/http/request";
    import UserDetail from "@/components/UserDetail";
    import Order from "@/components/Order";
    import Cart from "@/components/Cart";
    export default {
        name: "Main",
        data:function(){
            return {
                filterText:'',
                user:{},
                bookData:[],
                isSearch:false,
                remember:false,
                loginStatus:this.loginCompStatus,
                staticDisplay:'books',
                cartItem:[],
            }
        },
        components:{Cart, UserDetail, UserInfo,Browser,Login,Order},
        created:function(){
          this.loginStatus=this.loginCompStatus;
          this.user.name=this.userCompID;
          this.user.ID=this.userID;
          this.user.avatar=this.userAvatar;
          this.user.type=this.userType;
            server.get('/getBooks',).then(
                (response)=>this.handleInfo(response)
            ).catch(
                function(error){
                    console.log(error);
                }
            );
        },
        computed:{
            loginCompStatus:function(){
                if(this.$cookies.isKey('loginStatus'))
                return this.$cookies.get('loginStatus');
                return false;
            },
            userCompID:function(){
                if(this.$cookies.isKey('user_name'))
                return this.$cookies.get('user_name');
                return -1;
            },
            userID:function(){
                if(this.$cookies.isKey('ID'))
                    return this.$cookies.get('ID');
                return -1;
            },
            userAvatar:function(){
                if(this.$cookies.isKey('user_avatar'))
                    return this.$cookies.get('user_avatar');
                return -1;
            },
            userType:function(){
                if(this.$cookies.isKey('user_type'))
                    return this.$cookies.get('user_type');
                return -1;
            },
            display:function(){
                if(this.bookData.length>0){
                    return this.staticDisplay;
                }
                return '';
            },
            cartCount:function(){
                let cnt=0;
                this.cartItem.forEach(
                    item=>{
                        cnt+=item.quantity;
                    }
                );
                return cnt;
            },
            guessLike:function(){
                return this.bookData.slice(0,3);
            }
        },
        methods:{
            handleInfo(response){
                for(let i in response.data) {
                        this.bookData.push(
                            {
                                name: response.data[i].book_name,
                                author: response.data[i].author,
                                price: response.data[i].price,
                                press: response.data[i].press,
                                isbn: response.data[i].isbn,
                                publishDate:response.data[i].publish_date,
                                pic:response.data[i].pic,
                                storage:response.data[i].storage,
                                show: false,
                                add:false,
                            }
                        )
                }

            },
            handleAdd(isbn){
                let index=this.cartItem.findIndex(
                    (book)=>{
                        return book.isbn===isbn;
                    }
                );
                if(index!==-1){
                    this.cartItem[index].quantity++;
                }
                else
                    this.cartItem.push({
                        isbn:isbn,
                        quantity:1,
                        name:'userName'
                    });
                server.post('/CartSubmit',{
                        order:this.cartItem,
                        ID:this.user.ID,
                        name:this.userType
                    }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                );
            },
            handleSwitch:function(e){
                this.staticDisplay=e;
            },
            handleSearch:function (e) {
                this.filterText=e;
                this.isSearch=true;
            },
            handleLogin:function(name,password,remember){
                this.remember=remember;
                server.get("/Login",{
                    params:{
                        user_name:name,
                        password:password,
                    }
                    }
                ).then(
                    (response)=>{
                        if(response.data.LoginStatus){
                            this.loginStatus=response.data.LoginStatus;
                            this.user.name=name;
                        this.user.join_date=response.data.join_date;
                        this.user.ID=response.data.ID;
                        this.user.avatar=response.data.avatar;
                        this.user.type=response.data.user_type;
                            if(remember){
                                this.$cookies.set('loginStatus',true);
                                this.$cookies.set('user_name',this.user.name);
                                this.$cookies.set('user_avatar',this.user.avatar);
                                this.$cookies.set('user_type',this.user.type);
                                this.$cookies.set('ID',this.user.ID);
                            }
                            else{
                                this.$cookies.set('loginStatus',true,1);
                                this.$cookies.set('user_name',this.user.name,1);
                                this.$cookies.set('user_avatar',this.user.avatar,1);
                                this.$cookies.set('user_type',this.user.type,1);
                                this.$cookies.set('ID',this.user.ID,1);
                            }
                        }
                    }

                );
            },
            handleLogout:function(){
                if(this.remember){
                this.$cookies.remove('loginStatus');
                this.$cookies.remove('user_name');
                this.$cookies.remove('user_avatar');
                this.$cookies.remove('user_type');
                this.$cookies.remove('ID');
                this.orders.clear();
}                this.remember=false;
                this.loginStatus=false;
            },
            handleBuy:function(){
                server.post('/OrderSubmit',{
                        ID:this.user.ID,
                    }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                );
                this.cartItem.splice(0,this.cartItem.length);
            }
    }}
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