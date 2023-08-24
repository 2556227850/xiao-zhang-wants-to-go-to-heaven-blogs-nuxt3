<template>
  <div>
    <n-modal :show="show" :style="{ width: '50%' }" :mask-closable="false" preset="card" :title="title" :on-close="close">

      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item-row path="name" label="名称">
          <n-input v-model:value="formData.name" :on-input="inputChange" placeholder="请输入名称" :minlength="1"
            :maxlength="12" />
        </n-form-item-row>
        <n-form-item-row path="hot" label="是否热门">
          <n-switch v-model:value="formData.hot" />
        </n-form-item-row>
        <n-form-item-row path="type" label="显示类型">
          <n-select v-model:value="formData.type" :options="typeOptions" />
        </n-form-item-row>
        <n-form-item-row label="父级分类">
          <n-cascader :disabled="formData.disabled" clearable label-field="name" value-field="id"
            v-model:value="formData.groupId" placeholder="请选择分类(不选默认最顶级)" :options="options">
            <template #action>
              你猜猜小张为什么想上天
            </template>
          </n-cascader>
        </n-form-item-row>
        <n-form-item-row label="备注">
          <n-input v-model:value="formData.desc" placeholder="备注说明" type="textarea" :autosize="{
            minRows: 3,
            maxRows: 5
          }" />
        </n-form-item-row>
      </n-form>
      <template #footer>
        <n-space justify="right">
          <n-button type="tertiary" @click="close">
            取消
          </n-button>
          <n-button :loading="loading" type="primary" @click.prevent="handleClick">
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
  NCascader,
  NSelect,
  NSwitch,
  NButton,
  createDiscreteApi,
} from 'naive-ui';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  }
})
const formRef = ref(null);
const title = ref('')


watch(() => props.show, () => {
  formData.value = { ...props.data }

  if (props.data.id) {
    title.value = '编辑'

  } else {
    title.value = '新增'
  }
})

const typeOptions = ref([
  {
    label: 'success',
    value: 'success'
  },
  {
    label: 'info',
    value: 'info'
  },
  {
    label: 'warning',
    value: 'warning'
  },
  {
    label: 'error',
    value: 'error'
  },
])

const formData = ref({
  id: null,
  name: '',
  groupId: null,
  type: null,
  desc: '',
  hot: false,
  disabled: false,
})
const rules = {
  name: [
    {
      required: true,
      min: 1,
      max: 12,
      message: '请输入1-12位数字组成的分类名称',
      trigger: 'blur',
    },
  ],
  type: {
    required: true,
    trigger: ["blur", "change"],
    message: "请选择 显示类型"
  },
};
const loading = ref(false);

const handleClick = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      //接口
      if (formData.value.id) {
        const { pending, data, refresh, error } = await useAdminClassificationArticleEditApi({ ...formData.value })
        loading.value = false;
        if (data.value) {
          emits('getTabList')
          close()
        }
      } else {
        const { pending, data, refresh, error } = await useAdminClassificationArticleNewApi({ ...formData.value })
        loading.value = false;
        if (data.value) {
          emits('getTabList')
          close()
        }
      }
      //

    } else {
      console.log(errors);
    }
  });
};

const inputChange = () => {
  formData.value.name = formData.value.name.replace(/\s*/g, '');
};
const emits = defineEmits(['update:show', 'getTabList'])

const close = () => {
  formData.value = {
    id: null,
    name: '',
    groupId: null,
    type: null,
    hot: false,
    desc: '',
    disabled: false,
  };
  emits('update:show', false)
}


</script>
<style lang="scss" scoped></style>

