<template>
  <div class="MdEditor">
    <ClientOnly>
      <MdEditor class="preview" :modelValue="modelValue" :theme="theme" showCodeRowNumber :onChange="onChange"
        :onHtmlChanged="onHtmlChanged" @onUploadImg="onUploadImg" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['getContent', 'getHtml']);

// 全局主题色相关
const theme = useTheme();

const onChange = (v) => {
  emits('getContent', v);
};
const onHtmlChanged = (h) => {
  emits('getHtml', h);
};
const onUploadImg = async (files, callback) => {
  const form = new FormData();
  files.forEach((file) => {
    form.append('file', file);
  });
  const { pending, data, refresh, error } =
    await useAdminArticleUploadMdEditorImgApi(form);
  console.log(data.value);
  if (data.value) {
    callback(data.value.files.map((item) => item.url));
  }
};

const getBase64Image = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); //html5提供的一种异步文件读取机制
    reader.readAsDataURL(file); //将文件读取为Base64编码的数据URL
    reader.onload = function () {
      // 图片转base64完成后返回reader对象
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};
</script>

<style lang="scss" scoped>
.MdEditor {
  width: 100%;

  .preview {
    font-family: var(--themeFontFamily);
  }
}
</style>
