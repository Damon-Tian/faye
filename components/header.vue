<template>
    <div id="headers">
        <!-- <div class="bodys">
            <div v-for="(item,index) in titleData" >
                <el-popover
                    width="200"
                    trigger="hover"
                    >
                    <span slot="reference" style="text-shadow:2px 2px 4px rgba(0,0,0,12)">{{item.name}}</span>
                    <slot >
                        <div v-if="index == 0" class="contents">
                            <router-link to="/" :style="{color:whichPage=='/'?'red':'' }">杂谈列表</router-link>
                            <router-link to="/photo"  :style="{color:whichPage=='/photo'?'red':'' }">图片示例<span style="font-size:12px">（图片可点击）</span></router-link>
                        </div>
                        <div v-if="index == 1" class="contents">
                            <router-link to="/assembly" :style="{color:whichPage=='/assembly'?'red':'' }">组件展示</router-link>
                        </div>
                        <div v-if="index == 2" class="contents">
                            <p>```末日```</p>
                            <p>```明日```</p>
                        </div>
                    </slot>
                </el-popover>
            </div>
        </div> -->
        <div class="d-backs" >
            <div class="backs-img"></div>
            <div class="rotate-line">
                <div class="word">
                    <h3>夜枫菲</h3>
                    <p>This is a small beginning</p>
                </div>
            </div>
            <svg @click="inMenu = true" v-if="!inMenu" t="1596465671816" class="icon menu" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1830" width="200" height="200"><path d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0" p-id="1831" fill="#e31f35"></path></svg>
        </div>
        <div class="blacks"></div>
        <!-- <div class="backToScroll" @click="backToScroll">
            返回大屏
        </div> -->
        <svg @click="inMenu = false" style="z-index:999" v-if='inMenu' t="1596466876603" class="icon menu" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2930" width="200" height="200"><path d="M216.91904 188.61056l648.2176 648.25856M198.81472 206.71488L740.9664 748.9024l106.06592 106.07104c23.36768 23.36768 59.5712-12.83584 36.20864-36.1984L341.08928 276.5824 235.02336 170.50624c-23.36768-23.36256-59.5712 12.84096-36.20864 36.20864z" p-id="2931" fill="#e31f35"></path><path d="M865.13664 188.61056L216.91904 836.86912M847.03232 170.50624C666.32192 351.232 485.59616 531.95776 304.88064 712.69376l-106.06592 106.07616c-23.36256 23.36256 12.84096 59.5712 36.20352 36.1984L777.16992 312.7808l106.07104-106.07104c23.35744-23.36256-12.84096-59.56608-36.20864-36.20352z" p-id="2932" fill="#e31f35"></path></svg>
        <transition name="menu-fade">
            <div class="d-menu" v-if="inMenu">
                <ul>
                    <router-link :to='menu.url' v-for="(menu,index) in menus" :key="index">
                        <span v-if="index==2"><span v-if="$store.state.user.admin">{{menu.title}}</span></span>
                        <span v-else>{{menu.title}}</span>
                     </router-link>
                </ul>
                <div class="menu-bottom-word">
                    <p>Today's Weather Is Normal</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {jieliu} from '~/util/index'
export default {
    asyncData() {
        let img = new Image();
        img.src= '/img/back.jpg';
    },
    mounted() {
        let backs = document.getElementsByClassName('d-backs')[0];
        backs.addEventListener('mousemove',jieliu(0,this.afterJieLiu))
    },
    data() {
        return {
            inMenu:false,
            menus:[
                {title:'Article',url:'article'},
                {title:'Photos',url:'photo'},
                {title:'Write',url:'write'},
            ],
            whichPage:'/',
            titleData:[
                {name:'SomeThing',content:'white'},
                {name:'一些组件',content:'black'},
                {name:'创造中~~',content:'red'}
            ]
        }
    },
    mounted(){
        if( this.$store.state.user.admin){
            this.menus.splice(2,1)
        }
    },
    methods: {
        afterJieLiu(e){
            let clientX = document.documentElement.clientWidth;
            let clientY = document.documentElement.clientHeight;
            let xResult = e.x-clientX/2;
            let yResult = e.y - clientY/2;
            let move = 20 ,initDistance=0;
            let x ,y;
            $('.backs-img').css({
                'transform':`translate3d(${-xResult/move + initDistance}px,${-yResult/move + initDistance}px ,0) scale(1.1)`
            })
            // $('.backs-img').animate({},function(){
            //       $('.backs-img').css({
            //             'transform':`translate3d(${-xResult/move + initDistance}px,${-yResult/move + initDistance}px ,0) scale(1.1)`
            //         })
            //     },'slow')
        },
        changeImg(e){
            jieliu(2000,this.afterJieLiu(e))
        },
        backToScroll(){
            this.$parent.$refs.scroll.xx = true;
        }
    },
    watch:{
        $route(){
            this.whichPage = this.$route.path 
        }
    },
}
</script>

