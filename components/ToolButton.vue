<template>
  <div class="tool-button">
    <div class="affix">
      <n-popover trigger="click" placement="left">
        <template #trigger>
          <n-icon size="25">
            <SettingsSharp />
          </n-icon>
        </template>
        <span>
          <n-switch @update:value="handleUpdateValue" :value="theme" checked-value="light" unchecked-value="dark">
            <template #checked>
              浅色
            </template>
            <template #unchecked>
              深色
            </template>
          </n-switch>
        </span>
      </n-popover>
    </div>
  </div>
</template>

<script setup>
import { NIcon, NPopover, NSwitch } from 'naive-ui';
import { SettingsSharp } from '@vicons/ionicons5'

// 全局主题色相关
const theme = useTheme()
const handleUpdateValue = (value) => {
  theme.value = value
}

</script>

<style lang="scss" scoped>
.tool-button {
  .affix {
    position: fixed;
    right: 3vh;
    bottom: 3vh;
    z-index: 100;

    :deep(.n-icon) {
      vertical-align: middle;
      cursor: pointer;
      animation: rotate 2s linear infinite;
    }
  }
}
</style>
