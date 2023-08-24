<template>
  <n-el tag="div" class="home-page-el">
    <div class="home-page">
      <HomeBackground />
      <HomeSaying :data="data.saying" />
      <HomeData :data="data.data" />
    </div>
  </n-el>
</template>

<script setup>
import { NEl } from 'naive-ui';

defineProps({
  data: {
    type: Object,
    default: {}
  }
});
console.log('TODU:文章详情页\n1、评论。2、分类标签跳转文章列表筛选页。3、分享功能')
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
}
</style>