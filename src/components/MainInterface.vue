<template >
    <div class="mainInterface">
        <UserInfo :init-book-data="bookData" @requestSearch="handleSearch"
                  :login-status="loginStatus" :init-user-info-data="userData"
                :user-init-i-d="userID" @logout="handleLogout"
        />
        <Browser v-if="display==='books'&&loginStatus" :type="display" :book-data="bookData" :filterText="filterText"
        :is-search="isSearch" :mode="userType"
        />
        <Login v-if="!loginStatus" @submit="handleLogin"/>
    </div>
</template>

<script>
    import Browser from "@/components/Browser";
    import UserInfo from "@/components/UserInfo";
    import Login from "@/components/Login";
    export default {
        name: "Main",
        data:function(){
            return {
            display:'books',
                filterText:'',
                userData: [
                    {name: 'Guest',password:'123456'},
                    {name:'Administer',password:'654321'}
                ],
                bookData:[
                {name:'丧钟为谁而鸣',author:'欧内斯特·海明威',price:69.00,press:'上海文艺出版社',pic:'./belltolls.jpg',isbn:9787532159987,edit:false},
                {name:'太阳照常升起',author:'欧内斯特·海明威',price:49.00,press:'上海文艺出版社',pic:'./sunrises.jpg',isbn:9787532164998,edit:false},
                {name:'恶，或自由的戏剧',author:'吕迪格尔·萨弗兰斯基',price: 42.00,press:'生活·读书·新知三联书店',pic:'./drama.jpg',isbn:9787108059895,edit:false},
                {name:'论人类不平等的起源和基础',author:'让·卢梭',price:9.40,press:'商务印书馆',pic:'./inequality.jpg',isbn:9787100017527,edit:false},
                {name:'屠猫狂欢',author:' 罗伯特·达恩顿',price:60.00,press:'商务印书馆',pic:'./cat.jpg',isbn:9787100105576,edit:false},
                {name:'罪与罚',author:'陀思妥耶夫斯基',price:58.00,press:'上海译文出版社',pic:'./sins.jpg',isbn:9787532763702,edit:false},
                {name:'毛泽东选集 第一卷',author:'毛泽东',price:40.00,press:'人民出版社',pic:'./mao.jpg',isbn:9787010009148,edit:false},
                {name:'浮士德',author:'歌德',price:18.00,press:'上海译文出版社',pic:'./faust.jpg',isbn:9787532742653,edit:false},
                {name:'资本论（全三册）',author:'马克思',price:158.00,press:'上海三联书店',pic:'./capital.jpg',isbn:9787542629791,edit:false},
                {name:'银河铁道之夜',author:'宫泽贤治',price:68.00,press:'湖南美术出版社',pic:'./galaxy.jpg',isbn:9787535683625,edit:false},
                {name:'鹿特丹的伊拉斯谟',author:'茨威格',price:49.00,press:'生活·读书·新知三联书店',pic:'./erasmus.jpg',isbn:9787108053305,edit:false},
                {name:'大卫·科波菲尔',author:'狄更斯',price:35.00,press:'人民文学出版社',pic:'./Copperfield.jpg',isbn:9787020039074,edit:false},
            ],
                isSearch:false,
                userType:"admin",
                remember:false,
                loginStatus:this.loginCompStatus,
                userID:this.userCompID,
            }
        },
        components:{UserInfo,Browser,Login},
        beforeDestroy:function(){
            if(!this.remember)this.$cookies.remove('loginStatus');
        },
        created:function(){
          this.loginStatus=this.loginCompStatus;
        },
        computed:{
            loginCompStatus:function(){
                if(this.$cookies.isKey('loginStatus'))
                return this.$cookies.get('loginStatus');
                return false;
            },
            userCompID:function(){
                if(this.$cookies.isKey('userID'))
                return this.$cookies.get('userID');
                return -1;
            },
        },
        methods:{
            handleSearch:function (e) {
                this.filterText=e;
                this.isSearch=true;
            },
            handleLogin:function(name,password,remember){
                this.remember=remember;
                let index=this.userData.findIndex(
                    function(user){
                        return user.name===name;
                    }
                );
                if(index===-1)return;
                if(this.userData[index].password===password){
                    if(remember){
                    this.$cookies.set('loginStatus',true);
                    this.$cookies.set('userID',index);}
                    this.userID=name;
                    this.loginStatus=true;
                    if(index===0)this.userType='user';
                }
            },
            handleLogout:function(){
                this.$cookies.remove('loginStatus');
                this.$cookies.remove('userID');
                this.remember=false;
                this.loginStatus=false;
            }
    }}
</script>

<style scoped>

</style>