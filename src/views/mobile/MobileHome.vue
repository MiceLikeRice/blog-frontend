<template>
    <div class="home">
        <div class="font-size" style="display:flex;align-items:center;">
            <span style="font-size:14px">font size</span>
            <el-radio-group v-model="font_size" style="margin-left:auto;width:180px;"
            @input="changeFontSize"
            >
                <el-radio :label="9">小号</el-radio>
                <el-radio :label="11">中号</el-radio>
                <el-radio :label="13">大号</el-radio>
            </el-radio-group>
        </div>
        <div style="width:100%;font-size:16px;">
            <div style="float:left;margin-left:28px;color:grey">title</div>
            <div style="float:right;color:grey">upload date</div>
            <div style="clear:both"></div>
        </div>
        <div class="blog-list" v-for="(blog,index) in blog_list" :key="index"
        @click="navigateToBlog(blog.blog_id)"
        >   
            <div style="display:flex;align-items:center;">
            <img style="width:25px;height:25px;margin:0 10px;" src="/blogger.png"/>
            <div class="title"><div
                style="
                white-space: wrap; 
                display: block;
                width:100%;
                "
                :style="{fontSize:1.5*font_size+'px'}"
                >
                {{blog.title}}</div>
                <div
                style="white-space: wrap; 
                display: block;
                width:100%;
                color:#0c2c36cf"
                :style="{fontSize:font_size+'px'}"
                >
                {{blog.outline}}</div>
            </div>
            </div>
            <div class="upload-date">
                <div>{{formatDate(blog.upload_date)}}</div>
            </div>
        </div>
        <el-pagination
        background
        layout="prev, pager, next"
        :total="blog_count"
        :current-page="page"
        :page-size="10"
        @current-change="refresh"
        >
      </el-pagination>
    </div>
</template>

<script>
    import request from "@/utils/request.js"
    import { Loading } from 'element-ui';
    export default{
        data(){
            return{
                blog_list:[],
                page:1,
                blog_count:0,
                font_size:9,
            }
        },
        mounted() {
            request.get("/blog/allblog")
            .then(response => {
                this.blog_list = response.data
                console.log(this.blog_list);
            })
            request.get("/blog/blogcount")
            .then(response => {
                this.blog_count = response.data.total;
                console.log(this.blog_count);
            })
        },
        methods:{
            changeFontSize(size){
                console.log(this.font_size);
                this.font_size=size;
            },
            async refresh(index){
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 可以使滚动过渡更平滑，不加则是瞬间滚动
                });
                this.page=index;
                let loadingInstance = Loading.service({ fullscreen: true });
                await request.get(`/blog/blogcount`)
                .then(response => {
                    this.blog_count = response.data.total;
                    console.log(this.blog_count);
                })
                let url=`/blog/allblog?page=${this.page}`;
                await request.get(url)
                .then((response)=>{
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                    this.blog_list=response.data;
                })
                .catch((error)=>{
                    console.log(error);
                })
                
            },
            formatDate(isoDate) {

            const date = new Date(isoDate);

            // 月份的英文缩写
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            // 获取年、月和日
            const year = date.getFullYear();
            const month = date.getMonth(); // 0 到 11
            const day = date.getDate();

            // 构建最终的日期格式
            const formattedDate = `${monthNames[month]} ${day}, ${year}`;
            return formattedDate;
            },
            navigateToBlog(id) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 可以使滚动过渡更平滑，不加则是瞬间滚动
                });
                console.log("dad")
                request.put("blog/read/"+id)
                    .then((response)=>{
                        console.log(response);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                this.$router.push({
                    path: "/mobile/blog",
                    query: {
                        blogId: id, // 传递博客的唯一标识符或其他数据
                        // 添加其他需要传递的数据
                    }
                });
            }
        }
    }
</script>
<style>
.upload-date div{
    display:flex;
    align-items:center;
    justify-content:center;
    margin-left:auto;
    margin-right:20px;
    line-height:20px;
}
.upload-date{
    width:100%;
    font-size:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
}
.title{
    width:calc(100%);
    margin:0 5px;
    display:flex;
    align-items:center;
    flex-direction:column;
}
.blog-list{
    margin:5px 0;
    background-color:white;
    background-color:#56d2ff6e;
    padding:5px 0px;
    border-radius:5px;
    box-shadow:0 0 5px rgb(170,170,170);
}
.home{
    width:calc(100% - 40px);
    background-color:white;
    min-height: 500px;
    margin:0  auto;
    border-radius:10px;
    box-shadow:0 0 5px rgb(210,210,210);
    padding:10px;
}
</style>