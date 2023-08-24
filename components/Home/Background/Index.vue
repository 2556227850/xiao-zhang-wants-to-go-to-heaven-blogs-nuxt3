<template>
  <div class="home-background">
    <BackgroundImage />
    <div class="home-background-down">
      <n-icon @click.stop="down" size="40">
        <ChevronDown />
      </n-icon>
    </div>
    <div class="home-background-bannerwave1" :class="{
      bannerwave1: theme === 'light', bannerwave1dark: theme === 'dark'
    }">
    </div>
    <div class="home-background-bannerwave2" :class="{
      bannerwave2: theme === 'light', bannerwave2dark: theme === 'dark'
    }">
    </div>
  </div>
</template>

<script setup>
import { NImage, NIcon } from 'naive-ui';
import { ChevronDown } from '@vicons/ionicons5'
// 全局主题色相关
const theme = useTheme()
const handleUpdateValue = (value) => {
  theme.value = value
}


const down = () => {
  window.scrollTo({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  })
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

// 首屏下流动效果图主题
.bannerwave1 {
  background: url('@/assets/img/bannerwave1.png') repeat-x;
}

.bannerwave2 {
  background: url('@/assets/img/bannerwave2.png') repeat-x;
}

.bannerwave1dark {
  background: url('@/assets/img/bannerwave1dark.png') repeat-x;
}

.bannerwave2dark {
  background: url('@/assets/img/bannerwave2dark.png') repeat-x;
}

.home-background {
  position: relative;
  overflow: hidden;
  height: 100vh;


  .home-background-down {
    animation: downbeat 1.5s ease-out infinite;
    text-align: center;
    position: absolute;
    top: 90%;
    left: 50%;
    z-index: 15;

    .n-icon {
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }

  .home-background-bannerwave1 {
    transition: all .6s ease-in-out;

    position: absolute;
    bottom: 0;
    width: 200%;
    height: 84px;
    z-index: 10;
    animation: gradientBG 120s linear infinite;
  }

  .home-background-bannerwave2 {
    transition: all .6s ease-in-out;

    position: absolute;
    bottom: 0;
    width: 400%;
    height: 100px;
    z-index: 5;
    animation: gradientBG 120s linear infinite;

  }
}
</style>
