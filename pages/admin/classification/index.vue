<template>
  <div class="admin-classification">
    <n-tabs type="line" animated>
      <n-tab-pane name="article" tab="文章分类">
        <AdminClassificationArticle />
      </n-tab-pane>
      <n-tab-pane name="tag" tab="标签">
        <AdminClassificationTag />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { NTabs, NTabPane, createDiscreteApi } from 'naive-ui';
const { message } = createDiscreteApi(['message']);
</script>

<style lang="scss" scoped>
.admin-classification {
  width: 100%;
}
</style>
