<template>
  <div class="MdPreview">
    <ClientOnly>
      <MdPreview class="preview" :theme="theme" showCodeRowNumber :modelValue="content" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';

defineProps({
  content: {
    type: String,
    default: ''
  }
})
// 全局主题色相关
const theme = useTheme()
</script>

<style lang="scss" scoped>
.MdPreview {
  width: 100%;

  .preview {
    font-family: var(--themeFontFamily);
  }
}
</style>
