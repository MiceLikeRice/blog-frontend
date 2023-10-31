<template>
    <div class="app">
        <div style="
        height:100vh;
        width:100vw;
        background-color:grey;
        position:fixed;
        opacity:0.1;
        z-index:10;
        "
        @click="showSearch=false"
        @touchstart="(event) => event.preventDefault()"
        @touchmove="(event) => event.preventDefault()"
        v-if="showSearch"
        ></div>
        <div class="search-board" v-if="showSearch">
            <div style="width:100%;height:30px;display:flex;align-items:center;justify-content:space-between;">
                <div>搜索
                </div>
                <div style="width:14px;height:14px;margin-right:5px;" @click="showSearch=false">
                    <svg class="hope-icon hope-c-XNyZK hope-c-PJLV hope-c-PJLV-ijhzIfm-css" viewBox="0 0 15 15"><path fill="currentColor" d="M2.64 1.27L7.5 6.13l4.84-4.84A.92.92 0 0 1 13 1a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l4.89 4.89A.9.9 0 0 1 14 13a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-4.85 4.85A.92.92 0 0 1 2 14a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L1.27 2.61A.9.9 0 0 1 1 2a1 1 0 0 1 1-1c.24.003.47.1.64.27z"></path></svg>
                </div>
            </div>
            <div style="width:100%;height:30px;display:flex;align-items:center;justify-content:space-around;margin:10px 0px;
            position:relative;
            ">
                <div style="width:70px;height:43px;
                display:flex;
                align-items:center;
                justify-content:center;
                background-color:white;
                border-radius:5px;
                font-size:15px; 
                "
                @click="showCatagries=!showCatagries"
                >
                    <span
                    style="
                    white-space: nowrap; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    display: inline-block;
                    "
                    >{{search.catagry}}</span>&nbsp;<i class="el-icon-arrow-down
                    "></i>
                <div class="catagries"
                v-if="showCatagries"
                >
                    <button
                    style="width:70px;height:43px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border-radius:5px;
                    font-size:15px;
                    color:grey;
                    border:none;
                    background-color:white;
                    "
                    @click="search.catagry='全部'"
                    >全部</button>
                    <button v-for="(blog,index) in blogs" :key="index"
                    style="width:70px;height:43px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border-radius:5px;
                    font-size:15px;
                    color:grey;
                    border:none;
                    background-color:white;
                    margin-top:5px;
                    "
                    @click="search.catagry=Object.keys(blog)[0]"
                    >{{ Object.keys(blog)[0] }}</button>
                </div>
                </div>
                <input style="
                width:calc(100% - 155px);
                height:36px;
                border:none;
                font-size:17px;
                border-radius:10px;
                "
                v-model="search.keyword"
                />
                <el-button style="
                width:45px;height:45px;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:15px;
                border:none;
                "
                @click="()=>refresh(this.page)"
                ><img 
                style="height:15px;width:15px;opacity: 0.2;" src="/search.png"></el-button>
            </div>
            <div style="width:100%;height:auto;max-height:400px;overflow:auto;">
                <div class="search-bloglist"
                v-for="(blog,index) in search_blogs" :key="index"
                @click="navigateToBlog(blog.blog_id)"
                >
                <div style="width:50px;display:flex;align-items:center">
                    <img style="width:20px;height:20px;margin:0 auto;" src="/blogger.png">
                </div>
                <div style="width:calc(100% - 50px);">
                    <div style="font-size:14px;margin-bottom:5px;">
                        {{blog.title}}
                    </div>
                    <div style="font-size:9px;color:grey;">
                        {{blog.outline}}
                    </div>
                </div>
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
        <div class="top">
            <div class="top-left">
                <img src="/homeicon.png"/>
                <span style="font-size:22px;margin-left:10px;">My Blog</span>
            </div>
            <div class="top-right">
                <button icon="/search.png" @click="showSearch=true" style="background-color:white;box-shadow:2px 2px 2px rgb(200,200,200)">
                    <img src="/search.png">
                    <span style="margin-left:auto;margin-right:10px;color:grey;font-size:14px;">搜索</span>
                </button>
                <div>
                    <img src="/document.gif">
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
        
        <div class="nav">
            <img src="/home.png">
            <span style="margin:0 0 0 10px;font-size:19px;"><a href="/mobile/home" :style="linkStyle" style="color:black;">home</a>&nbsp;</span>/
            <span v-if="this.$route.path==='/mobile/blog'" style="margin:0 10px 0 0;font-size:19px;">&nbsp;<a style="color:black;">blog</a>&nbsp;/</span>
        </div>
        <div class="main">
            <router-view
            />
        </div>
        <div class="footer">
            <div>Copyright © 2023 leibao554@gmail.com</div>
            <div style="color:#969494;">QQ:3014711281</div>
        </div>
        <div style="
        position:fixed;
        bottom:100px;
        right:50px;
        border-radius:50%;
        display:flex;
        aligin:center;
        width:40px;
        height:40px;
        justify-content:center;
        background-color:white;
        box-shadow:0px 0px 10px rgb(200,200,200);
        "
        @click="scrollToTop"
        >
            <i class="el-icon-caret-top" style="font-size:30px;margin-top:4px;color:rgb(64,158,255)"></i>
        </div>
    </div>
