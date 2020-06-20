<template>
    <div style="margin-top: 88px;position: relative;">
    <div  class="text-center container">
        <i class="fas fa-kiwi-bird"></i>
        <form v-if="signIn===false" class="form-signin" >
            <h2 class="h3 mb-3 font-weight-normal">请登录</h2>
            <label for="inputName" class="sr-only">用户名</label>
            <input type="text" id="inputName" class="form-control"
                   v-model="name"
                   placeholder="用户名" required="" autofocus="">
            <label for="inputPassword" class="sr-only">密码</label>
            <input type="password"
                   v-model="password"
                   id="inputPassword" class="form-control" placeholder="密码" required="">
            <div class="checkbox mb-3">
                <label style="font-weight: 400">
                    <input type="checkbox"
                           v-model="remember"
                           value="remember-me"> 记住我
                </label>
            </div>
            <b-button block  type="submit" @click.prevent="handleSubmit">登录</b-button>
            <b-button block @click="handleSignIn">注册</b-button>
        </form>

    </div>
        <router-view v-if="signIn"></router-view>
    </div>

</template>

<script>
    import server from "@/http/request";

    export default {
        name: "Login",
        data:function(){
            return{
                name:'',
                password:-1,
                remember:false,
                signIn:false,
            }
        },
        methods:{
            handleSubmit:function(){
                server.get("/Login",{
                        params:{
                            user_name:this.name,
                            password:this.password,
                        }
                    }
                ).then(
                    (response)=>{
                        if(response.data.LoginStatus){
                            if(response.data.user_type!=='banned'){
                                this.$dialog.alert('登录成功').then(
                                    (dialog)=>{
                                        this.$router.push('/books');
                                        response.data.name=this.name;
                                        this.$store.commit('login',response.data);
                                        dialog.close();
                                    })
                            }
                            else{
                                this.$dialog.alert('您的账户已被禁用，请联系管理员解禁。').then(
                                    (dialog)=>{
                                        dialog.close();
                                    })
                            }
                        }
                        else{
                            this.$dialog.alert('用户名或密码错误').then(
                                (dialog)=>{
                                    dialog.close();
                                })
                        }
                    }
                );
            },
            handleSignIn:function(){
                this.signIn=true;
                this.$router.push('/signIn');
            }
        }
    }
</script>

<style scoped>
.container{
    position: relative;
    width:100%;
}
    .fa-kiwi-bird{
        font-size:40px;
        text-align: center;
    }
.text-center {
    text-align: center!important;
    width: 100%;
    line-height: 1.5;
    color: #212529;
    font-weight: 400;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
.form-signin .checkbox {
    font-weight: 400;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>