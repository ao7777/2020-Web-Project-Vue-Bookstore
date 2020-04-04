<template>
    <div class="peekRow">
        <img :src="book.pic" alt="''" class='peekPic'/>
        <p class='peekName'>{{book.name}}</p>
        <p class='peekDetail'>
            {{book.author}}<br />
            {{book.press}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "PeekRow",
        props:['book']
    }
</script>

<style scoped>
    .peekRow{
        vertical-align: middle;
        display: table-cell;
        height: 100px;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }

    .peekPic{
        height:100px;
        float: left;
        padding: 6px;
    }
    .peekName{
        vertical-align: middle;
        position: relative;
        width: 50%;
        color: #FFFFFF;
        opacity: 0.8;
        padding: 6px;
    }
    .peekDetail{
        font-size:9px;
        color: #FFFFFF;
    }


</style>