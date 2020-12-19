<template>
    <div class="button">
        <div  :class="[
        buttonType,buttonSize,
        {
            'is-round':round
        }
        ]">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        type:{
            type:String,
            default:'primary'
        },
        size:{
            type:String,
            default:'medium'
        },
        round: Boolean,
    },
    components: {},
    data() {
        return {

        };
    },
    computed: {
        buttonType(){
            if(this.type){
                return this.type
            }else{
                return 'primary'
            }
        },
        buttonSize(){
            if(this.size){
                return this.size
            }else{
                return 'medium'
            }
        },
    },
    methods: {},
    mounted() {},
    }
</script>
<style lang='less' scoped>
.button{
    display: inline-block;
    &>div{
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
    }
    .is-round{
        border-radius: 20px ;
    }
    color: white;
}
.primary{
    color: #333;
    background-color:gainsboro;
    &:hover{
        background-color: gray;
    }
    &:active{
        background-color: rgb(104, 100, 100);
    }
}
.success{
    background-color: rgb(16, 155, 16);
    &:hover{
        background-color: rgb(13, 121, 13);
    }
    &:active{
        background-color: rgb(10, 99, 10);
    }
}
.danger{
    background-color: red;
    &:hover{
        background-color: rgb(230, 10, 10);
    }
    &:active{
        background-color: rgb(141, 5, 5);
    }
}
.warning{
    background-color: burlywood;
    &:hover{
        background-color: rgb(192, 149, 93);
    }
    &:active{
        background-color: rgb(173, 122, 56);
    }
}
.medium{
    width:100px;
    height: 35px;
    line-height: 35px;
}
.small{
    width: 80px;
    height: 27px;
    line-height: 27px;
}
</style>