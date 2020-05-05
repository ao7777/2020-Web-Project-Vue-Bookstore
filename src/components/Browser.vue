<template>
    <div class="browser">
            <Board />
            <BookShelf :init-filter-text="filterText" :init-book-data="bookData"
            :is-request-search="isSearch" :mode="mode" @addItem="handleAdd"
            />
    </div>
</template>

<script>
    import Board from "@/components/Board";
    import BookShelf from "@/components/BookShelf";
    export default {
        name: "Browser",
        props:['showSearch','bookData','isSearch','filterText','mode'],
        data:function () {
            return{
                type:'',
            }
        },
        components:{BookShelf,Board},
        methods:{
            handleAdd:function(isbn){
                this.$emit("addItem",isbn)
            }
        }
    }
</script>

<style scoped>
    .browser{
        width: 100%;
        margin: auto;
    }
</style>