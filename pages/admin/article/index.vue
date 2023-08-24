<template>
  <div class="admin-article">
    <n-tabs type="line" animated>
      <n-tab-pane name="list" tab="文章列表">
        <AdminArticleList />
      </n-tab-pane>
      <n-tab-pane name="write" tab="写文章">
        <AdminArticleWrite />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { NTabs, NTabPane, createDiscreteApi } from 'naive-ui';
const { message } = createDiscreteApi(['message']);
</script>

<style lang="scss" scoped>
.admin-article {
  width: 100%;
}
</style>
