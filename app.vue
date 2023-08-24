<template>
  <div id="app">
    <NConfigProvider :locale="zhCN" :theme-overrides="themeOverrides" inline-theme-disabled
      :theme="theme === 'dark' ? darkTheme : null">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <NGlobalStyle />
    </NConfigProvider>
  </div>
</template>
<script setup>
import { NConfigProvider, darkTheme, NGlobalStyle, zhCN } from 'naive-ui';
const theme = useTheme()
/**
 * 全局组件主题色配置
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  common: {

    // 全局naive ui字体
    fontFamily: 'xzxst,楷体'
    // primaryColor: '#f7f9fe'
  },
}
</script>
