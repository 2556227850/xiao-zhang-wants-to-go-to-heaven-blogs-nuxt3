<template>
  <div class="">
    <ClientOnly>
      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item-row path="title" label="文章标题">
          <n-input v-model:value="formData.title" maxlength="100" placeholder="请输入文章标题" />
        </n-form-item-row>
        <n-form-item-row path="hot" label="是否热门">
          <n-switch v-model:value="formData.hot" />
        </n-form-item-row>
        <n-form-item-row path="previewUrl" label="原预览图">
          <n-image width="100" :src="formData.previewUrl" />
        </n-form-item-row>
        <n-form-item-row path="preview" label="预览图(注:如果选择原预览图则会被替换)">
          <n-upload accept=".jpg,.png,.gif" @change="handleChange" :default-upload="false" :max="1" show-preview-button
            ref="uploadRef" list-type="image-card" />
        </n-form-item-row>
        <n-form-item-row label="文章分类" path="classificationId">
          <n-cascader clearable label-field="name" value-field="id" v-model:value="formData.classificationId"
            @update:value="classificationIdChange" placeholder="请选择分类" :options="classificationOptions">
            <template #action> 你猜猜小张为什么想上天 </template>
          </n-cascader>
        </n-form-item-row>
        <n-form-item-row label="文章标签" path="tag">
          <n-select label-field="name" value-field="id" :disabled="!formData.classificationId"
            v-model:value="formData.tag" :options="tagOptions" filterable clearable multiple />
        </n-form-item-row>
        <n-form-item-row label="文章内容" path="content">
          <MdEditorV3 v-model="formData.content" @getContent="getContent" @getHtml="getHtml" />
        </n-form-item-row>
      </n-form>
    </ClientOnly>
    <div class="button">
      <n-button :loading="loading" type="primary" @click.prevent="handleClick">
        提交
      </n-button>
    </div>
  </div>
</template>

<script setup>
import {
  NImage,
  NForm,
  NFormItemRow,
  NInput,
  NCascader,
  NSelect,
  NSwitch,
  NButton,
  createDiscreteApi,
  NUpload,
} from 'naive-ui';
const { $commonOpen, } = useNuxtApp();

const formRef = ref(null);
const loading = ref(false);
const classificationOptions = ref([]);
const tagOptions = ref([]);
const formData = ref({
  id: '',
  title: '',
  content: '',
  html: '',
  classificationId: null,
  tag: [],
  preview: [],
  hot: false,
  previewUrl: ''
});
const rules = {
  title: [
    {
      required: true,
      min: 1,
      max: 100,
      message: '请输入1-100个字符组成的标题',
      trigger: 'blur',
    },
  ],
  classificationId: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: '请选择 绑定的分类ID',
    },
  ],

  tag: {
    type: 'array',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择 标签',
  },

};

const getContent = (v) => {
  formData.value.content = v;
};
const getHtml = (h) => {
  formData.value.html = h;
};

const uploadRef = ref(null);
const handleClick = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { message } = createDiscreteApi(['message']);


      loading.value = true;
      //接口
      const f = new FormData();
      f.append('id', formData.value.id);
      f.append('title', formData.value.title);
      f.append('content', formData.value.content);
      f.append('html', formData.value.html);
      f.append('classificationId', formData.value.classificationId);
      f.append('tag', JSON.stringify(formData.value.tag));
      if (formData.value.preview.length === 1) {
        f.append('preview', formData.value.preview[0].file);
      } else {
        f.append('preview', JSON.stringify(null));
      }
      f.append('hot', JSON.stringify(formData.value.hot));
      const { pending, data, refresh, error } = await useAdminArticleListEditApi(f)
      loading.value = false;
      if (data.value) {
        uploadRef.value?.clear();
        formData.value = {
          id: '',
          title: '',
          content: '',
          html: '',
          classificationId: null,
          tag: [],
          preview: [],
          hot: false,
          previewUrl: ''
        };
        $commonOpen({ type: 'router', url: '/admin/article' })
      }
    } else {
      console.log(errors);
    }
  });
};

const handleChange = (options) => {
  const { message } = createDiscreteApi(['message']);
  const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (!fileTypes.includes(options.file.file.type)) {
    message.warning('上传图片格式只能为jpg/png/gif');
    return;
  }
  if (options.file.file.size > 2097152) {
    message.warning('上传图片大小不能大于2MB');
    return;
  }
  if (formData.value.preview.length === 0) {
    formData.value.preview = [{ ...options.file }];
  } else {
    formData.value.preview = [];
    uploadRef.value?.clear();
  }
  return;
};

const classificationIdChange = async (value) => {
  formData.value.tag = [];
  getTabList(value);
};
const getTabList = async (value) => {
  const { pending, data, refresh, error } = await useAdminArticleWriteListApi({
    classificationId: value,
  });
  if (data.value) {
    classificationOptions.value = data.value.typeList;
    tagOptions.value = data.value.list;
  }
};

const route = useRoute();
const { id } = route.params;
const getArticleInfo = async () => {
  const { pending, data, refresh, error } = await useAdminArticleListInfoApi(
    id
  );
  if (data.value) {
    getTabList(data.value.classification);
    formData.value.id = data.value.id;
    formData.value.title = data.value.title;
    formData.value.html = data.value.html;
    formData.value.content = data.value.content;
    formData.value.classificationId = data.value.classification;
    formData.value.tag = data.value.tags;
    formData.value.previewUrl = data.value.preview
    formData.value.hot = data.value.hot;


  }
};
getArticleInfo();
</script>

<style lang="scss" scoped>
.button {
  text-align: right;
}
</style>
