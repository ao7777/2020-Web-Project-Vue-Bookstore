<template>
    <div class="peekResult">
        <PeekRow v-for="book in books"
                 :book="book"
                 :key="book.isbn"
        />
    </div>
</template>

<script>
    import PeekRow from "@/components/PeekRow";
    export default {
        name: "PeekResult",
        props:['bookData','filterText'],
        components:{PeekRow},
        data:function () {
            return{
                books:this.bookData
            }
        }
    }
</script>

<style scoped>
    .peekResult{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        border-radius: 0 0 .4rem .4rem;
        overflow: hidden;
        background-color: rgba(60,60,60,0.8);
        backdrop-filter: saturate(180%) blur(20px);
        -webkit-backdrop-filter:  saturate(180%) blur(20px);
    }
</style>