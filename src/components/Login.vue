<template>
    <div class="text-center container">
        <form class="form-signin" >
            <h2 class="h3 mb-3 font-weight-normal">请登录</h2>
            <p>Administer:Password 654321
            <br/>
                Guest:Password 123456
            </p>
            <label for="inputName" class="sr-only">用户名</label>
            <input type="text" id="inputName" class="form-control"
                   v-model="name"
                   placeholder="用户名" required="" autofocus="">
            <label for="inputPassword" class="sr-only">密码</label>
            <input type="password"
                   v-model="password"
                   id="inputPassword" class="form-control" placeholder="密码" required="">
            <div class="checkbox">
                <label>
                    <input type="checkbox"
                           v-model="remember"
                           value="remember-me"> 记住我
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="handleSubmit">登录</button>
        </form>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data:function(){
            return{
                name:'',
                password:-1,
                remember:false,
            }
        },
        methods:{
            handleSubmit:function(){
                this.$emit('submit',this.name,this.password,this.remember);
            }
        }
    }
</script>

<style scoped>
.container{
    position: relative;
    width:40%;
    top:88px;
}
</style>