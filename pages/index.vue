<template>
      <div>
          <headers  v-if="!writing"></headers>
        <transition name="list">
            <div class="content"  v-if="!writing">
                
                <div  class="writeBlog">
                    <span class="top-word" style="font-size:16px"  @click="writing=true">Write Something </span>
                </div>
                    <div  class="pubu">
                        <div ref='first'>
                            <div  v-for="(item,index) in blogList[0]" >
                                <blog-block 
                                :item='item'
                                ></blog-block>
                            </div>
                        </div>
                        <div ref='second'>
                            <div v-for="(item,index) in blogList[1]" >
                                <blog-block 
                                :item='item'
                                ></blog-block>
                            </div>
                        </div>
                        <div  ref='third'>
                            <div v-for="(item,index) in blogList[2]" >
                                <blog-block 
                                :item='item'
                                ></blog-block>
                            </div>
                        </div>
                    </div>
            </div>
        </transition>
     <transition name="write"  >
        <div class="writing content" v-if="writing">
            <div class="backs">
                <img :src="item" alt="" v-for="item in fruits">
            </div>
            <el-card class="box-card  " style="position:relative">
                <div style="position:absolute;top:0;bottom:0;left:0;right:0;">
                    <vue-particles
                        color="#dedede"
                        clickMode = 'push'
                    >
                    </vue-particles>
                </div>
                <div class="wrtingBlock" >
                    <span>Title</span>
                    <el-input style="width:60%" v-model="name"></el-input>
                </div>

                <div  class="wrtingBlock" style="display:flex;justify-content:center">
                    <span>Say What You Want To Say</span>
                    <el-input type='textarea' style="width:60%;" :rows=15  resize='none' v-model="content"></el-input>
                </div>

                <div  class="wrtingBlock" >
                    <span> </span>
                    <div style="width:60%;display:inline-block;z-index:10;position:relative">
                        <el-button size='small' type='warning' @click="confirmPWD = true">确认</el-button>
                        <el-button size='small' type='info' plain @click="writing = false">取消</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    
    </transition> 

        <el-dialog
            title="提示"
            :visible.sync="confirmPWD"
            width="300px"
            >
            <p>请输入4位密码~~~</p>
            <el-input v-model="PWD"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size='small'  type="info" plain  @click="confirmPWD = false">取 消</el-button>
                <el-button size='small' type="warning" @click="checkPWD">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import blogBlock from '~/components/blogBlock'
import {get} from '~/axios/axios.js'
import {jieliu} from '~/util/index.js'
// import {imgLoaderPlay,videoLoaderPlay} from  '~/loading/index'


// import particles from '~/assets/js/particales/particles.min.js'
import particalesJson from '~/assets/js/particales/particles.json'
import headers from '~/components/header'
export default {
    async asyncData(context){
        context.app.head.title='Damon';
        let x = await get(`/blog/list_all?curPage=1&limit=5`)
        return {list:x.data.data};
    },
    components: {blogBlock,headers},
    data() {
        return {
            PWD:'',
            confirmPWD:false,
            blogList:[[],[],[]],
            writing:false,
            name:'',
            content:'',
            fruits:[],
            curPage:1,
            limit:5,
        };
    },
    mounted() {
        let loadingImg = new Image();
        loadingImg.src = 'img/loading.gif';

        let that = this;
        this.blogList = [[],[],[]];
        this.getList(this.curPage,this.limit);
        for(let i=0;i<10;i++){
            let index = Math.ceil(Math.random()*10);
            this.fruits.push(`img/fruit/${index}.png`);
        }
        // this.checkScroll();
        window.addEventListener('scroll',this.jj())
    },  
    beforeDestroy(){
        window.removeEventListener('scroll',this.jj());
    },
    watch:{
        writing(){
            if(this.writing == true){
                setTimeout(() => {
                    if (process.browser) {
                        let x = require('particlesjs')
                    }
                }, 200);
            }
        }
    },
    methods: {
        jj(){
            return jieliu(500,this.scrolls)
        },
        async checkScroll(){
            let that = this;
            if(document.documentElement.scrollHeight == document.documentElement.clientHeight){
                    this.getList(this.curPage,this.limit);
                    setTimeout(() => {
                            that.checkScroll()
                    }, 500);
            }
        },
        getData(clear){
            let that = this;
            if(clear){
                this.blogList = [[],[],[]];
                this.curPage = 1;
            }
            this.$axios.get(`/blog/list_all?curPage=1&limit=${this.limit}`)
            .then(res=>{
                that.list = res.data.data;
            })
        },
        getList(curPage,limit){
            let that = this;
            //如要分页   当前页curPage   每页数量limit  
            if(curPage == 1){
                that.curPage++;
                let  i = 0;
                showFall();
                function showFall(){
                    if(i>=that.list.length){
                        return;
                    }
                    let origin = that.$refs.first.offsetHeight<=that.$refs.second.offsetHeight?that.$refs.first:that.$refs.second;
                    let final = origin.offsetHeight<=that.$refs.third.offsetHeight?origin:that.$refs.third;
                    for(let v in that.$refs){
                        if(that.$refs[v] == final){
                            if(v == 'first'){
                                that.blogList[0].push(that.list[i]);
                            }else if(v == 'second'){
                                that.blogList[1].push(that.list[i]);
                            }else{
                                that.blogList[2].push(that.list[i]);
                            }
                        }
                    }
                    i++;
                    that.$nextTick(()=>{showFall()})
                }
            }else{
                if(that.curPage == -1){
                    return 
                }
                this.$axios.get(`/blog/list_all?curPage=${curPage}&limit=${limit}`)
                .then((res)=>{
                    if(res.data.data != ''){
                        that.curPage++;
                    }else{
                        that.curPage = -1
                    }
                    let  i = 0;
                    showFall();
                    function showFall(){
                        if(i>=res.data.data.length){
                            return;
                        }
                        let origin = that.$refs.first.offsetHeight<=that.$refs.second.offsetHeight?that.$refs.first:that.$refs.second;
                        let final = origin.offsetHeight<=that.$refs.third.offsetHeight?origin:that.$refs.third;
                        for(let v in that.$refs){
                            if(that.$refs[v] == final){
                                if(v == 'first'){
                                    that.blogList[0].push(res.data.data[i]);
                                }else if(v == 'second'){
                                    that.blogList[1].push(res.data.data[i]);
                                }else{
                                    that.blogList[2].push(res.data.data[i]);
                                }
                            }
                        }
                        i++;
                        that.$nextTick(()=>{showFall()})
                    }
                })
            }
        },
        checkPWD(){
            if(this.PWD != '1212'){ 
                this.$Message({message:'密码错误~~',type:'warning'});
                this.PWD = ""
            }else{
                this.save();
                this.confirmPWD = false;
            }
        },
        save(){
            let that = this;
            this.$axios.post('/blog/save',{userName:this.name,content:this.content})
            .then((res)=>{
                that.$Message({message:'上传成功',type:'success'});
                that.writing = false;
                that.getData(true);
            })
        },
        scrolls(){
            if($(window).height() - $(window).scrollTop() < 500+150){
                this.getList(this.curPage,this.limit)
            }
            // if(document.documentElement.scrollHeight < document.documentElement.clientHeight){
            //         this.getList(this.curPage,this.limit);
            // }
        },
    },
    }
