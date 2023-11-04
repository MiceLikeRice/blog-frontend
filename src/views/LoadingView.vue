<template>
    <div>
    </div>
</template>
<script>
import { Loading } from 'element-ui';
export default{
    /* eslint-disable */
    methods:{

    },
    async mounted() {
    // 获取用户代理字符串
    let loadingInstance = Loading.service({ fullscreen: true });
    const userAgent = navigator.userAgent;

    // 判断是否是移动设备
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    await setTimeout(()=>{
            if (isMobileDevice) {
                // 如果是移动设备，跳转到移动设备页面
                window.location.href = '/mobile/home'; // 请替换为实际的移动设备页面URL
            }else{
                window.location.href = '/home';
            }
        loadingInstance.close();
                
    }
    ,1000);

  }
}
</script>