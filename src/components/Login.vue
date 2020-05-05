<template>
    <div class="text-center container">
        <i class="fas fa-kiwi-bird"></i>
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
            <div class="checkbox mb-3">
                <label style="font-weight: 400">
                    <input type="checkbox"
                           v-model="remember"
                           value="remember-me"> 记住我
                </label>
            </div>
            <button class="btn btn-primary btn-block btn-lg" type="submit" @click.prevent="handleSubmit">登录</button>
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
*, ::after, ::before {
    box-sizing: border-box;
}
form {
    display: block;
    margin-top: 0;
}
.font-weight-normal {
    font-weight: 400!important;
}
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
    cursor: pointer;
}

.form-signin .form-control:focus {
    z-index: 2;
}

.form-signin input[type="name"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

[type=button], [type=reset], [type=submit], button {
    -webkit-appearance: button;
}
button, select {
    text-transform: none;
}
button, input {
    overflow: visible;
}
button, input, optgroup, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}
.checkbox {
    font-weight: 100;
}
</style>