<style lang="less" scoped>
.menu-fade-enter-active, .menu-fade-leave-active{
  transition: all 0.5s ease     
}
.menu-fade-enter, .menu-fade-leave-active{
  transform: translateY(-100%);
}
.backToScroll{
    position: absolute;
    padding: 10px;
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    background-color: rgba(0, 0, 0, .22);
    text-shadow: 1px 0px #Ccc;
    cursor: pointer;
    transition: all .5s;
    &:hover{
        background-color: rgba(0,0,0,.5);
    }
}
.el-popover{
    padding: 10px;
    width: 50px;
}
.saber{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    object-fit: fill;
}
.contents{
    margin: 0;
    padding: 0;
    p,a{
        margin: 0;
        padding: 10px;
        transition: all .3s;
        &:hover{
            background-color: gainsboro
        }
        &:active,&:visited,&:link{
            color: #666
        }
    }
    a{
        display: block;
        text-decoration: none
    }
}
.hoverBlock{
    border: 1px solid #fff;
    position: absolute;
    padding: 10px;
    border-radius: 2px;
    background-color: #fff;
    pointer-events: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    &::before{
        content: "";
        width: 0px;
        height: 0px;
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom:15px solid #fff;
        position: absolute;
        left: 50%;
        top: -20px;
        transform: translateX(-50%);
    }
    &:hover{
        display: block;
    }
}
#headers{
    width: 100%;
    height: 100vh;
    min-height: 150px;
    .bodys{
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-shadow: 0 1px 1px rgba(0,0,0,.3);
        color: #fff;
        font-size: 14px;
        background-color: transparent;
        z-index: 2;
        &>div{
            display: inline;
            span{
                margin: 0 10px;
                cursor: pointer;
            }
        }
    }
    .menu{
        width: 30px;
        height: 30px;
        position: absolute;
        right: 5%;
        top: 5%;
        cursor: pointer;
        transition: all 0.05s; 
        &:hover{
            box-shadow: 0 0px 4px 4px rgba(185, 67, 67, 0.3);
            background-color: rgba(185, 67, 67, 0.3);
        }
    }
    .d-menu{
        z-index:3;
        position: fixed;
        top:0;
        width: 100%;
        left: 0;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.9);
        ul{
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 24px;
            a{
                display: inline-block;
                padding: 10px;
                margin:10px;
                cursor: pointer;
                color: rgb(119, 111, 111);
                position: relative;
                &::after{
                    content:'';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    transition: all .3s;
                    height: 2px;
                    background-color: red;
                    bottom: 0;
                }
                &:hover{
                    &::after{
                        width: 100%;
                    }
                }
            }
        }
        @media screen and (max-width:900px) {
            ul{
                top:42%
            }
        }
        .menu-bottom-word{
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            font-size: 20px;
            color: rgb(216, 145, 145)
        }
    }
    .d-backs{
        overflow: hidden;
        z-index: 2;
        position: absolute;
        top: 0;
        height: 100vh;
        min-height: 150px;
        // background-image: url('https://watermelon-object.oss-cn-shenzhen.aliyuncs.com/image/0d53dd89b02269319127c076d59c297.png');
        width: 100%;
        .backs-img{
            width: 100%;
            height: 100%;
            transition: all .16s ease-out;
            transform: scale(1.1);
            background: url('/img/back.jpg')  center/cover  ;
        }
        .rotate-line{
            background-color: rgba(255, 0, 0, 0.295);
            width: 60%;
            height: 100%;
            position:absolute;
            top: 0;
            clip-path: polygon(0 0,  0 100%,  100% 100%,  40% 0%);
            .word{
                color: white;
                position: absolute;
                top: 40%;
                transform: translate(30%,-50%);
                h3{
                    font-size: 40px;
                    font-family: sans-serif
                }
                p{
                    font-size: 24px;
                }
            }
        }
        @media screen and (max-width: 900px) {
            .rotate-line{
                width: 100%;
                clip-path: polygon(0 0,  0 100%,  100% 100%,  80% 0%);
            }
        }
    }
    .blacks{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100px;
        background:linear-gradient(rgba(0,0,0,.5),transparent);
        z-index: -1;
    }
}


</style>