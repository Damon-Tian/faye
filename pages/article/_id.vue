<template>
    <div class="content article">
        <h2>{{article.title}}</h2>
        <p class="time">
            <span>{{getArticleTime(article.gmtCreate)}}</span>
            <span class="comment" @click='goComment'>{{commentLength}}</span>
            <span class="like">
                <svg  t="1596810446730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7861" width="200" height="200"><path d="M524.1 171.66c-110.22-11.72-165.6 98.16-165.6 98.16s-94.89-78.33-191.09-23.26S4.8 449.48 147.14 606.6c142.34 157.11 315.27 158.04 315.27 158.04s157.95-70.41 225.07-271.5c67.12-201.1-53.16-309.76-163.38-321.48z" fill="#C53938" p-id="7862"></path><path d="M887.36 476.37c-72.82-48.51-151.74 8.1-151.74 8.1s-37.73-89.5-125.17-86.17-187.98 82.47-145.87 244.44 162.74 225.87 162.74 225.87 136.25 8.52 256.75-107.6c120.5-116.13 76.11-236.13 3.29-284.64z" fill="#F5E5E5" p-id="7863"></path></svg>
                2</span>
        </p>


        <div class="article-content" v-html="article.content"></div>

        <div id="comment-block" class="comment-block">
            <input type="text" v-model="name" placeholder="Name" class="comment-input comment-name" />
            <div class="comment-content">
                <textarea type="textarea" v-model="content" rows=10 placeholder="Say What You Want To Say"  class="comment-input"></textarea>
                <div class="fruit">
                    <img :src="'/img/fruit/'+item+'.png'" v-for="item in fruit" alt="">
                </div>
            </div>
            <div style="text-align:left">
                <el-button type='danger' size='small' @click="confirmComment" class="comment-confirm">提交</el-button>
            </div>
        </div>

        <div id="commented" style="width:100%;height:0px;"></div>
        <div class="commented"  v-for='(item,index) in commentDatas' :key="item.id" style='display:flex;padding:10px 0 20px;position:relative'>
            <img :src='"/img/people/"+item.remark+".png"'  style='width:40px;height:40px;border-radius:50%;padding:10px'>
            <div style='display:flex;flex-direction:column;position:relative;top:8px;border-bottom:1px solid gainsboro;flex:2;position:relative'>
                <p style='color:gray'>{{item.userName}}</p>
                <p style='color:black'>{{item.content}}</p>
                <p style='color:gray;font-size:12px'>{{item.gmtCreate}}</p>
                <div style='text-align:right;height:10px;position:relative;top:-27px'>
                    <img style='width:20px;cursor:pointer' @click="reply(item)"  src="/img/comment.png" title="回复" alt="">
                </div>

                <div v-if='item.subset' style='background-color:rgba(0,0,0,.02);margin-bottom:10px;box-shadow:0 0 10px 2px rgba(0,0,0,0.12)'>
                    <div  v-for='(itemx,indexx) in item.subset.slice()' :key='itemx.id' style='display:flex;padding:10px 0 20px;position:relative;'>
                        <img :src='"/img/people/"+itemx.remark+".png"' style='width:40px;height:40px;border-radius:50%;padding:10px'>
                        <div style='display:flex;flex-direction:column;position:relative;top:8px;flex:2;position:relative;'> 
                            <p style='color:gray'>{{itemx.userName}}</p>
                            <p style='color:black'>{{itemx.content}}</p>
                            <p style='color:gray;font-size:12px'>{{itemx.gmtCreate}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {get} from '~/axios/axios.js'
import {getArticleTime} from '~/util/index.js'
export default {
    async asyncData(context){
        let id = context.params.id;
        let x = await get(`/article/info/`+id);
        return {article:x.data.data};
    },
    components: {},
    data() {
        return {
            article:"",
            commentLength:0,
            content:"",
            name:"",
            commentDatas:[],
            fruit:[Math.ceil(Math.random()*10),Math.ceil(Math.random()*10),Math.ceil(Math.random()*10),Math.ceil(Math.random()*10)]
        };
    },
    methods: {
        goComment(){
            $("body,html").animate({scrollTop:$("#commented").offset().top-'50'})  
        },
        reply(item){
            this.content = `回复 ${item.userName} ：`;
            this.replyName = item.userName;
            $("body,html").animate({scrollTop:$("#comment-block").offset().top-'100'});
            $('#content').focus();
        },
        getArticleTime(time){
            return getArticleTime(time);
        },
        async getComment(){
            let datas  = await this.$axios.get('/comment/list_all?blogId='+this.article.id+"&type=ARTICLE",{blogId:this.article.id,type:'ARTICLE'});
            this.commentDatas = datas.data.data.slice();
            this.commentLength = datas.data.data.length;
        },
        confirmComment(){
            let that = this,rContent='';
            let parentId='' ;
            if(this.content[0] == '回'){
                rContent = this.content.split(`回复 ${this.replyName} ：`)[1];
                parentId = this.commentDatas.find(item=>item.userName == that.replyName).id;
            }else{
                rContent=this.content;
            }
            if(!rContent){
                that.$message.info('请输入内容');
                this.content = '';
                return;
            }
            this.$axios.post('/comment/save',{type:'ARTICLE',parentId,remark:Math.ceil(Math.random()*16),content:rContent,userName:this.name,blogId:this.article.id}).then(res=>{
                that.$message.success('评论成功！');
                that.name = '';
                that.content = '';
                that.getComment();
            })
        }
    },
    mounted() {
        let imgs = $('.article-content')[0].querySelectorAll('img');
        imgs.forEach(item=>{
            $(item).addClass('maxWidth')
            item.style.maxWidth = '100%';
        })
        this.getComment();
    },
    }
</script>
<style lang='less' scoped>
.article-content{
    min-height: 80vh;
    line-height: 36px;
    font-size: 16px;
    color:rgb(36, 41, 46);
    @media screen and (max-width:800px) {
        line-height: 28px;
        font-size: 14px;
    }
    .maxWidth{
        max-width: 100%
    }
}
.time{
    // color: rgb(122, 85, 85);
    color: #d89191;
    font-size: 0.7em;
    text-align: right;
    span{
        display: inline-block;
        padding-right: 15px;
    }
    .comment{
        position: relative;
        margin-left: 40px;
        &::before{
            content:'';
            width: 22px;
            height: 22px;
            background: url('/img/comment.png') no-repeat center/contain;
            position: absolute;
            transform: translateX(-120%);
            cursor: pointer;
            bottom: 1px;
        }
        opacity: .7;
        &:hover{
            opacity: 1;
        }
    }
    .like{
        svg{
            width:30px;
            height: 30px; 
            position: relative;
            top: 10px;
            cursor: pointer;
            opacity: .7;
            &:hover{
                opacity: 1;
            }
        }
    }
}
.article{
    max-width: 800px;
    width: 60%;
}
img{
    max-width: 100%;
    width: 100%;
}
.comment-block{
    margin: 50px 0 ;
    position: relative;
    .comment-input{
        border: 1px dashed rgba(0, 0, 0, .12);
        border-radius: 3px;
        outline: none;
        padding: 10px;
        transition: all .5s;
        width: 100%;
        box-sizing: border-box;
        &:focus{
            border-color:fadein(rgba(0, 0, 0, .12),20%)
        }
        resize: none;
    }
    .comment-content{
        position: relative;
        .fruit{
            position: absolute;
            right: 0;
            bottom: 6px;
            img{
                width: 30px;
                height: 30px;
            }
        }
    }
    .comment-name{
        margin-bottom: 20px
    }
    .comment-confirm{
        // width: 40px;
        // cursor: pointer;
        // height: 5px;
        // position: absolute;
        // right: 0;
    }
    input::-webkit-input-placeholder{
        color:@red;
        font-size: 0.8em
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:@red;
        font-size: 0.8em
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:@red;
        font-size: 0.8em
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color:@red;
        font-size: 0.8em
    }
    textarea::-webkit-input-placeholder{
        color:@red;
        font-size: 0.8em
    }
    textarea::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:@red;
        font-size: 0.8em
    }
    textarea:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:@red;
        font-size: 0.8em
    }
    textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color:@red;
        font-size: 0.8em
    }
}
@media screen and (max-width:900px) {
    .article{
        width:90%
    }
}
/deep/.hljs-center{
    text-align: center;
}
/deep/.hljs-right{
    text-align: right
}
/deep/h2{
    padding-bottom: .3em;
    font-size: 1.5em;
    border-bottom: 1px solid #eaecef;
}
/deep/p{
    text-indent: 2em
}
/deep/blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: .25em solid #dfe2e5;
}
</style>