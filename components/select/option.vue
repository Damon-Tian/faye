<template>
    <div class="option" :class="{'active':active}"  @click="show">
        <div>{{label}}</div>
    </div>
</template>

<script>

export default {
    props:['label','value'],
    components: {},
    data() {
        return {
            active:false
        };
    },
    methods: {
        show(){
            this.$parent.returnValue(this.value);
            this.$parent.selectLabel = this.label;
            this.$parent.showList = !this.$parent.showList;
        }
    },
    mounted() {
        if(this.$parent.selectValue == this.value){
            this.active = true;
        }
    },
    }
</script>
<style lang='less' scoped>
.active{
    color: red;
}
</style>