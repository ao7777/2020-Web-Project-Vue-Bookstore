<template>
        <div class="boardContainer">
            <span class="greeting">书富如入海,
                <br />百货皆有。</span>
            <img class="board" src="http://localhost:8090/board.jpg" alt="''"/>
        </div>
</template>

<script>
    export default {
        name: "Board",
    }
</script>

<style scoped>
    .board{

    }
    .boardContainer{
        margin: auto;
        width: 100%;
    }
    .greeting{
        position: absolute;
        top:20%;
        left:10px;
        font-family: "Source Hans", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        font-size: 70px;
        font-weight: 800;
        text-align: center;
        text-shadow: 0 0 2px #312823;
        z-index: 1;
        color: #FFFFFF;
    }
</style>