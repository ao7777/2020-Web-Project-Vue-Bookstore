<template>
    <div class="navBarContainer">
        <ul class="navBar" @mouseleave="showAccntOption=false" >
            <li class="menu" >
                <router-link class="menuButton" to="/books">
                    <i class="fas fa-kiwi-bird"></i>
                </router-link>
            </li>
            <li :id="menu.name" :key="menu.name" class="menu" v-for="menu in menus">
                <NavButton :Func="menu.ref" :Name="menu.name" :visible="!showSearch" />
            </li>
            <li :class="[showSearch?'showingSearch':'']">
                <a @click="showSearch=!showSearch" class="searchIcon" href="javascript:">
                    <i class="fas fa-search"></i>
                </a>
            </li>
            <li class="menu  nav-item dropdown"  >
                <a class="menuButton avatarButton nav-link dropdown-toggle" href="/Login"
                   @mouseover="showAccntOption=true"
                   style="padding:0"
                   data-toggle="dropdown"
                >
                    <i class="far fa-user-circle menuButton "></i>
                    {{userCompName}}
                </a>
                <AccountInfo v-if="showAccntOption" @logout="handleLogout"/>
            </li>
        </ul>
        <SearchBar
                   :show="showSearch"
                   @cancelSearch="showSearch=false"
        />
    </div>

</template>

<script>
    import NavButton from "@/components/NavButton";
    import searchicon from "@/assets/searchicon.png";
    import SearchBar from "@/components/SearchBar";
    import AccountInfo from "@/components/AccountInfo";

    export default {
        name: "UserInfo",
        data: function () {
            return {
                showSearch: false,
                searchIcon: searchicon,
                filterText: '',
                showAccntOption:false,
                menus:[
                    {ref: "books", name: "图书"},
                    {ref: "cart", name: "购物袋"},
                    {ref: "orders", name: "订单"},
                    {ref: "account", name: "账号"},
                ]
            }
        },
        components: {AccountInfo, NavButton, SearchBar},
        methods: {
            handleLogout:function(){
                this.$emit('logout');
            },
        },
        computed:{
            userType:function(){
                return this.$store.state.user.type;
            },
            userCompName:function () {
                if(this.$store.state.loginStatus){
                    return this.$store.state.user.name;
                }
                else return "登录";
            },
        },
        watch:{
            userType:function(newType){
                if(newType==='admin'){
                    this.menus.push({ref:'manage',name:"管理"})
                }
                else{
                    let index=this.menus.findIndex(
                        (menu)=>{
                            return menu.ref==='manage'
                        }
                    );
                    if(index!==-1){
                        this.menus.splice(index,1);
                    }
                }
        }
        }
    }
</script>

<style scoped>
    .navBar {
        z-index: 5;
        margin: 0 auto;
        max-width: 700px;
        width: auto;
        list-style: none;
        cursor: default;
        height: 44px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .fa-search {
        display: block;
        background-repeat: no-repeat;
        font-size: 15px;
        font-weight: 600;
        left: -26px;
        position: absolute;
        color: #cccccc;
        transition: color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .fa-search:hover {
        color: #FFFFFF;
    }

    .navBarContainer {
        background-color: rgba(60, 60, 60, 0.8);
        max-height: 44px;
        backdrop-filter: saturate(180%) blur(20px);
        top: 0;
        width: 100%;
        position: fixed;
        z-index: 2;
    }

    .searchIcon {
        position: relative;
        top: 15px;
        transform: translateX(0);
        height: 24px;
        font-family: FontAwesome, sans-serif;
    }

    .avatarButton {
        position: relative;
        top: 12px;
    }

    .showingSearch {
        visibility: hidden;
    }

    ul li.menu:nth-child(4) a.menuButton.hidden {
        transition-delay: 0.4s;
    }

    ul li.menu:nth-child(5) a.menuButton.hidden {
        transition-delay: 0.3s;
    }

    ul li.menu:nth-child(6) a.menuButton.hidden {
        transition-delay: 0.2s;
    }

    ul li.menu:nth-child(3) a.menuButton.hidden {
        transition-delay: 0.5s;
    }

    ul li.menu:nth-child(2) a.menuButton.hidden {
        transition-delay: 0.6s;
    }

    .fa-kiwi-bird {
        position: relative;
        top: 10px;
        font-size: 20px;
    }
    .dropdown, .dropleft, .dropright, .dropup {
        position: relative;
    }
</style>
