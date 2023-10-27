<template>
    <div style="width:1200px">
        <div class="math" v-html="markdown"></div>
        <div class="block">
            <span class="demonstration">给个好评吧😊</span>
            <el-rate
              :colors="colors">
            </el-rate>
        </div>
    </div>
</template>

<script>

import {marked} from "marked"
import prism from "prismjs"
import request from "@/utils/request.js"
import katex from 'katex';
import 'katex/dist/katex.min.css';
import MarkdownIt from 'markdown-it';
export default{
    /* eslint-disable */ // 禁用整个文件的 ESLint 检查
    methods: {
        async highlight(code, lang) {
            return await Prism.highlight(code, Prism.languages[lang], lang);
        },
        renderMath() {
        // 在需要呈现LaTeX的元素上调用katex.render
            const mathElements = document.querySelectorAll('.math'); // 使用一个class来标识包含LaTeX的元素
            mathElements.forEach((element) => {
            katex.render(element.textContent, element);
    });
    }
    },
    mounted(){
        request.get("/blog/"+this.$route.query.blogId)
        .then(response=>{
            this.markdown=marked(response.data.body);

            const md = new MarkdownIt();
            // 解析Markdown文本为AST
            const ast = md.parse(response.data.body, {});

            // 现在ast变量包含了Markdown文本的树形结构
            console.log(ast);
            setTimeout(()=>{
                prism.highlightAll(); 
                //this.renderMath();
            },0)
        })
    },
    data(){
        return { 
            markdown:"",
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        }
    },

}
</script>

<style>
pre[class*="language-"] {
    border-radius: 8px; /* 设置边角的弯曲程度 */
    
}
.block span{
    line-height:40px;
}
.block{
    width:0 auto;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height:100px;
}
</style>