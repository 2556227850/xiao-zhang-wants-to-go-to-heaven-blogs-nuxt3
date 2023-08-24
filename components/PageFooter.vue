<template>
  <n-el tag="div" class="page-footer" v-if="show">
    <div class="footer" :class="{ light: theme === 'light', dark: theme === 'dark' }">
      <div class="title">云想衣裳花想容， 春风拂槛露华浓。</div>
      <div class="icp">
        <n-ellipsis>
          © 2023 小张想上天
          <a href="/" target="_blank">鲁ICP备2023xxxxxxx号</a>
          <span class="run-time">{{ appRunTime }}</span>
        </n-ellipsis>
      </div>
    </div>
  </n-el>
</template>

<script setup>
import { NEl, NEllipsis } from 'naive-ui';
const route = useRoute();
// 这里写一个路由的父级路由名称，他的所有子集都不会显示页脚
const fatherArr = ['profile', 'admin'];
// 这里写单独一个不想显示页脚的页面路由名称
const currentArr = ['about'];
// 显示不显示页脚
const show = ref(true);

watch(
  () => route.name,
  (name) => {
    // 先判断所在页面父级数组是否包含该页面

    for (let i = 0; i < fatherArr.length; i++) {
      if (name.split('-')[0] === fatherArr[i]) {
        show.value = false;
        return;
      } else {
        show.value = true;
      }
    }

    //如果父级数组没有再去找这个页面的单独路由名称判断是否包含
    if (show.value) {
      if (currentArr.find((item) => item === name)) {
        show.value = false;
      } else {
        show.value = true;
      }
    }
  },
  { immediate: true }
);

// 全局主题色相关
const theme = useTheme();
const handleUpdateValue = (value) => {
  theme.value = value;
};

const appRunTime = ref('');

let timer = '';

if (process.client) {
  timer = window.setInterval(function logname () {
    let staytimeGap =
      new Date().getTime() - new Date('2023-07-31 00:00:00').getTime();
    let stayDay = Math.floor(staytimeGap / (3600 * 1000 * 24));
    let leave = staytimeGap % (3600 * 1000 * 24);
    let stayHour = Math.floor(leave / (3600 * 1000));
    let leave1 = leave % (3600 * 1000);
    let stayMin = Math.floor(leave1 / (60 * 1000));
    let leave2 = leave1 % (60 * 1000);
    let staySec = Math.floor(leave2 / 1000);
    appRunTime.value =
      '本站已稳定运行 : ' +
      stayDay +
      '天' +
      stayHour +
      '时' +
      stayMin +
      '分' +
      staySec +
      '秒';
  }, 1000);
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style lang="scss" scoped>
.page-footer {
  .light {
    transition: all 0.6s ease-in-out;
    box-shadow: 0 -3px 3px 0px rgba(16, 16, 20, 0.05);
  }

  .dark {
    transition: all 0.6s ease-in-out;
    box-shadow: 0 -3px 3px 0px rgba(255, 255, 255, 0.05);
  }

  background-color: var(--body-color);
  transition: all 0.6s ease-in-out;

  .footer {
    // box-shadow: 5px 5px 20px 5px rgba(16, 16, 20, .05);
    // background: linear-gradient(-90deg, var(--success-color), var(--warning-color), var(--error-color), var(--info-color), );
    // background-size: 300% 300%;
    // animation: gradientBG 10s ease infinite;
    text-align: center;
    border-radius: 1.5rem 1.5rem 0 0;

    .title {
      padding-top: 10px;
      font-size: 16px;
    }

    .icp {
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 13px;

      .run-time {
        padding-left: 10px;
        color: var(--text-color-3);
      }

      a {
        text-decoration: none;
        transition: all 0.3s ease-in-out;
      }

      a:hover {
        color: orange;
      }
    }
  }
}
</style>
