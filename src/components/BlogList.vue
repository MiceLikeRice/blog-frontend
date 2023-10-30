<template>
    <div class="blog-list-container">
        <div style="width:100%;display:flex;">
            <div class="blog-info" :style="{'width':(!image_url?'auto':'80%')}">
                <div class="title" @click="navigateToBlog"><a>{{title}}</a></div>
                <div class="outline">{{outline}}</div>
            </div>
            <div class="blog-image" v-if="image_url">
                <img :src="config.baseURL+'/image/download/'+image_url"/>
            </div>   
        </div> 
        <div style="display:flex;">
            <div class="date">{{date}}</div>
            <div class="view-count"><span style="color='green'; margin-right:5px;">{{view_count}}</span>浏览量  <i class="el-icon-view" style="margin-left:5px;"></i></div>
            <div class="edit"><i class="el-icon-edit" @click="navigateToEdit">编辑</i></div>
            <div class="delete"><i class="el-icon-delete-solid" @click="deleteBlog">删除</i></div>
        </div>
        
    </div>
</template>

<script>
import request from "@/utils/request.js"
import config from "@/config.js"
export default{
    data(){
        return{
            config,
        }
    },
    props:{
        blog_id:Number,
        title:String,
        outline:String,
        view_count:Number,
        date:String,
        image_url:String,
    },
    mounted(){
        console.log(config);
    },
    methods: {
        deleteBlog(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    request.put("blog/delete/"+this.blog_id)
                    .then(()=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch((error)=>{
                        console.log(error);
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    })
                    this.$emit("refresh");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        navigateToBlog() {
            request.put("blog/read/"+this.blog_id)
                .then((response)=>{
                    console.log(response);
                })
                .catch((error)=>{
                    console.log(error);
                })
            this.$router.push({
                path: "/blog",
                query: {
                    blogId: this.blog_id, // 传递博客的唯一标识符或其他数据
                    // 添加其他需要传递的数据
                }
            });
        },
        navigateToEdit() {
            this.$router.push({
                path: "/edit",
                query: {
                    blogId: this.blog_id, // 传递博客的唯一标识符或其他数据
                    // 添加其他需要传递的数据
                }
            });
        },
    }
}
</script>

<style>
.blog-info{
    width:80%;
    display:block;
}
.blog-image img{
    width:100%;
}
.blog-image{
    height:160px;
    width:20%;
    align-items:center;
    display:flex;
    justify-content:center;
    overflow:hidden;
}
.view-count :hover{
    text-decoration:underline;
}
.view-count{
    margin-top:40px;
    margin-left:40px;
    font-size:15px;
}
.delete i:hover{
    color:red;
    text-decoration:underline;
}
.delete{
    margin-top:38px;
    margin-left:40px;
    font-size:16px;
    color:rgb(245,108,108);
}
.edit i:hover{
    color:red;
    text-decoration:underline;
}
.edit{
    margin-top:38px;
    margin-left:40px;
    font-size:16px;
    color:rgb(85,139,47);
}
.date{
    margin-top:40px;
    font-size:15px;
}
.outline{
    line-height:33px;
    color:grey;
}
.title a:hover{
    text-decoration:underline;
    color:red;
}
.title{
    font-size:35px;
    font-weight:800;
    line-height:50px
}
.blog-list-container{
    width:1200px;
    padding-top:40px;
}
</style>