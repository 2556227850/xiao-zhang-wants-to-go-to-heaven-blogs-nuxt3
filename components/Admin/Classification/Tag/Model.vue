<template>
  <div>
    <n-modal :show="show" :style="{ width: '50%' }" :mask-closable="false" preset="card" :title="title" :on-close="close">

      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item-row path="type" label="分类">
          <n-radio-group disabled v-model:value="formData.type" name="type">
            <n-space>
              <n-radio value="article">
                文章
              </n-radio>
              <n-radio value="photos">
                相册
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item-row>
        <n-form-item-row path="name" label="名称">
          <n-input v-model:value="formData.name" :on-input="inputChange" placeholder="请输入名称" :minlength="1"
            :maxlength="12" />
        </n-form-item-row>
        <n-form-item-row path="classificationId" label="绑定所在分类">
          <n-cascader disabled clearable label-field="name" value-field="id" v-model:value="formData.classificationId"
            placeholder="请选择分类" :options="options">
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
  NRadio, NRadioGroup,
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




const formData = ref({
  id: null,
  name: '',
  type: 'article',
  classificationId: null,
  desc: '',
})
const rules = {
  name: [
    {
      required: true,
      min: 1,
      max: 12,
      message: '请输入1-12位数字组成的标签名称',
      trigger: 'blur',
    },
  ],
  classificationId: [{
    required: true,
    trigger: ["blur", "input"],
    message: "请选择 绑定的分类ID"
  }],
};

watch(() => props.show, () => {
  formData.value = { ...props.data }

  if (props.data.id) {
    title.value = '编辑'

  } else {
    title.value = '新增'
  }
})

const loading = ref(false);

const handleClick = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      //接口
      if (formData.value.id) {
        const { pending, data, refresh, error } = await useAdminClassificationTagEditApi({ ...formData.value })
        loading.value = false;
        if (data.value) {
          emits('getTabList')
          close()
        }
      } else {
        const { pending, data, refresh, error } = await useAdminClassificationTagNewApi({ ...formData.value })
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
    classificationId: null,
    type: 'article',
    desc: '',
  };
  emits('update:show', false)
}


</script>
<style lang="scss" scoped></style>

