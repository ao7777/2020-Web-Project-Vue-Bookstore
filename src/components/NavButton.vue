<template >
        <router-link :to="Func" :class="[visible?'menuButton':'menuButton hidden']" :title="buttonName">
            <span>{{buttonName}}</span>
        </router-link>
</template>

<script>
    export default {
        name: "NavButton",
        props:['Func','Name','visible'],
        data:function(){
          return {buttonName:this.Name
          }
        },
        methods:{
            handleSwitch:function(){
                this.$emit("switch",this.Func);
            }
        }
    }
</script>

<style scoped>
.menu{
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    height: 44px;
    z-index: 1;
    vertical-align: top;
}
    .menuButton{
        font-size: 14px;
        line-height: 3.14286;
        font-weight: 400;
        letter-spacing: -.01em;
        position: relative;
        z-index: 1;
        display: inline-block;
        padding: 0 10px;
        height: 44px;
        opacity: 1;
        transform: scale(1);
        background: no-repeat;
        text-decoration: none;
        white-space: nowrap;
        transition: color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        -webkit-tap-highlight-color: transparent;
        outline-offset: -7px;
    }
    .menuButton:focus{
        color: #FFFFFF;
    }
    .hidden{
        transform: scale(0);
        transition: 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
</style>