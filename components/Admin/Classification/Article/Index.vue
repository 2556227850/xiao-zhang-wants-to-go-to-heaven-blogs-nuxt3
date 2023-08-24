<template>
  <div class="">
    <div class="card-title">
      <n-button size="small" type="info" @click="newClick"> 新增 </n-button>
      <AdminClassificationArticleModel
        @getTabList="getTabList"
        v-model:show="showModel"
        :data="form"
        :options="list"
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
  NEllipsis,
  createDiscreteApi,
  NSwitch,
} from 'naive-ui';
const { $commonOpen } = useNuxtApp();
const columns = ref([
  {
    title: '分类名称',
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
    title: '是否热门',
    key: 'hot',
    render(row) {
      return h(NSwitch, { value: row.hot, disabled: true }, null);
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
            size: 'small',
            type: 'info',
            style: 'margin-right:5px',
            onClick: () => {
              form.value = {
                id: null,
                name: '',
                groupId: row.id,
                desc: '',
                type: null,
                hot: false,
                disabled: true,
              };
              showModel.value = true;
            },
          },
          { default: () => '新增' }
        ),
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
                disabled: true,
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
                    await useAdminClassificationArticleRemoveApi(row.id);
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

console.log(
  'DEBUG:\n页面(admin/classification)\nTODU:\n1、分类表格数据多级无法一键展开。\n2、犹豫考虑到时间成本技术限制分类表格的编辑暂时未完成。\n3、表格的分页搜索功能暂时搁置'
);

const list = ref([]);

const form = ref({});
const showModel = ref(false);
const newClick = () => {
  form.value = {
    id: null,
    name: '',
    groupId: null,
    type: null,
    desc: '',
    hot: false,
    disabled: false,
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
    await useAdminClassificationArticleListApi();
  if (data.value) {
    list.value = data.value.list;
  }
};
getTabList();
</script>

<style lang="scss" scoped>
.card-title {
  margin-bottom: 10px;
}
</style>
