<template>
    <div class="navBarContainer">
        <ul class="navBar" @mouseleave="showAccntOption=false" >
            <li class="menu" >
                <a class="menuButton" href="">
                    <i class="fas fa-kiwi-bird"></i>
                </a>
            </li>
            <li :id="menu.name" :key="menu.name" class="menu" v-for="menu in menus">
                <NavButton :Func="menu.ref" :Name="menu.name" :visible="!showSearch"/>
            </li>
            <li :class="[showSearch?'showingSearch':'']">
                <a @click="showSearch=!showSearch" class="searchIcon" href="javascript:">
                    <i class="fas fa-search"></i>
                </a>
            </li>
            <li class="menu  nav-item dropdown"  >
                <a class="menuButton avatarButton nav-link dropdown-toggle" href="#"
                   @mouseover="showAccntOption=true"
                   data-toggle="dropdown"
                >
                    <i class="far fa-user-circle menuButton "></i>
                    {{userCompName}}
                </a>
                <AccountInfo v-if="showAccntOption" @logout="handleLogout"/>
            </li>
        </ul>
        <SearchBar :init-book-data="bookData"
                   :show="showSearch"
                   @cancelSearch="showSearch=false"
                   @submit="handleSubmit"
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
        props: ['initBookData','loginStatus','initUserInfoData','userInitID'],
        data: function () {
            return {
                userInfoData:this.initUserInfoData,
                menus: [
                    {ref: "./book", name: "图书"},
                    {ref: "./cart", name: "购物车"},
                    {ref: "./order", name: "订单"},
                    {ref: "./account", name: "账号"}
                ],
                showSearch: false,
                searchIcon: searchicon,
                filterText: '',
                bookData: this.initBookData,
                isLogin:this.loginStatus,
                showAccntOption:false,
            }
        },
        components: {AccountInfo, NavButton, SearchBar},
        methods: {
            handleSubmit: function (e) {
                this.filterText = e;
                this.$emit("requestSearch", this.filterText);
            },
            handleLogout:function(){
                this.$emit('logout');
            }
        },
        computed:{
            userCompName:function () {
                if(this.loginStatus){
                    return this.userInfoData[this.$cookies.get('userID')].name;
                }
                else return "登录";
            },
        },
        watch:{
            loginStatus:function(newStat){
                this.isLogin=newStat;
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
        transition: 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
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
