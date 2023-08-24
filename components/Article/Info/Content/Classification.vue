<template>
  <div class="article-info-content-tag-classification">
    <n-breadcrumb>
      <n-breadcrumb-item v-for="(item, index) of data" :key="index">
        <div class="trigger">
          {{ item.name }}
        </div>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script setup>
import { NEllipsis, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
defineProps({
  data: {
    type: Array,
    default: []
  },
});
</script>

<style lang="scss" scoped>
.article-info-content-tag-classification {
  overflow: auto;

  .trigger {
    font-weight: bold;
  }
}
</style>
