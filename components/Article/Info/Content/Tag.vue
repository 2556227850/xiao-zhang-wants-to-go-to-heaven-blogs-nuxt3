<template>
  <div class="article-info-content-tag">
    <n-space justify="end">
      <n-tag :bordered="false" type="info" v-for="(tag, i) in data" :key="i">
        {{ tag.name }}
      </n-tag>
    </n-space>
  </div>
</template>

<script setup>
import { NTag, NSpace, } from 'naive-ui';

defineProps({
  data: {
    type: Array,
    default: []
  }
});

</script>

<style lang="scss" scoped>
.article-info-content-tag {
  font-size: 16px;

  .n-tag {
    cursor: pointer;
  }
}
</style>
