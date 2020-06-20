<template>
    <div style="width: 80%;margin:auto;padding: 15px">

        <b-form @submit.stop.prevent="onSubmit" @reset="onReset" novalidate v-if="show">
            <b-form-file
                    @change="setFile"
                    :state="cover"
                    placeholder="选择文件或拖拽"
                    drop-placeholder="拖拽到此处"
                    required
                    accept="image/*"
            ></b-form-file>
            <b-img center v-if="cover" :src="cover" thumbnail></b-img>
            <b-row>
                <b-col>

                    <b-form-group
                            id="input-group-1"
                            label="图书名:"
                            label-for="input-1"
                    >
                        <b-form-input
                                id="input-1"
                                v-model="$v.form.name.$model"
                                type="text"
                                placeholder="图书名"
                                :state="validateState('name')"
                                aria-describedby="input-1-live-feedback"
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-1-live-feedback">
                            输入书名
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="作者:" label-for="input-2">
                        <b-form-input
                                id="input-2"
                                v-model="$v.form.author.$model"
                                required
                                placeholder="作者"
                                :state="validateState('name')"
                                aria-describedby="input-2-live-feedback"
                        ></b-form-input>
                        <b-form-invalid-feedback id="input-2-live-feedback">
                            输入作者
                        </b-form-invalid-feedback></b-form-group>

                    <b-form-group id="inputPW" label="价格(单位：分)" label-for="inputPW">
                        <b-form-input id="inputPW" type="number"
                                      v-model="$v.form.price.$model"
                                      placeholder=0
                                      :state="validateState('price')"
                                      aria-describedby="input-3-live-feedback"
                        />
                        <b-form-invalid-feedback id="input-3-live-feedback">
                            价格必须大于0
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="confirmPW" label="ISBN：" label-for="confirmPW">
                        <b-form-input id="confirmPW" type="text" v-model="$v.form.isbn.$model"
                                      placeholder="输入ISBN号"
                                      :state="validateState('isbn')"
                                      aria-describedby="input-4-live-feedback"
                        />
                        <b-form-invalid-feedback id="input-4-live-feedback">
                            输入13位ISBN号
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
                <b-col>


                    <b-form-group id="input-group-3" label="出版社:"  label-for="input-3">
                        <b-form-select
                                id="input-3"
                                v-model="form.press"
                                :options="publishers"
                                required
                        ></b-form-select>
                    </b-form-group>

                    <b-form-group id="inputDate" label="出版日期" label-for="inputDate">
                        <b-form-datepicker id="inputDate"  v-model="form.date" class="mb-2"></b-form-datepicker>
                    </b-form-group>
                    <b-form-group id="input-Stock" label="库存" label-for="input-Stock">
                        <b-form-input id="input-Stock" type="number"
                                      v-model=" $v.form.stock.$model"
                                      placeholder="输入库存"
                                      :state="validateState('price')"
                                      aria-describedby="input-5-live-feedback"
                        />
                        <b-form-invalid-feedback id="input-5-live-feedback">
                            库存必须大于0
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-button type="submit" block>提交</b-button>
                    <b-button type="reset" block>清空</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
    import{required,minValue,minLength,maxLength,numeric} from 'vuelidate/lib/validators'

    import server from "@/http/request";
    export default {
        name: "BookAdder",
        data:function(){
            return {
                publishers: [{ text: '选择出版社', value: null }, '长江文艺出版社', '人民文学出版社', '上海译文出版社'],
                form:{
                    name:null,
                    author:null,
                    price:0,
                    stock:0,
                    press:null,
                    isbn:null,
                    food:null,
                    date:null,
                    file:null
                },
                show:true,
                cover:null,
            }

        },
        validations:{
            form: {
                author: {
                    required,
                },
                name:{
                    required,
                },
                price: {
                    required,
                    minValue:minValue(1)
                },
                stock:{
                    required,
                    minValue:minValue(1)
                },
                isbn:{
                    required,
                    minLength:minLength(13),
                    maxLength:maxLength(13),
                    numeric
                }
            }
        },
        methods: {
            onSubmit() {
                this.$v.form.$touch();
                if(this.$v.form.$anyError){
                    return;
                }
                server.post('/BookUpload',{
                        name:this.form.name,
                        publish_date:this.form.date,
                        author:this.form.author,
                        price:this.form.price,
                        press:this.form.press,
                        stock:this.form.stock,
                        isbn:this.form.isbn,
                        file:this.cover
                    }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                ).then(
                    (response)=>{
                        if(response.data.success===true){
                            this.$dialog.alert('添加成功').then(
                                this.show=false
                            )
                        }
                        else{
                            this.$dialog.alert('添加失败.');
                        }
                    }
                )
            },
            setFile(e){
                let reader=new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload=(e)=>{
                    this.cover=e.target.result;
                }

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

</style>