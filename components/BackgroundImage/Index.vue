<template>
  <div class="background-image-main">
    <div class="background-image">
      <n-image alt="小张想上天" object-fit="cover" :src="url" preview-disabled />
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

const url = 'https://pic1.zhimg.com/80/v2-c4f561cf0c23beced24b56f7fcac997c_720w.webp'
// 全局主题色相关
const theme = useTheme()
const handleUpdateValue = (value) => {
  theme.value = value
}
</script>

<style lang="scss" scoped>
// 主题背景色和body保持一致
.light {
  transition: all .6s ease-in-out;
  background-color: rgba(255, 255, 255, 0);

}

.dark {
  transition: all .6s ease-in-out;
  background-color: rgba(16, 16, 20, .5);

}

.background-image-main {
  height: 100%;
  width: 100%;

  .background-image {
    position: fixed;
    height: 100%;
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
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

}
</style>
