<template>
  <Login />
</template>

<script setup>
useHead({
  title: '登录',
  meta: [
    {
      name: 'description',
      content: '登录描述',
    },
    {
      name: 'keywords',
      content: '登录关键词',
    },
  ],
},
);

definePageMeta({
  layout: 'login',
  middleware: ['only-visitor'],
});

</script>

<style lang="scss" scoped></style>
