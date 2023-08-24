<template>
  <div class="">
    测试
    <nuxt-link to="/">toIndex</nuxt-link>
  </div>
</template>

<script setup>
import { } from 'vue';
useHead({
  title: '测试',
  meta: [
    {
      name: 'description',
      content: '测试描述',
    },
    {
      name: 'keywords',
      content: '测试关键词',
    },
  ],
});
</script>

<style lang="scss" scoped></style>
