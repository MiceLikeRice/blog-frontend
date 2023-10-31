<template>
    <div style="width:1200px">
      <div class="math" v-html="markdown"></div>
      <div style="
      color:grey;
      margin:50px 0;
      float:right;
      ">
        written by :Bao Lei
      </div>
      <div style="clear:both;"></div>
      <div class="block">
        <span class="demonstration">给个好评吧😊</span>
        <el-rate :colors="colors"></el-rate>
      </div>
    </div>
  </template>
  
  <script>
  import {marked} from "marked";
  import prism from "prismjs";
  import request from "@/utils/request.js";
  import katex from 'katex';
  import 'katex/dist/katex.min.css';
  import { Loading } from 'element-ui';
  export default {
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
      },
    },
    mounted() {
        let loadingInstance = Loading.service({ fullscreen: true });
      request.get("/blog/" + this.$route.query.blogId)
        .then(response => {
          this.markdown = marked(response.data.body, { renderer: new MyRenderer() });
  
          // 创建一个 <script> 标签来加载 MathJax
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML";
          script.async = true;
          script.onload = () => {
            // 设置MathJax配置
            MathJax.Hub.Config({
              showProcessingMessages: false,
              messageStyle: "none",
              tex2jax: { inlineMath: [["$", "$"]] }
            });
  
            // 渲染数学公式
            const mathElements = document.querySelectorAll('.math');
            mathElements.forEach((element) => {
              MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
            });
  
            // 高亮代码块
            setTimeout(() => {
              prism.highlightAll();
            }, 0);

          };
  
          // 将 <script> 标签添加到页面
          document.head.appendChild(script);
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
            });
        });
    },
    data() {
      return { 
        markdown: "",
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      }
    }
  }
  
  class MyRenderer extends marked.Renderer {
    table(header, body) {
      return `<table class="my-custom-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    }
  
    tablerow(content) {
      return `<tr>${content}</tr>`;
    }
  
    tablecell(content, flags) {
      if (flags.header) {
        return `<th>${content}</th>`;
      } else {
        return `<td>${content}</td>`;
      }
    }
  }
  </script>
  
  <style>
  pre[class*="language-"] {
    border-radius: 8px; /* 设置边角的弯曲程度 */
  }
  
  .my-custom-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 1em 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .my-custom-table th,
  .my-custom-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .my-custom-table th {
    background-color: #f5f5f5;
  }
  
  .block span {
    line-height: 40px;
  }
  
  .block {
    width: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
  }
  </style>
  