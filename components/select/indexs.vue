<template>
    <div class="selects" ref="selectList">
        <input class="input" readonly @click="toShowList" v-model="selectLabel">
        <transition name="listBlock" @enter='enter' @leave='leave'>
            <div class="selectList" v-if="showList" >
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props:['selectList','selectValue'],
    components: {},
    model:{
        prop:'selectValue',
        event:'vv'
    },
    data() {
        return {
            showList:false,
            selectLabel:''
        };
    },
    mounted() {
        window.addEventListener('click',this.cc);
    },
    methods: {
        cc(){
            alert(22)
        },
        enter(el,done){
            el.style.height = 'auto'
            let endWidth = window.getComputedStyle(el).height
            el.style.height = '0px'
            el.offsetHeight  // force repaint
            el.style.height = endWidth
        },
        leave(el){
            let endWidth = window.getComputedStyle(el).height
            el.offsetHeight // force repaint
            el.style.height = '0px'
        },
        clickq(e){
            if(!this.$refs.selectList.contains(e.target)){
                this.showList = false;
            }
            document.removeEventListener('click',this.clickq);
        },
        toShowList(){
            this.showList = !this.showList;
            let v = this.clickq;
            setTimeout(() => {
                document.addEventListener('click',v);
            }, 0);
        },
        returnValue(value){
            this.$emit('vv',value);
        },
        
    },
    mounted() {},
    }
</script>
<style  scoped>
.listBlock-enter-active{
    transition: all .3s ease;
}
.listBlock-leave-active{
transition: all .1s ease;
}
.listBlock-enter,.listBlock-leave-to{
    opacity: 0;
    height: 0;
}
.listBlock-enter-to,.listBlock-leave{
    
}

.selects{
    position: relative;
    text-align: left;
}
.input{
    width: 250px;
    height: 40px;
    border-radius: 5px;
    line-height: 30px;
    padding: 5px  20px;
    border: 1px solid gainsboro;
    display: block;
    cursor: pointer;
    transition: all .3s;
    box-sizing: border-box;
}
.input:hover{
    border:1px solid gray
}

</style>