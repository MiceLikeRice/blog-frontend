<template>
    <div>
      <div v-if="isMobile">This is the mobile version of the site.</div>
      <div v-else>This is the desktop version of the site.</div>
    </div>
  </template>
  
  <script>
  import { isMobile } from 'vue-device-detect';
  
  export default {
    data() {
      return {
        isMobile: isMobile,
      };
    },
  };
  </script>
  