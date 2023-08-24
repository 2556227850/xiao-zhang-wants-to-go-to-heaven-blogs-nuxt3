<template>
  <div class="">
    <div class="card-title">
      <n-space>
        <n-radio-group
          size="small"
          v-model:value="type"
          name="type"
          @update:value="typeChange"
        >
          <n-space>
            <n-radio value="article"> 文章 </n-radio>
            <n-radio value="photos"> 相册 </n-radio>
          </n-space>
        </n-radio-group>
        <n-cascader
          size="small"
          style="width: 200px"
          clearable
          label-field="name"
          value-field="id"
          @update:value="classificationIdChange"
          v-model:value="classificationId"
          placeholder="请选择分类"
          :options="typeList"
        >
          <template #action> 你猜猜小张为什么想上天 </template>
        </n-cascader>
        <n-button
          :disabled="!classificationId"
          size="small"
          type="info"
          @click="newClick"
        >
          新增
        </n-button>
      </n-space>

      <AdminClassificationTagModel
        @getTabList="getTabList"
        v-model:show="showModel"
        :data="form"
        :options="typeList"
      />
    </div>
    <ClientOnly>
      <n-data-table
        :columns="columns"
        :data="list"
        :pagination="pagination"
        :row-key="(row) => row.id"
        default-expand-all
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { h } from 'vue';
import {
  NDataTable,
  NButton,
  NSpace,
  NRadio,
  NRadioGroup,
  NCascader,
  NEllipsis,
  createDiscreteApi,
} from 'naive-ui';
const { $commonOpen } = useNuxtApp();
const columns = ref([
  {
    title: '标签名称',
    key: 'name',
    render(row) {
      return h(
        NEllipsis,
        {},
        {
          default: () => row.name,
        }
      );
    },
  },
  {
    title: '备注',
    key: 'desc',
    render(row) {
      return h(
        NEllipsis,
        {
          style: 'width: 100px',
          tooltip: false,
        },
        {
          default: () => row.desc,
        }
      );
    },
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    fixed: 'right',
    width: 240,
    render(row) {
      return [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            secondary: true,
            size: 'small',
            type: 'info',
            style: 'margin-right:5px',
            onClick: () => {
              form.value = {
                ...row,
              };
              showModel.value = true;
            },
          },
          { default: () => '编辑' }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            type: 'error',
            onClick: () => {
              const { message, dialog } = createDiscreteApi([
                'message',
                'dialog',
              ]);

              const d = dialog.warning({
                title: '警告',
                content: '你确定要删除吗？',
                positiveText: '确定',
                negativeText: '取消',
                onPositiveClick: async () => {
                  d.loading = true;
                  const { pending, data, refresh, error } =
                    await useAdminClassificationTagRemoveApi(row.id);
                  if (data.value) {
                    getTabList();
                  }
                },
                onNegativeClick: () => {
                  message.error('删除取消');
                },
              });
            },
          },
          { default: () => '删除' }
        ),
      ];
    },
  },
]);

const typeList = ref([]);
const list = ref([]);

const type = ref('article');

const classificationId = ref(null);
const form = ref({});
const typeChange = (value) => {
  type.value = value;
  classificationId.value = null;
  getTabList();
};
const classificationIdChange = (value) => {
  classificationId.value = value;
  getTabList();
};
const showModel = ref(false);
const newClick = () => {
  form.value = {
    id: null,
    name: '',
    type: type.value,
    classificationId: classificationId.value,
    desc: '',
  };
  showModel.value = true;
};
const pagination = ref({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20, 30, 40, 50],
  onChange: (page) => {
    pagination.value.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.value.pageSize = pageSize;
    pagination.value.page = 1;
  },
});
const getTabList = async () => {
  const { pending, data, refresh, error } =
    await useAdminClassificationTagListApi({
      type: type.value,
      classificationId: classificationId.value,
    });
  if (data.value) {
    list.value = data.value.list;
    typeList.value = data.value.typeList;
  }
};

getTabList();
</script>

<style lang="scss" scoped>
.card-title {
  margin-bottom: 10px;
}
</style>
