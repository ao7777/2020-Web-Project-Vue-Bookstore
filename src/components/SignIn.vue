<template>
    <div class="container">
        <div class="py-5 text-center">
            <h2>注册</h2>
            <p class="lead">欢迎加入几维书店</p>
        </div>
        <div>
            <b-form @submit.stop.prevent="onSubmit" @reset="onReset" novalidate v-if="show">
                <b-form-group
                        id="input-group-1"
                        label="电子邮箱:"
                        label-for="input-1"
                        description="我们会对您的信息严格保密。"
                >
                    <b-form-input
                            id="input-1"
                            v-model="$v.form.email.$model"
                            type="email"
                            placeholder="your@email.address"
                            :state="validateState('email')"
                            aria-describedby="input-1-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback">
                        请输入正确的邮箱地址
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="input-group-2" label="用户名:" label-for="input-2">
                    <b-form-input
                            id="input-2"
                            v-model="$v.form.name.$model"
                            required
                            placeholder="输入用户名"
                            :state="validateState('name')"
                            aria-describedby="input-2-live-feedback"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-2-live-feedback">
                        请输入至少三个字符的用户名
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="inputPW" label="输入密码" label-for="inputPW">
                    <b-form-input id="inputPW" type="password"
                                  v-model="$v.form.password.$model"
                                   placeholder="输入密码"
                                  :state="validateState('password')"
                                  aria-describedby="input-3-live-feedback"
                    />
                    <b-form-invalid-feedback id="input-3-live-feedback">
                        请输入至少6位的密码
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="confirmPW" label="确认密码" label-for="confirmPW">
                    <b-form-input id="confirmPW" type="password" v-model="$v.form.reEnter.$model"
                                  placeholder="再次输入密码"
                                  :state="validateState('reEnter')"
                                  aria-describedby="input-4-live-feedback"
                    />
                    <b-form-invalid-feedback id="input-4-live-feedback">
                        两次输入密码不一致
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="input-group-3" label="类型:" label-for="input-3">
                    <b-form-select
                            id="input-3"
                            v-model="form.food"
                            :options="foods"
                            required
                    ></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4">
                    <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                        <b-form-checkbox value="me">订阅最新的书籍上架信息</b-form-checkbox>
                        <b-form-checkbox value="that">订阅编辑推荐</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
                <b-container>
                    <b-button type="submit" variant="primary">提交</b-button>
                    <b-button type="reset" style="float: right;" variant="danger">清空</b-button>
                </b-container>
            </b-form>
        </div>
    </div>
</template>

<script>
    import{required,minLength,email,sameAs} from 'vuelidate/lib/validators'
    import server from "@/http/request";
    export default {
        name: "SignIn",
        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    food: null,
                    password:'',
                    reEnter:'',
                    checked: []
                },
                foods: [{ text: '选择类型', value: null }, '文艺', '普通', '二逼'],
                show: true
            }
        },
        validations:{
            form: {
                email: {
                    required,
                    email,
                },
                name:{
                    required,
                    minLength:minLength(3)
                },
                password: {
                    required,
                    minLength: minLength(6),
                },
                reEnter: {
                    required,
                    sameAsPassword: sameAs('password'),
                }
            }
        },
        methods: {
            onSubmit() {
                this.$v.form.$touch();
                if(this.$v.form.$anyError){
                    return;
                }
                server.post('/SignIn',{
                        user_name:this.form.name,
                        password:this.form.password,
                        email_address:this.form.email
                    }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                ).then(
                    (response)=>{
                        if(response.data.success===true){
                        this.$dialog.alert('注册成功').then(

                            this.$router.push('/Login'))
                        }
                        else{
                            this.$dialog.alert('用户名已存在.');
                        }
                    }
                )
            },
            onReset() {
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            validateState(name) {
                const { $dirty, $error } = this.$v.form[name];
                return $dirty ? !$error : null;
            },
        }

    }
</script>

<style scoped>
.container{
    max-width: 330px;
}
</style>