<template>
        <b-row>
            <b-col>
                从<b-form-datepicker id="inputDate1"   v-model="filterDateAfter"   class="mb-3"></b-form-datepicker>
            </b-col>
            <b-col>
                到<b-form-datepicker id="inputDate2"  v-model="filterDateBefore" class="mb-3"></b-form-datepicker>
            </b-col>
        </b-row>
</template>

<script>
    export default {
        name: "DateSelector",
        data(){
            return{
                filterDateAfter:"2020-01-01",
                filterDateBefore:"2020-12-31",
        }
        },
        methods:{

        },
        watch:{
            filterDateAfter:function(date){
                if(date!=null&&this.filterDateBefore!=null)
                    this.$emit('submit',{after:date,before:this.filterDateBefore})
            },
            filterDateBefore:function(date){

                if(date!=null&&this.filterDateAfter!=null)
                    this.$emit('submit',{before:date,after:this.filterDateAfter})
            },
        }
    }
</script>

<style scoped>

</style>