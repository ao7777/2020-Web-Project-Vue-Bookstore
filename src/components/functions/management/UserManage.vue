<template>
    <b-container style="background: #FFFFFF;padding: 3px">
        <b-card-group columns>
            <b-card :title="user.name"
                    :sub-title="'ID:'+user.id"
                    v-for="user in users"
                    :key="user.id"
                    style="max-width: 300px"
            >
                <b-card-img-lazy :src="'http://localhost:8070'+user.avatar" style="max-height: 250px" class="rounded-0" :alt="user.name"/>

                <b-card-text >
                    邮箱 {{user.email}}
                    <br/>注册时间
                    {{user.joinDate}}
                </b-card-text>
                <template v-slot:footer>
                    类型：{{user.type}}
                    <b-button v-if="user.type!=='banned'" @click="banUser(user.name)">封禁</b-button>
                    <b-button v-else @click="recoverUser(user.name)">解禁</b-button>

                </template>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
    import server from "@/http/request";

    export default {
        name: "UserManage",
        data(){
            return{
                users:[]
            }
        },
        created(){
            server.get('/GetUsers'
            )
                .then(
                    (response)=>{
                        this.handleUser(response.data);}
                ).catch(
                function(error){
                    console.log(error);
                }
            );
        },
        methods:{
            handleUser:function(users){
                for(let i in users) {
                    this.users.push(
                        {
                            name:users[i].name,
                            id:users[i].id,
                            joinDate:users[i].join_date,
                            type:users[i].type,
                            avatar:users[i].avatar,
                            email:users[i].email
                        }
                    )
                }
            },
            banUser:function(name){
                this.$dialog.confirm('封禁该用户？',{
                    loader:true
                }).then((dialog)=>
                server.get('/BanUser',{params:{
                        user_name:name
                    }}).then((response)=>{

                        dialog.close();
                        if(response.data.success){
                    this.$dialog.alert("操作成功");
                    let index=this.users.findIndex((user)=>{return user.name===name});
                    this.$set(this.users[index],"type",'banned')}
                        else{
                            this.$dialog.alert("操作失败");

                        }
                })
                )
            },
            recoverUser:function(name){
                this.$dialog.confirm('解禁该用户？',{
                    loader:true
                }).then((dialog)=>
                    server.get('/RecoverUser',{params:{
                            user_name:name
                        }}).then((response)=>{
                        dialog.close();
                        if(response.data.success){
                            this.$dialog.alert("操作成功");
                            let index=this.users.findIndex((user)=>{return user.name===name});
                            this.$set(this.users[index],"type",'user')}
                        else{
                            this.$dialog.alert("操作失败");

                        }}))
            }
        }
    }
</script>

<style scoped>

</style>