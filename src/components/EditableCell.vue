<template>
    <span v-if="isShow" @dblclick="handleEdit" >{{value}}</span>
    <label class="editInput" v-else @blur="cancelEdit">
        <input v-if="inputType==='text'" :type="inputType" class="editInput"
               :placeholder="'输入'+typeDesc"
               @keypress.enter="submit" v-model="typeValue" />
        <input v-else :type="inputType" class="editInput"
               :placeholder="'输入'+typeDesc"
               @keypress.enter="submit" v-model="typeNumValue" />
    </label>
</template>

<script>
    export default {
        name: "EditableCell",
        props:['inputType','value','typeDesc','show'],
        data:function(){
            return{
                typeValue:'',
                typeNumValue:0,
                isShow:this.show,
            }
        },
        methods:{
            submit:function() {
                this.$emit('submitValue',this.inputType==='text'?this.typeValue:this.typeNumValue);
                this.isShow=true;
            },
            handleEdit(){
                this.isShow=false;
            },
            cancelEdit(){
                this.isShow=true;
            }
        }
    }
</script>

<style scoped>

    .editInput{
        display: inherit;
        height: 20px;
    }
</style>