<template>
    <div class="">
        <p style='display:flex;align-items:center'>
                <span style='width:80px'>评论：</span>
                <el-input v-model='content' style='flex:2;margin-right:10px' size='small'></el-input>
            </p>
            <p style='display:flex;align-items:center'>
                <span  style='width:80px'>你的昵称：</span>
                <el-input v-model='userName' style='flex:2;margin-right:10px' size='small'></el-input>
                <el-button size='small' type='warning' round  @click='confirm'>确认</el-button>
            </p>
            <p v-if="datas.length == 0" style='text-align:center'>做第一个评论者吧~~~</p>
            <div v-else>
                    <div  v-for='(item,index) in datas' style='display:flex;padding:10px 0 20px;position:relative'>
                        <img :src='"img/people/"+(item.remark || Math.ceil(Math.random()*16))+".png"'  style='width:40px;height:40px;border-radius:50%;padding:10px'>
                        <div style='display:flex;flex-direction:column;position:relative;top:8px;border-bottom:1px solid gainsboro;flex:2;position:relative'>
                            <p style='color:gray'>{{item.userName}}</p>
                            <p style='color:black'>{{item.content}}</p>
                            <p style='color:gray;font-size:12px'>{{item.gmtCreate}}</p>
                            <div style='text-align:right;height:10px;position:relative;top:-27px'>
                                <img style='width:20px;cursor:pointer' @click="reply(item)"  :src="replyIMG" title="回复">
                            </div>

                            <div v-if='item.subset' style='background-color:rgba(0,0,0,.1);margin-bottom:10px'>
                                <div  v-for='(itemx,indexx) in item.subset' style='display:flex;padding:10px 0 20px;position:relative'>
                                    <img :src='"img/people/"+(item.remark || Math.ceil(Math.random()*16))+".png"' style='width:40px;height:40px;border-radius:50%;padding:10px'>
                                    <div style='display:flex;flex-direction:column;position:relative;top:8px;flex:2;position:relative'> 
                                        <p style='color:gray'>{{itemx.userName}}</p>
                                        <p style='color:black'>{{itemx.content}}</p>
                                        <p style='color:gray;font-size:12px'>{{itemx.gmtCreate}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
</template>

<script>

export default {
    props:['datas','blogId'],
    components: {},
    data() {
        return {
            content:'',
            userName:'',
            id:'',
            imgs:['/img/1.jpg','/img/2.jpg','/img/3.jpg'],
            replyName:'',
            replyIMG:require('../static/img/comment.png')
        };
    },
    computed: {
        isBlog(){
            return this.blogId ? true : false
        }
    },
    methods: {
        reply(item){
            // this.id = item.id;
            this.content = `回复 ${item.userName} :`;
            this.replyName = item.userName;
        },
        confirm(){
            let that = this,rContent='';
            let parentId='' ;
            if(this.content[0] == '回'){
                rContent = this.content.split(`回复 ${this.replyName} :`)[1];
                parentId = this.datas.find(item=>item.userName == that.replyName).id;
            }else{
                rContent=this.content;
            }
            this.$axios.post('/comment/save',{parentId,remark:Math.ceil(Math.random()*16),content:rContent,userName:this.userName,blogId:this.blogId}).then(res=>{
                that.$message({type:'success',message:'评论成功！'});
                that.$parent.$parent.commentShow = false;
                that.$parent.commentShow = true;
                that.id='';
                that.content = '';
                that.userName = '';
            })
        }
    },
    mounted() {},
    }
</script>
<style lang='less' scoped>
</style>