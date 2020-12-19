<template>
  <div id="app">
        <music style="margin-top:150px;"></music>
        <main-header v-if="!isHome"></main-header>
        <nuxt/>
  </div>
</template>

<script>

import music from '~/components/music'
import mainHeader from '~/components/mainHeader'

export default {
    name: 'App',
    components:{
        music,mainHeader
    },
    data() {
        return {
            isHome:true
        }
    },
    created(){
    },
    watch: {
        '$route':{
            handler(newValue,oldValue){
                newValue.path == '/' ? this.isHome =true : this.isHome = false;
            },
            immediate:true
        }
    },
    async mounted() {
        const admin = localStorage.getItem('damon')
        if(admin){
            this.$store.commit('user/changeAdmin',true) 
        }
        // try {
            // let x = imgLoaderPlay();
            // let y =  videoLoaderPlay();
            // document.getElementById('loading').style.cssText = "opacity:0;transition:all 2s;";
            // setTimeout(() => {
            //     document.getElementById('loading').style.display = 'none';
            //     console.log(x)
            // }, 2000);
        // } catch (error) {
        //     document.getElementById('loading').style.cssText = "opacity:0;transition:all 2s;";
        //     setTimeout(() => {
        //         document.getElementById('loading').style.display = 'none';
        //         console.log(x)
        //     }, 2000);
        //     console.log(error);
        // }
    },  
}
</script>

<style>
.content{   
    max-width: 1150px;
    width: 100%;
    display: block;
    margin: 0 auto;
    padding-top: 50px;
    position: relative;
}
 .fade-enter-active{
    transition: all .7s ease
}
.fade-enter{
    opacity: 0;
    transform: translateY(50px)
}

</style>
