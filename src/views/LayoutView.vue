<template>
    <div class="app">
        <div class="header">
            <div class="nav">
                <div class="nav-left" >Baolei's Blog</div>
                <div class="nav-right">
                    <nav>
                        <router-link to="/Home">Home</router-link>
                        <router-link to="/categries">Categries</router-link>
                        <a target="_blank" href="/Edit" >Write</a>
                        <a target="_blank" href="https://github.com/MiceLikeRice" style="color:rgb(13,17,23);font-weight:800;">Github</a>
                        <a target="_blank" href="https://leetcode.cn/u/9Q0JUwK9OB/" style="color:rgb(255,161,22);font-weight:800;">Leetcode</a>
                    </nav>
                </div>
            </div>
        </div>
        <div class="topper">
            <div class="carousel">
                <el-carousel :interval="3000" arrow="hover">
                    <el-carousel-item v-for="(item,index) in carousel_image" :key="index">
                        <img :src="item.image_url"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="main">
            <!-- <vue-markdown :source="markdown" :plugins="plugins" :highlight="highlight"></vue-markdown> -->
            <router-view/>
        </div>
        <div class="footer">
            <div class="contact-info">
                <div class="info-middle">
                    <div class="info-middle-left">
                        <div style="font-size:23px;margin-bottom:20px;font-family: '楷体', 'KaiTi', cursive;">观念塑造命运，</div>
                        <div style="font-size:23px;font-family: '楷体', 'KaiTi', cursive;">选择决定未来。</div>
                    </div>
                    <div class="info-middle-middle">
                        <div style="font-size:17px;margin-bottom:5px;font-weight:200;">Beliefs shape destiny,</div>
                        <div style="font-size:17px;font-weight:200;"> choices determine the future.</div>
                        <div></div>
                    </div>
                    <div class="info-middle-right">
                        <div style="font-size:19px; margin-bottom:20px;">QQ: <span style="text-decoration: underline;color:rgb(220,220,220)">3014711281</span></div>
                        <div style="font-size:19px;">Mail: <span style="text-decoration: underline;color:rgb(220,220,220)">leibao554@gmail.com</span></div>
                    </div>
                </div>
            </div>
            <div class="footer-middle">
                <span style="color:rgb(215,215,215)">Copyright © 2023 Bao Lei</span>
                <span>Hello,world!</span>
            </div>
        </div>
    </div>
</template>



<script>
export default{
    data(){
        return {
            carousel_image:[
                {
                    image_url:"https://baoblogs.top/api/image/download/bkimg1.png",
                    image_dtl:"水",
                },
                {
                    image_url:"https://baoblogs.top/api/image/download/bkimg3.png",
                    image_dtl:"水",
                },
                {
                    image_url:"https://baoblogs.top/api/image/download/bkimg4.png",
                    image_dtl:"水",
                },
                {
                    image_url:"https://baoblogs.top/api/image/download/bkimg5.png",
                    image_dtl:"水",
                },
                {
                    image_url:"https://baoblogs.top/api/image/download/bkimg6.png",
                    image_dtl:"水",
                }
            ]
        }
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
  }
};
</script>
<style>
.app{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.info-middle-left{
    display:flex;
    align-items:center;
    justify-content:center;
    
}
.footer-middle span{
    color:white;
    line-height:80px;
    font-size:17px
}
.footer-middle span:nth-child(1){
    float:left;
}
.footer-middle span:nth-child(2){
    float:right;
}
.info-middle>div{
    width:33.33%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
    line-height:30px;
    color:white;
}
.info-middle{
    max-width:1200px;
    margin:0 auto;
    display:flex;
    height:170px;
}
.footer-middle{
    max-width:1200px;
    margin:0 auto;
}
.contact-info{
    height:170px;
    background-color:RGB(51,115,30);
    width:100%;
}
.main{
    min-height:300px;
    max-width:1200px;
    margin:0 auto;
    font-size:20px;
    flex: 1;
}
.footer{
    height:250px;
    min-width:1200px;
    background-color:RGB(51,105,30);
}
.middle{
    max-width:1200px;
    margin:0 auto;
}
.carousel img{
    width:100%;
    align-self:center;
}
.el-carousel__container{
    height:400px;
}
.carousel{
    height:400px;
    max-width:1200px;
    margin:0 auto;
}
.el-carousel__item{
    display:flex;
    align-items:center;
    justify-content:center;
} 
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.nav-right a:hover{
    color: #ff0000;
    text-decoration: underline; /* 添加下划线效果 */
}
.nav-right a{
    margin:0 10px;
    color:white;
    text-decoration:none;
}
.nav-right{
    height:100%;
    font-size:20px;
    float:right;
    display:flex;
    align-items:center
}
.nav-left{
    font-size:50px;
    display:flex;
    align-items:center;
    width:400px;
    height:100%;
    float:left;
    color:white;
}
.nav{
    max-width:1200px;
    margin:0 auto;
    height:100%;
}
.header{
    height:80px;
    min-width:1200px;
    background-color:RGB(51,105,30);
}
.topper{
    height:400px;
    min-width:1200px;
    background-color:RGB(85,139,47);
}
</style>
