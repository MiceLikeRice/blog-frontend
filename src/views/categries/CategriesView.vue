<template>
    <div style="max-width:1200px">
        <div class="tags">
            <div class="tag" v-for="(blog,index) in blogs" :key="index">
                {{ Object.keys(blog)[0] }}
                <span style="color:rgb(51,115,30)"> {{Object.values(blog)[0].length}} </span>
            </div>
        </div>
        <div class="categries-container" v-for="(blog,index) in blogs" :key="index">
            <h1 style="color:rgb(51,115,30)">{{ Object.keys(blog)[0] }}</h1>
            <div class="table" v-for="(item,index) in Object.values(blog)[0]" :key="index">
                <a @click="navigateToBlog(item.blog_id)">
                    <span>{{item.title}}</span>
                    <span>{{item.upload_date}}</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import request from "@/utils/request.js"
export default{
    methods:{
        navigateToBlog(id) {
            this.$router.push({
                path: "/blog",
                query: {
                    blogId: id, // 传递博客的唯一标识符或其他数据
                    // 添加其他需要传递的数据
                }
            });
        },
    },
    mounted(){
        request.get("/blog/allblog")
        .then((response)=>{
            const groupedData = response.data.reduce((result, item) => {
            const { content_type, ...rest } = item;
            if (!result[content_type]) {
                result[content_type] = [];
            }
            result[content_type].push(rest);
            return result;
            }, {});
            this.blogs = Object.entries(groupedData).map(([content_type, value]) => ({
                [content_type]: value
            }));

            console.log(this.blogs);
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    data(){
        return{
            blogs:[],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            categries:[
                {
                    categry:"技术",
                    count:1,
                },
                {
                    categry:"文献精读",
                    count:1,
                },
                {
                    categry:"英文板块",
                    count:1,
                },
                {
                    categry:"随笔",
                    count:1,
                }                
            ]
        }
    }
}
</script>

<style>
.categries-container{
    margin-bottom:50px;
}
.table a:hover{
    background-color:#c0c4cc;
    transition:background-color 0.3s ease-in-out ;
}
.table a{
    display:flex;
    align-items:center;
    width:calc(100%-40px);
    border:1px solid rgb(51,115,30);
    border-left:none;
    border-right:none;
    border-bottom:none;
    height:40px;
    padding:5px 20px;
}
.table{
    width:80%;
    display:flex;
    flex-direction:column;
    border:1px solid RGB(51,115,30);
    border-top:none;
    border-radius:3px;
    font-size:18px;
}
.tag span{
    position:relative;
    font-size:16px;
    top:-5px;
}
.tag:hover{
    background-color:#c0c4cc;
    transition:background-color 0.3s ease-in-out ;
}
.tag{
    height:30px;
    border:1px solid #c0c4cc;
    border-radius:8px;
    margin-right:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:0 5px;
    font-size:17px;
}
.tags{
    width:1180px;
    display:flex;
    margin:10px 10px;
    
}
</style>