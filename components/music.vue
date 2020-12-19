<template>
    <div id="alls">
        <transition name="fade">
            <div id="list" v-if="listShow">
                <div class="backs"></div>
                <div class="songList">
                    <div v-for="(item,index) in list" :key="index" class="listBlock" @click="changeSong(index)" :style="{'background-color':indexSong==index?'rgba(0,0,0,.3)':''}">
                        <span class="name" :title="item.name">{{item.name}}</span>
                        <span class="singer" :title='item.singer'>{{item.singer}}</span>
                    </div>
                </div>
            </div>
        </transition>
        <div id="box">
            <div class="backs"></div>
            <audio src="" id="dMusic" autoplay='false'></audio>
            <div class="name">
                {{name}}---{{singer}}
            </div>
            <div class="mPic">
                <img :src="img" draggable="false" class="rotate" alt="">
            </div>
            <div class="prosess">
                    <span class="now" @click="changeTime($event)"></span>
                    <span id="total" class="total" @click="changeTime($event)">{{totalPro}}</span>
            </div>
            <div class="control">
                <span>{{nowTime | times}}</span>
                <span>{{totalTime | times}}</span>
                <span class="cs" title="上一曲" @click="preSong"><</span>
                <span class="cs" >
                    <span v-if="pause" @click="open"> play </span>
                    <span v-else @click="pausex" title="暂停"> || </span>
                </span>
                <span class="cs" @click="nextSong" title="下一曲">></span>
                <span class="cs" :style="{'color':repeat==true?'red':''}" @click="repeatSong">循环</span>
                <span @click="lookList" style="cursor:pointer">查看列表</span>
            </div>
        </div>
        <div class="small-player">
            <span v-if="pause" @click="open" class="play-img"></span>
            <span v-else         @click='pausex' class="pause-img"></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listShow:false,
            name:'',
            singer:'',
            indexSong:0,
            img:'',
            dMusic:'',
            nowTime:'',
            totalTime:'', 
            totalPro:'',        
            pause:true,
            repeat:false,
            list:[
                {name:'Union',singer:'Her',src:('/music/Union.mp3'),img:('/img/Union.jpg')},
                {name:'鱼',singer:'陈绮贞',src:('/music/鱼.mp3'),img:('/img/鱼.jpg')},
                // {name:'Lay It Down Slow',singer:'毛骗',src:('/music/Lay It Down Slow.mp3'),img:'/img/LayItDownSlow.jpg'},
                {name:'未签收',singer:'谢霆锋',src:('/music/未签收.mp3'),img:('/img/未签收.jpg')},
                // {name:'A Winter Story',singer:'麗美',src:('/music/A Winter Story.mp3'),img:'/img/AWinterStory.jpg'},
            ]
        }
    },
    mounted() {
        let that = this;
        setTimeout(() => {
            this.dMusic = document.getElementById('dMusic');
            this.dMusic.oncanplay  = function(e){
                that.totalTime = Math.floor(that.dMusic.duration);
            }
            this.dMusic.ontimeupdate = function(e){
                that.nowTime = Math.floor(that.dMusic.currentTime);
                let per = that.nowTime/that.totalTime;
                $('.prosess .now').css('width',per*100+'%')
            }
            this.dMusic.onended = function(e){
                that.nextSong();
            }
            this.dMusic.src=this.list[0].src;
            this.name = this.list[0].name;
            this.singer = this.list[0].singer;
            this.indexSong =0;
            this.img = this.list[0].img;
            this.pause = true;
            $('#box .backs').css("background-image","url("+this.list[0].img+")");
            $('#list .backs').css("background-image","url("+this.list[0].img+")");
            // that.changeSong(0);
            this.open();
        }, 0);
    },
    methods: {
        preSong(){
            if(this.indexSong == 0){
                this.indexSong = this.list.length-1;
            }else{
                this.indexSong--;
            }
            this.changeSong(this.indexSong);
        },
        nextSong(){
            if(this.indexSong == this.list.length-1){
                this.indexSong =0;
            }else{
                this.indexSong++;
            }
            this.changeSong(this.indexSong);
        },
        lookList(){
            this.listShow = !this.listShow;
            setTimeout(() => {
                $('#list .backs').css("background-image","url("+this.list[this.indexSong].img+")");
            }, 0);
        },
        changeTime(e){
            if(e.target.getAttribute('id') == 'total'){
                let nowTimex = e.offsetX;
                let totalTimex = e.target.offsetWidth;
                let per = nowTimex/totalTimex;
                this.dMusic.currentTime = this.totalTime*per;
            }else{
                //now
                let nowTimex = e.offsetX;
                let totalTimex = e.target.parentElement.offsetWidth;
                let per = nowTimex/totalTimex;
                this.dMusic.currentTime = this.totalTime*per;
            }
        },
        pausex(){
            this.dMusic.pause();
            this.pause=true
        },
        open(){
            let that = this;
            let autoPlay = true;
            var cho = navigator.userAgent.substr(navigator.userAgent.indexOf("Chrome"), 9);
            var chos = cho.split("/");
            if (chos[1] >= 66 ) {
                autoPlay = false;
            }
            if(!autoPlay){
                window.addEventListener('click',function e(){
                    that.dMusic.play();
                    that.pause=false;
                    window.removeEventListener('click',e);
                })
            }else{
                this.dMusic.play();
                this.pause=false
            }
        },
        changeSong(index){
            this.dMusic.src = this.list[index].src;
            this.name = this.list[index].name;
            this.singer = this.list[index].singer;
            this.indexSong =index;
            this.img = this.list[index].img;
            this.dMusic.play();
            this.pause = false;
            $('#box .backs').css("background-image","url("+this.list[index].img+")");
            $('#list .backs').css("background-image","url("+this.list[index].img+")");
        },
        repeatSong(){
            if(this.repeat == true){
                this.dMusic.loop =  false;
            }else{
                this.dMusic.loop = true
            }
            this.repeat = !this.repeat
        },
    },
    filters:{
        times(val){
            if(val<60){
                if(val<10){
                    return `00:0${val}`
                }else{
                    return `00:${val}`
                }
            }else{
                let mins = Math.floor(val/60);
                let sec = val%60;
                    if(mins < 10){
                        if(sec<10){
                            return `0${mins}:0${sec}`;
                        }else{
                            return `0${mins}:${sec}`;
                        }
                    }else{
                        if(sec<10){
                            return `${mins}:0${sec}`;
                        }else{
                            return `${mins}:${sec}`;
                        }
                    }
            }
        }
    }
}
</script>


