<template>
  <LoadingGroup :pending="pending" :error="error">
    <ArticleInfo :data="data" />
  </LoadingGroup>
</template>

<script setup>

const route = useRoute()
const { id } = route.params;
const { pending, data, refresh, error } = await useHomeArticleInfoApi(id);
// 服务端时直接报错
if (process.server && error.value) {
  throwError(error.value?.data?.message);
}

</script>

<style lang="scss" scoped></style>
