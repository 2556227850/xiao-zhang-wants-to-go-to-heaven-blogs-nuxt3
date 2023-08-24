<template>
  <div class="article-info-head-background">
    <div class="background-image">
      <n-image object-fit="cover" :src="data.preview" preview-disabled />
    </div>
    <div class="background-masking" :class="{
      light: theme === 'light', dark: theme === 'dark'
    }"></div>
  </div>
</template>

<script setup>
import {
  NImage,
} from 'naive-ui';
defineProps({
  data: {
    type: Object,
    default: {}
  }
});

// 全局主题色相关
const theme = useTheme()
const handleUpdateValue = (value) => {
  theme.value = value
}
</script>

<style lang="scss" scoped>
.article-info-head-background {

  // 主题背景色和body保持一致
  .light {
    transition: all .6s ease-in-out;
    background-color: rgba(255, 255, 255, 0);

  }

  .dark {
    transition: all .6s ease-in-out;
    background-color: rgba(16, 16, 20, .5);

  }

  .background-image {
    position: absolute;
    height: 40vh;
    width: 100%;
    z-index: -2;

    .n-image {
      width: 100%;
      height: 100%;

      :deep(img) {
        width: 100%;
        height: 100%;
      }
    }
  }

  .background-masking {
    position: absolute;
    width: 100%;
    height: 40vh;
    z-index: -1;
  }
}
</style>
