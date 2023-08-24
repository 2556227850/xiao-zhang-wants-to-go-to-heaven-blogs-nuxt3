<template>
  <n-empty :description="desc" size="large" style="padding: 10px 0px"></n-empty>
</template>
<script setup>
import { NEmpty } from 'naive-ui';
defineProps({
  desc: {
    type: String,
    default: '暂无数据',
  },
});
</script>