</script>
<style lang='less' scoped>
// #particles-js {
//   position: absolute;
//   width: 100%;
// //   height: 100%;
// top:0;
// bottom: 0;
// }
.content{
    // padding-top: 80vh;
}
.list-enter,.list-leave-to{
    opacity: 0;
    transform: translateX(-50%);
}
.list-enter-active,.list-leave-active{
    transition: all .3s;
}
.write-enter,.write-leave-to{
    transform: translateX(50%);
    opacity: 0;
}
.write-enter-active,.write-leave-active{
    transition: all .3s;
}
.content{
        padding-top: 20px;
    }
.writeBlog{
    z-index: 9999;
    margin: 0;
    height: 40px;
    transition: all .3s;
    margin-bottom: 10px;
    span{
        cursor:pointer;
        display: inline-block;
        border-radius: 30px;
        position: absolute;
        right: 0;
        transition: all .3s;
        box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.12);
        padding: 4px 8px;
        overflow: hidden;
        &::before{
            content:'';
            border-radius: 30px;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            transition: all .5s ease-in-out;
            z-index: -1;
            transform: translateX(-100%);
        }
        &:hover{
            &::before{
                transform: translateX(0%);
                background-color: darken(red,10%);
            }
            color: ghostwhite; 
        }
    }
}
.writing{
    position: absolute;
    width: 100%;
    top: 40px;  
    left: 0;
    right: 0;
    margin: auto;
    .wrtingBlock{
        padding: 10px;
        text-align: center;
        span{
            display: inline-block;
            text-align: right;
            margin-right: 30px;
            width: 20%;
        }
    }
    .backs{
        position: absolute;
        bottom: 0;
        left: 5%;
        z-index: 2;
        img{
            width: 50px
        }
    }
}
.pubu{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: flex-start;
    font-size: 14px; 
    &>div{
        width: 32%;
        display: flex;
        flex-direction: column;
        &>div{
            position: relative;
            transition: all .2s;
            margin-bottom: 10px;
            &:hover{
                box-shadow: 0 2px 10px rgba(0, 0, 0, .22);
            }
        }
    }
}
@media screen and (max-width: 900px) {
    .pubu{
        flex-wrap: wrap;
        &>div{
        width: 90%;
        // display: flex;
        // flex-direction: column;
            &>div{
                position: relative;
                transition: all .2s;
                margin-bottom: 10px;
                &:hover{
                    box-shadow: 0 2px 10px rgba(0, 0, 0, .22);
                }
            }
        }
    }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  /* background: #535353; */
  background: #ededed !important;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  /* background: #ededed; */
  background: black !important;
}
</style>