</template>
<script>
import request from "@/utils/request.js"
import { Loading } from 'element-ui';
export default{
    methods:{
        needToScroll(){
            return window.scrollY >= 200;
        },
        scrollToTop(){
            window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 可以使滚动过渡更平滑，不加则是瞬间滚动
            });
        },
        async refresh(index){
            window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 可以使滚动过渡更平滑，不加则是瞬间滚动
            });
            console.log(index);
            console.log(this.page);
            this.page=index;
            let loadingInstance = Loading.service({ fullscreen: true });
            await request.get(`/blog/blogcount?search=${this.search.keyword}&type=${this.search.catagry==="全部"?'':this.search.catagry}`)
            .then(response => {
                this.blog_count = response.data.total;
                console.log(this.blog_count);
            })
            let url=`/blog/allblog?page=${this.page}&search=${this.search.keyword}&type=${this.search.catagry}`;
            if(this.search.catagry==="全部"){
                url=`/blog/allblog?page=${this.page}&search=${this.search.keyword}`
            }

            await request.get(url)
            .then((response)=>{
                this.search_blogs=response.data;
                this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                });
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        navigateToBlog(id) {
            window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // 可以使滚动过渡更平滑，不加则是瞬间滚动
                });
            this.showSearch=false;
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
    },
    mounted(){
        let loadingInstance = Loading.service({ fullscreen: true });
        request.get("/blog/blogcount")
        .then(response => {
            this.blog_count = response.data.total;
            console.log(this.blog_count);
        }),

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
            this.search_blogs=response.data;
            this.blogs = Object.entries(groupedData).map(([content_type, value]) => ({
                [content_type]: value
            }));
            loadingInstance.close();
            console.log(this.blogs);
        })
        .catch((error)=>{
            console.log(error);
        })
        this.$notify({
          title: '学无止尽',
          message: '<h3>Wellcome to my blogs~</h3><h3>邮箱:<div>leibao554@gmail.com</div></h3>',
          duration: 3000,
          customClass:"notify",
          dangerouslyUseHTMLString:true
        });
    },
    data(){
        return{
            blogs:[],
            search_blogs:[],
            catagries:[],
            search:{
                catagry:"全部",
                keyword:"",
            },
            showCatagries:false,
            showSearch:false,
            page:1,
            blog_count:0,
        }
    },
    computed: {
    linkStyle() {
      return {
        textDecoration: this.$route.path === '/mobile/blog' ? 'none' : 'underline'
      };
    }
  }
}
</script>
<style>
.el-radio{
    margin-right:10px;
}
.notify{
    width:230px;
}
.search-bloglist{
    display:flex;
    border:2px solid rgb(200,200,200);
    border-left:none;
    border-right:none;
    border-top:none;
    padding:10px 0;
}
.catagries{
    position:absolute;
    top:40px;
    width:70px;
    display:flex;         
    align-items:center;         
    justify-content:center;    
    flex-direction:column;      
    background-color:rgb(230,230,230);               
    border-radius:5px;               
    font-size:15px;
    height:auto;
    padding:5px;
    box-shadow:2px 2px 3px rgb(220,220,220);
    color:rgb(230,230,230);
}
.search-board{
    position:fixed;
    min-height:40vh;
    width:calc(90vw - 20px);
    top:15vh;
    left:5vw;
    background-color:rgb(240,240,240);
    box-shadow: 0px 0px 10px rgb(200,200,200);
    border-radius:10px;
    padding:10px;
    z-index:999;
}
.footer>div:first-child{
    margin-bottom:10px;
}
.footer{
    height:100px;
    display:flex;
    align-items:center;
    justify-content:center;
    color: grey;
    flex-direction:column;
    font-size:12px;
}
.nav>img{
    height:20px;
    width:20px;
    margin-left:10px;
}
.nav{
    height:40px;
    display:flex;
    align-items:center;
    
}
.top-right>button>img{
    height:15px;
    width:15px;
}
.top-right>button{
    display:flex;
    align-items:center;
}
.top-right>div>img{
    height:30px;
    width:30px;
    border-radius:8px;
}
.top-right>button{
    border:0px;
    background-color:rgb(200,200,200);
    height:35px;
    width:calc(100% - 55px);
    border-radius:9px;
}
.top-right>button:focus{
    border:2px solid #91b6f88a; 
}
.top-right>div{
    height:37px;
    width:37px;
    margin:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:white;
    box-shadow:2px 2px 2px rgb(200,200,200);
    border-radius:8px;
}
.top-right{
    float:right;
    display:flex;
    align-items:center;
    height:60px;
    width:50vw;
}
.top-left img{
    height:40px;
    width:40px;
    margin-left:10px;
}
.top-left{
    height:60px;
    display:flex;
    align-items:center;
    float:left;
    width:50vw;
}
.app{
    width:100%;
    min-height:100vh;
    background-color:rgb(245,245,245);
}
</style>