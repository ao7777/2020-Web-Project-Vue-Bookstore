<template>
    <div class="browser">
            <Board />
            <BookShelf  @addItem="handleAdd"
            />

    </div>
</template>

<script>
    import Board from "@/components/Board";
    import BookShelf from "@/components/BookShelf";

    export default {
        name: "Browser",
        components:{BookShelf,Board},
        methods:{
            handleAdd:function(isbn){
                this.$store.commit('increment',isbn);
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