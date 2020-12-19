<template>
    <transition name="scroll">
        <div v-if="xx" style="height:100vh" ref="scroll">
            <v-fullpage @leaveSlide ='ss' class="scroll" ref='vf'>
                <div slot='section' >
                    <video style="width:100%;height:100%" src="https://test.crmeeting.cn/b/chat/d/saber.mp4" autoplay='1' muted loop></video>
                </div>
                <div slot='section' style="position:relative">
                    <img src="https://test.crmeeting.cn/b/chat/d/s1.jpg" alt="">
                    <div class="myJournal">
                        <el-timeline>
                            <el-timeline-item timestamp="过去" placement="top">
                            <el-card>
                                <h4>技能</h4>
                                <p>Vue 全家桶</p>
                                <p>Nuxt （此网站是用Nuxt完成）</p>
                                <p>Egg.js （node.js 会作为后台API转发，数据整合使用，但 SSR 略有不足）</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="现在" placement="top">
                            <el-card  >
                                <h4>个人标签</h4>
                                <p>努力，不怕加班，但害怕无意义的浪费自己时间</p>
                                <p>有目标 并 愿意 为之奋斗，愿意吃苦，同样希望是吃必要的苦，而不是吃了苦一点进步都没有</p>
                                <p>善于沟通 和 换位思考</p>
                            </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="未来" placement="top">
                            <el-card >
                                <h4>规划</h4>
                                <p>现阶段希望能打牢基础的同时，能十分熟练使用 TypeScript，即将到来的Vue 3.0 ，SSR 和Node.js</p>
                                <p>次年和下下年2年内，能对整个前端有自己的一个认识，并写一套UI和一个自己全栈的网站</p>
                                <p>。。。等2年后再做新的规划</p>
                            </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
                <div slot='section' style="position:relative">
                    <img src="https://test.crmeeting.cn/b/chat/d/s3.jpg" alt="">
                    <div class="word3" @click="goInsideFn">
                        {{goInside}}
                    </div>
                </div>
            </v-fullpage>
            <div class="dots">
                    <span v-for="i in 3" :class="(i==pageIndex?'active':'')" @click="goToPage(i)"></span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            xx:false,
            pageIndex:1,
            goInside:"",
        };
    },
    methods: {
        goInsideFn(){
            this.xx = false;
            document.body.style.overflow = 'auto'
        },
        goToPage(index){
            let  value = Math.abs(index-this.pageIndex);
            if((index-this.pageIndex)>0){
                for(let i=0;i<value;i++){
                    this.$refs.vf.next();
                }
            }else{
                for(let i=0;i<value;i++){
                    this.$refs.vf.pre();
                }
            }
        },
        ss(e){
            this.pageIndex = e.currentIndex;
            if(e.currentIndex == 3){
                this.showWord();
            }
        },
        async showWord(){
            this.goInside = '';
            // Click Me To Get More Communication~~
            let word = "您可以点击这段文字，以便查看更多关于我的信息，谢谢~~";
            let that = this;
            setTimeout(() => {
                let x=0;
                let timer = setInterval(() => {
                    that.showOneWord(x++,word)
                    if(word[x] === undefined){
                        clearInterval(timer);
                    }
                }, 200);
            }, 1000);
        },
        async showOneWord(index,word){
                this.goInside = this.goInside+word[index]
        }
    },
    created(){
        // this.xx=true;
    },
    mounted() {
        
    },
    watch:{
        xx(){
            // if(this.xx){
            //     document.body.style.overflowY = 'hidden';
            //     this.pageIndex = 1;
            // }else{
            //     document.body.style.overflowY = 'auto'
            // }
        }
    }
    }
</script>



<style lang='less' scoped>
.scroll-enter,.scroll-leave-to{
    opacity: 0;
    transform: translateY(100%);
}
.scroll-enter-active,.scroll-leave-active{
    opacity: 1;
    transition: all 1.5s;
}
@keyframes rotates {
    0%{
        background-color: #d81e06;
        transform: rotate(0deg);
        // border-radius: 0;
        left: -20px;
    }
    50%{
        background-color: greenyellow;
        transform: rotate(180deg);
        // border-radius: 50%;
        left: 0px;
    }
    100%{
        background-color: #d81e06;
        transform: rotate(360deg);
        // border-radius: 0;
        left: -20px;
    }
}
@keyframes rotates2 {
    0%{
        background-color: #d81e06;
        transform: rotate(0deg);
    }
    50%{
        background-color: greenyellow;
        transform: rotate(180deg);
    }
    100%{
        background-color: #d81e06;
        transform: rotate(360deg);
    }
}
.myJournal{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    top: 50%;
    color: white
}
.scroll{
    z-index: 2;
    background-color: rgba(0, 0, 0, 1);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
     .word3{
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translateY(-50%);
        // width: 200px;
        // height: 200px;
        word-break: break-all;
        font-size: 3em;
        font-weight:700;
        cursor: pointer;
        transition: all .5s;
        padding: 20px;
        font-family:serif;
        &:hover{
            box-shadow: 0 2px 4px rgba(0, 0, 0, .6);
            transform: rotate(1deg);
        }
    }
}
.dots{
    position: absolute;
    right: 0;
    top: 50%;
    width: 100px;
    height: 100px;
    z-index: 2;
    transform: translateY(-50%);
    span{
        display: block;
        width: 20px;
        height: 20px;
        background-color: rgba(0, 0, 0, .6);
        box-shadow: 0px 0px 5px white;
        border-radius: 50%;
        margin: 20px;
        transition: all 1s;
        position: relative;
        cursor: pointer;
        &:hover{
            box-shadow: 0px 0px 5px 3px white;
        }
    }
    .active{
        background-color: #ccc;
        &::after{
            content:'';
            position: absolute;
            width: 10px;
            height: 10px;
            top: 0;
            left: -20px;
            border-radius: 50%;
            animation: rotates 3s linear infinite;
            transform-origin: 300% 100%;
        }
        &::before{
            content:'';
            position: absolute;
            width: 8px;
            height: 8px;
            top: 0;
            left: -10px;
            border-radius: 50%;
            animation: rotates2 3s linear infinite;
            transform-origin: 250% 120%;
        }
    }
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .8;
}
p{
    padding: 0;
    margin: 5px 0;
}
</style>