<template>
    <div class="content">  
        <div>
            <div class="title">select选择器</div>
            <d-select v-model="value" style="display:inline-block">
                <d-option v-for="(i,index) in list"
                :value='i.age'
                :key='index'
                :label='i.name'></d-option>
            </d-select>
            <span> 值：{{value}}</span>
        </div>
        <div>
            <div class="title">button按钮</div>
            <d-button>primary</d-button>
            <d-button type=success>success</d-button>
            <d-button type=danger>danger</d-button>
            <d-button type=warning>warning</d-button>
            <span>.............</span>
            <d-button type=warning>warning</d-button>
            <d-button type='warning'  round>warning</d-button>
            <span>.............</span>
            <d-button>primary</d-button>
            <d-button size=small>primary</d-button>
        </div>
    </div>  
</template>

<script>
import DOption from '~/components/select/option.vue'
import DSelect from '~/components/select/indexs.vue'

import DButton from '~/components/button'
export default {
    components: {DOption,DSelect,DButton},
    data() {
        return {
            list:[
                {name:'xcccc',age:2},
                {name:'xxasdasd',age:22},
                {name:'xxsadasdasdsax',age:222},
            ],
            value:'2', 
        };
    },
    methods: {
        showw(){
            alert(this.value);
        }
    },
    mounted() {},
    }
</script>
<style lang='less' scoped>
.title{
    font-size: 18px;
    font-weight: 700;
    padding: 10px 0;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, .42);
}
</style>