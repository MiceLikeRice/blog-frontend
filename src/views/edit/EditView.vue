<template>
    <div class="markdown">
      
      <MarkdownPro  
        :value="markdown_content" 
        :height="markdownProHeight" 
        @on-save="handleSave"
        :autoSave="true"
        :interval="1000"
      />
      <div class="function" v-if="this.$route.query.blogId">
        <i class="el-icon-folder-opened" @click="updateMarkdown" style="font-size: 30px;"></i>
      </div>
      <div class="save" @click="save">
        <i class="el-icon-folder-opened" style="font-size: 30px;"></i> 
      </div>
      <div class="upload-image" @click="uploadImage">
        <i class="el-icon-picture-outline-round" style="font-size: 30px;"></i>
      </div>
      <el-dialog :visible.sync="dialogVisible" title="save Blog">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="outline">
            <el-input v-model="formData.outline"></el-input>
          </el-form-item>
          <span style="margin-left:50px;">cover</span>
          <el-upload style="margin-left:100px"
            class="upload-demo"
            drag
            :on-success="coverhandleUploadSuccess"
            :action="config.baseURL+'/image/uploadImage'"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <span style="margin-left:50px;">categry</span>
          <el-dropdown style="margin-left:100px;margin-top:40px;" @command="(command)=>selected_type=command">
            <span class="el-dropdown-link">
              {{selected_type}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in categries" :key="index" :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="saveMarkdown" v-if="!this.$route.query.blogId">保存</el-button>
          <el-button type="primary" @click="updateMarkdown" v-if="this.$route.query.blogId">修改</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-upload
          class="upload-demo"
          :action="config.baseURL+'/image/uploadImage'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="handleSuccess"
          :on-error="handleError"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb。上传成功后，点击对应图片即可复制图片的地址。</div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>
  
<script>
  import MarkdownPro from 'vue-meditor';
  import request from "@/utils/request.js";
  import config from "@/config.js"
   /* eslint-disable */
  export default {
    components: {
      MarkdownPro
    },
    data() {
      return {
        config,
        markdownProHeight: window.innerHeight, // 初始高度为屏幕高度
        function_open:false,
        dialogVisible: false,
        centerDialogVisible:false,
        fileList: [],
        formData: {
          title: '',
          outline: '',
          content_type:"",
          cover_image:""
        },
        categries:[
          "文献精读",
          "技术",
          "随笔",
          "英文",
          "课堂笔记"
        ],
        selected_type:'技术',
        markdown_content:''
      };
    },
    methods: {
      updateMarkdown(){
        if(this.formData.title.length<10||this.formData.outline<10){
          this.$message("题目或者介绍不能少于10个字","error")
          return;
        }
        if(this.markdown_content<10){
          this.$message("blog不能少于10个字","error")
          return;
        }
        console.log(this.markdown_content);
        this.centerDialogVisible = false;
        const blog={
          title: this.formData.title,
          outline: this.formData.outline,
          content_type:this.selected_type,
          author:"Matthew",
          body:this.markdown_content,
          cover_image:this.formData.cover_image
        }
        request.put("/blog/update/"+this.$route.query.blogId,blog)
        .then(response=>{
            console.log(response)
            this.$message({
              message: '修改成功',
              type: 'success'
            });
        })
        .catch((error)=>{
          console.log(error);
        })
      },
      saveMarkdown(){
        if(this.formData.title.length<10||this.formData.outline<10){
          this.$message("题目或者介绍不能少于10个字","error")
          return;
        }
        if(this.markdown_content<10){
          this.$message("blog不能少于10个字","error")
          return;
        }
        console.log(this.markdown_content);
        this.centerDialogVisible = false;
        const blog={
          title: this.formData.title,
          outline: this.formData.outline,
          content_type:this.selected_type,
          author:"Matthew",
          body:this.markdown_content,
          cover_image:this.formData.cover_image
        }
        request.post("/blog/create",blog)
        .then(response=>{
            console.log(response.data)
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.navigateToEdit(response.data.blog_id);
        })
        .catch((error)=>{
          console.log(error);

        })
      },  
      handleSuccess(response, file, fileList) {
      // 上传成功时的处理
        console.log(response);
        file.name=response.fileName;
        console.log('上传成功:', response);
      },
      coverhandleUploadSuccess(response, file, fileList){
        this.formData.cover_image=response.fileName;
        console.log('上传成功:', response);
      },
      handleError(error, file, fileList) {
        // 上传失败时的处理
        console.log(response);
        console.error('上传失败:', error);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        const fileName = config.baseURL+"/image/download/"+file.name;

        // 创建一个临时的<textarea>元素以便复制文本
        const textArea = document.createElement('textarea');
        textArea.value = fileName;
        document.body.appendChild(textArea);

        // 选择文本内容
        textArea.select();

        try {
          // 尝试将文本复制到剪贴板
          document.execCommand('copy');
          this.$message({
            message: '已成功复制到剪贴板',
            type: 'success'
          });
        } catch (err) {
          this.$message({
            message: '复制失败',
            type: 'error'
          });
        }

        // 删除临时<textarea>元素
        document.body.removeChild(textArea);
      },
      navigateToEdit(id) {
            this.$router.push({
                path: "/edit",
                query: {
                    blogId: id, // 传递博客的唯一标识符或其他数据
                    // 添加其他需要传递的数据
                }
            });
      },
      uploadImage(){
        this.centerDialogVisible=true;
      },
      openDialog() {
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      saveBlog() {
      // 在这里处理保存操作，访问 formData 对象来获取表单字段的值
      this.$message({
        type: 'success',
        message: '已保存 Blog：' + this.formData.title
      });
        this.dialogVisible = false;
      },
      save(){
        this.openDialog();
      },
      handleSave(data) {
        // data 包含当前输入值 value 和选择的代码块主题 theme
        const { value, theme } = data;
        this.markdown_content=value;
        // 执行保存操作，例如将内容发送到服务器保存
        console.log("Markdown内容：", value);
        // console.log("选择的代码块主题：", theme);
        // request.post("/blog/upload",{md_content:value})
        // .then(response=>{
        //     console.log(response.data)
        // })
        // 在这里执行保存操作，可以将value发送到服务器或者本地存储
      },
      setMarkdownProHeight() {
        this.markdownProHeight = window.innerHeight;
      },
    },
    mounted() {

      // 获取用户代理字符串
      const userAgent = navigator.userAgent;

      // 判断是否是移动设备
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      if (isMobileDevice) {
        // 如果是移动设备，跳转到移动设备页面
        window.location.href = '/mobile'; // 请替换为实际的移动设备页面URL
      }
      

      window.addEventListener('resize', this.setMarkdownProHeight); // 监听窗口大小变化
      if(this.$route.query.blogId){
        request.get("/blog/"+this.$route.query.blogId)
            .then(response=>{
            this.markdown_content=response.data.body;
            this.formData.title=response.data.title,
            this.formData.outline=response.data.outline,
            this.selected_type=response.data.content_type,
            this.formData.cover_image=response.data.cover_image
        })
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setMarkdownProHeight); // 移除窗口大小变化监听
    },
  };
  </script>
<style>

.upload-image>i{
  margin:15px
}
.upload-image{
  position:fixed;
  height:60px;
  width:60px;
  background-color:#409EFF;
  z-index:9999999;
  right:40px;
  bottom:280px;
  border-radius:50%;
  box-shadow:2px 2px 20px grey;
}
.save>i{
  margin:15px
}
.save{
  position:fixed;
  height:60px;
  width:60px;
  background-color:green;
  z-index:9999999;
  right:40px;
  bottom:190px;
  border-radius:50%;
  box-shadow:2px 2px 20px grey;
}
.function>i{
    margin:15px
}
.function{
    position:fixed;
    height:60px;
    width:60px;
    background-color:white;
    z-index:9999999;
    right:40px;
    bottom:100px;
    border-radius:50%;
    box-shadow:2px 2px 20px grey;
}
.markdown-preview{
    background:#bcbcbc !important;
}
.markdown-preview>div{
    background:#bcbcbc !important;
}
</style>