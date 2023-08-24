<template>
  <div>
    <n-modal :show="show" :style="{ width: '50%' }" :mask-closable="false" preset="card" :title="title" :on-close="close">

      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item-row path="username" label="用户名">
          <n-input :allow-input="(value) => !value || /^\d+$/.test(value)" v-model:value="formData.username"
            placeholder="请输入用户名(用户名类型为数字)" />
        </n-form-item-row>
        <n-form-item-row path="password" label="密码">
          <n-input type="password" show-password-on="mousedown" v-model:value="formData.password" placeholder="请输入密码" />
        </n-form-item-row>
      </n-form>
      <template #footer>
        <n-space justify="right">
          <n-button type="tertiary" @click="close">
            取消
          </n-button>
          <n-button :loading="loading" type="primary" @click="handleClick">
            提交
          </n-button>
        </n-space>
      </template>
    </n-modal>

  </div>
</template>

<script setup>
import {
  NModal,
  NSpace,
  NForm,
  NFormItemRow,
  NInput,
  NButton,
  createDiscreteApi,
} from 'naive-ui';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
const formRef = ref(null);
const title = ref('')

watch(() => props.show, () => {
  title.value = '新增'
})

const formData = ref({
  username: null,
  password: null,
})
const rules = {
  username: [
    {
      required: true,
      min: 8,
      max: 12,
      message: '请输入8-12位数字组成的用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      min: 7,
      max: 16,
      message: '请输入7-16位字符组成的密码',
      trigger: 'blur',
    },

  ],
};
const loading = ref(false);

const handleClick = (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      //接口

      //
      loading.value = false;

      // if (data.value) {
      // close()

      // }
    } else {
      console.log(errors);
    }
  });
};
const emits = defineEmits(['update:show'])

const close = () => {
  formData.value = {
    username: null,
    password: null,
  };
  emits('update:show', false)
}


</script>
<style lang="scss" scoped></style>

