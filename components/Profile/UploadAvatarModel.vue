<template>
  <div class="upload-avatar-model">
    <n-modal
      :show="show"
      :mask-closable="false"
      preset="card"
      title="上传头像"
      :on-close="close"
    >
      <n-form :model="formData">
        <n-form-item-row path="previewUrl" label="原头像">
          <n-image width="100" :src="avatarUrl" />
        </n-form-item-row>
        <n-form-item-row
          path="username"
          label="上传头像(注:如果选择原头像则会被替换)"
        >
          <n-upload
            :file-list="formData.avatar"
            accept=".jpg,.png"
            @change="handleChange"
            :default-upload="false"
            :max="1"
            show-preview-button
            ref="uploadRef"
            list-type="image-card"
          />
        </n-form-item-row>
      </n-form>
      <template #footer>
        <n-space justify="right">
          <n-button type="tertiary" @click="close"> 取消 </n-button>
          <n-button
            :disabled="formData.avatar.length === 0"
            :loading="loading"
            type="primary"
            @click="handleClick"
          >
            上传
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import {
  NImage,
  NModal,
  NUpload,
  NForm,
  NFormItemRow,
  NSpace,
  NButton,
  createDiscreteApi,
} from 'naive-ui';
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

const formData = ref({
  avatar: [],
});

const handleChange = (options) => {
  const { message } = createDiscreteApi(['message']);

  const fileTypes = ['image/jpeg', 'image/png'];

  if (!fileTypes.includes(options.file.file.type)) {
    message.warning('头像格式只能为jpg/png');
    return;
  }
  if (options.file.file.size > 2097152) {
    message.warning('上传头像大小不能大于2MB');
    return;
  }
  if (formData.value.avatar.length === 0) {
    formData.value.avatar = [{ ...options.file }];
  } else {
    formData.value.avatar = [];
    uploadRef.value?.clear();
  }
  return;
};

const loading = ref(false);

const handleClick = async () => {
  const { message } = createDiscreteApi(['message']);

  if (formData.value.avatar.length === 0) {
    message.warning('头像文件不能为空');
    return;
  }

  loading.value = true;
  const f = new FormData();
  f.append('file', formData.value.avatar[0].file);
  //接口
  const { pending, data, refresh, error } = await useProfileUploadAvatarApi(f);
  //
  loading.value = false;
  const user = useUser();
  if (data.value) {
    await useRefreshUserInfo();
    close();
  }
};
const emits = defineEmits(['update:show']);

const uploadRef = ref(null);

const close = () => {
  uploadRef.value?.clear();
  formData.value = {
    avatar: [],
  };
  emits('update:show', false);
};
</script>
<style lang="scss" scoped>
.upload-dragger {
  padding: 20px;
}
</style>
