import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import hljs from 'highlight.js'

import VueMarkdown from 'vue-markdown'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('vue-markdown', VueMarkdown)
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightElement(block);

    // 获取代码块的语言类名
    const language = block.className.split(' ')[1];

    // 根据语言类名设置背景颜色
    if (language === 'javascript') {
      block.style.backgroundColor = '#f0f0f0'; // JavaScript代码块的背景颜色
    } else if (language === 'css') {
      block.style.backgroundColor = '#e0e0e0'; // CSS代码块的背景颜色
    }

    // 可以为其他语言添加相应的条件
  });
});

new Vue({
  router,
  el: '#app',
  render: h => h(App),
}).$mount('#app')
