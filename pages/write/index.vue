<template> 
  <div class="mavonEditor content">
      <div class="top-word">Write Something
          <span class="save-buttom">
              <el-button size='small' type="warning" @click="save">保存</el-button>
          </span>
      </div>
      <el-form :model='articleData' 
      :rules='rules'
      ref="articleForm"
      label-width="100px" class="form" label-position="top">
          <el-form-item  label='标题'  prop='title'>
              <el-input v-model="articleData.title"></el-input>
          </el-form-item>

          <el-form-item  label='摘要'>
              <el-input v-model="articleData.abstracts"></el-input>
          </el-form-item>

          <el-form-item  label='标签'>
              <el-input v-model="articleData.label"></el-input>
          </el-form-item>
      </el-form>



    <no-ssr>
        <p>内容</p>
      <mavon-editor 
      ref='md'
      @imgAdd="imgAdd"
      :toolbars="markdownOption" 
      @change="mdChange"
      v-model="value"/>
    </no-ssr>

    <!-- <div class="display-md">
        <template v-for='item in list' >
            <div v-html="item.render"></div>
        </template>
    </div> -->
  </div>
</template>
<script>
import axiosImg from 'axios'
const instance = axiosImg.create({
    timeout:50000
});

export default {
  data() {
    return {
        addUrl:'https://api.wmelon.cn/api/upload',
        articleData:{
            title:"",
            abstracts:"",
            label:"",
            content:""
        },
        rules:{
            title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
            ],
        },
        list:[
            {
                render:'',
                value:'',
            }
            ],
      markdownOption: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: true, // 预览
      },
      value: "#### Nice to meet you",
      render:'',
    };
  },
  methods: {
        imgAdd(pos, $file){
            // 将图片上传到服务器.
            let _this = this;
            var formdata = new FormData();
            formdata.append('file', $file);
            instance({
                url: this.addUrl,
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                if(res.data.code != 0){
                    _this.$message.danger('暂时无法上传图片'); 
                    return;
                }
                _this.$refs.md.$img2Url(pos, res.data.msg);
            }).catch(err=>{
                console.log(err);
            })
        },
        mdChange(value,render){
            this.value = value;
            this.render = render;
        },
        async save(){
            let data = Object.assign({},this.articleData,{remark:this.value,content:this.render})
            let res = await this.$axios.post('/article/save',data); 
            if(res){
                this.$message.success('上传成功');
                this.$router.push('/article');
            }
        }
  },
};
</script>

<style lang='less' scoped>
.mavonEditor {
  height: 100%;
  padding-bottom: 30px;
}
.form{
    margin-top: 30px;
    /deep/.el-input__inner{
        width: 40%;
    }
}
.save-buttom{
    position: absolute;
    right: 0;
}
</style>