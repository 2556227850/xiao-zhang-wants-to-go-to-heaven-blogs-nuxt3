<template>
  <LoadingGroup :pending="pending" :error="error">
    <Home :data="data" />
  </LoadingGroup>
</template>

<script setup>
useHead({
  title: '首页',
  meta: [
    {
      name: 'description',
      content: '小张想上天的博客 小张想上天 小张在天上',
    },
    {
      name: 'keywords',
      content: '小张想上天的博客 小张想上天 小张在天上',
    },
  ],
});
const { pending, data, refresh, error } = await useHomeDataApi();
// 服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.message);
}
</script>

<style lang="scss" scoped></style>
