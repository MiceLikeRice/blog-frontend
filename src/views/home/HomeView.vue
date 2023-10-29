<template>
    <div style="width:100%">
        <blog-list v-for="(blog, index) in blog_list" :key="index" 
        :title="blog.title"
        :outline="blog.outline"
        :date="formatDate(blog.upload_date)"
        :view_count="blog.view_count"
        :image_url="blog.cover_image"
        :blog_id="blog.blog_id"
        @refresh="refresh(current_page)"
        />
        <el-pagination
        background
        layout="prev, pager, next"
        :total="blog_count"
        :current-page="current_page"
        :page-size="10"
        @current-change="refresh"
        >
      </el-pagination>
    </div>
</template>

<script>
import BlogList from "@/components/BlogList.vue"
import request from "@/utils/request.js"
export default {
    components: {
        BlogList
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
    methods: {
            refresh(index){
                request.get("/blog/blogcount")
                .then(response => {
                    this.blog_count = response.data.total;
                    console.log(this.blog_count);
                }),
                console.log("index:",            {
                    page:index
                });
                request.get("/blog/allblog?page=" + index)
                .then(response => {
                    this.blog_list = response.data
                    console.log(this.blog_list);
                })
                .catch(error=>console.log(error));
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
        }
    },
    data() {
        return {
            blog_list: [],
            blog_count:0,
            current_page:1,
        }
    }
}
</script>
<style>
.el-pagination{
    margin-top:20px;
    margin-bottom:20px
}
</style>