<style lang="less" scoped>
@keyframes rotate {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
}
@width:180px;
@height:@width;
.fade-enter-active,.fade-leave-active{
    transition: all .4s;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
    transform: translateX(50%)
}
.rotate{
    animation: rotate 25s infinite linear;
    &:hover{
        animation-play-state:paused;
    }
}
#alls{
    display: flex;
    justify-content: center;
    position: fixed;
    right: 0;
    z-index: 1;
}
.small-player{
    position: fixed;
    bottom: 5%;
    right: 2%;
    span{
        width: 30px;
        height: 30px;
        background-color: gray;
        border-radius: 50%;
        position: relative;
        display: none; 
        &::after{
            content:'';
            width: 40px;
            height: 40px;
            position: absolute;
            left: -4.8px;
            top: -5px;
            box-shadow:0 0 5px 2px rgba(0, 0, 0, .42);
            z-index: -1;
            border-radius: 50%;

        }
    }
    .play-img{
        background:gray url(/img/play.png) no-repeat center/contain;
    }
    .pause-img{
        background:gray url(/img/pause.png) no-repeat center/60% 64%;
    }
}
#box{
    z-index: 2;
    overflow: hidden;
    position: relative;
    width: @width;
    height: @height;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, .12);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .backs{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        filter: blur(20px);
        z-index: -1;
    }
    .name{
        padding: 10px;
        font-size: 14px;
        text-align: center;
    }
    .mPic{
        width: 60%;
        height: 60%;   
        margin: 0 auto;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%
        }
    }
    .prosess{
        position: relative;
        width: 100%;
        height: 5px;
        .total{
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: block;
            background-color: rgba(0, 0, 0, .1);
        }
        .now{
            cursor: pointer;
            height: 100%;
            background:linear-gradient(45deg,#FFB95E ,#FCA661 ,#FCA362 ,#FA8F66,#F5736B ,#F35C70 );
            z-index: 1;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .control{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        .cs{
            cursor: pointer;
        }
    }
}

#list{
    position: relative;
    width: @width;
    height: @height;
    overflow: hidden;
    .backs{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        filter: blur(10px);
        z-index: -1;
    }
    .songList{
        &>div{
            padding: 10px;
            cursor: pointer;
            transition: all .3s;
            overflow-y: auto;
            &:hover{
                background-color: rgba(220, 220, 220, 0.438)
            }
            .name{
                width: 60%;
                display: inline-block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .singer{
                display: inline-block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
@media screen and (max-width: 900px) {
    #box{
        width: 0;
        height: 0;
        opacity: 0;
    }
    .small-player span{
        display: block !important;
    }
}
</style>