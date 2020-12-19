<template>
    <transition name='showImg'>
        <div id="showImg" v-if="show" @click="close">
            <img :src="src" >
            <img src="/img/close.png" style="position:fixed;right:5%;left:auto;top:5%;width:20px" alt="">
        </div>
    </transition>
</template>

<script>
export default {
    props:['src','show'],
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        close(){
            this.$emit('update:show',false);
        }
    },
}
</script>

<style lang="less" scoped>
.showImg-enter-active,.showImg-leave-active{
    transition: all .4s ;
}
.showImg-enter,.showImg-leave-to{
    opacity: 0;
}
#showImg{
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    img{
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        left: 50%;
        max-height: 80%;
        max-width: 100%;
    }
}
</style>