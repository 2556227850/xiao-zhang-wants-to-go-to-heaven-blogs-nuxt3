<template>
  <client-only>
    <editor v-model="content" style="width: 100%" :init="editorInit" />
  </client-only>
</template>

<script setup>
import Editor from '@tinymce/tinymce-vue';
const emits = defineEmits(['tinymceContent', 'empty']);
/**
 * @empty 注意这里如果发送变化则富文本编辑框数据情况,例如：empty++ 后清空富文本框数据
 */
const props = defineProps({
  empty: {
    type: Number,
  },
});

const content = ref('');
watch(content, (val) => {
  emits('tinymceContent', val);
});
watch(
  () => props.empty,
  (val) => {
    content.value = '';
  }
);
const editorInit = {
  language: 'zh_CN', //语言P
  height: 600, //编辑器高度
  plugins:
    'advlist autolink lists link image media charmap searchreplace visualblocks code fullscreen  preview anchor insertdatetime wordcount help table',
  toolbar:
    'codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat ',
  branding: false,
  fontsize_formats:
    '8px 10px 12px 13px 14px 15px 16px 17px 18px 19px 20px 24px 36px',
  font_formats:
    "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings;NotoSansSC-Regular=NotoSansSC-Regular",
  automatic_uploads: true,
  images_upload_credentials: true,
};
</script>

<style lang="scss" scoped></style>
