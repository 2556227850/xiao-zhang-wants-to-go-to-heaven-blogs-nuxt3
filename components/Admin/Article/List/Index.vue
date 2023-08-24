<template>
  <div class="">
    <ClientOnly>
      <n-data-table :columns="columns" :data="list" :pagination="pagination" :row-key="(row) => row.id"
        default-expand-all />
    </ClientOnly>
  </div>
</template>

<script setup>
import { h } from 'vue';
import { NDataTable, NButton, NEllipsis, createDiscreteApi, NSwitch } from 'naive-ui';
const { $commonOpen,$dateFormat } = useNuxtApp();
const columns = ref([
  {
    title: '文章名称',
    key: 'title',

    render (row) {
      return h(
        NEllipsis,
        {
          style:'width: 100px'
        },
        {
          default: () => row.title,
        }
      );
    },
  },
  {
    title: '文章内容',
    key: 'html',
    render (row) {
      return h(
        NEllipsis,
        {
          style:'width: 100px',
          tooltip:false
        },
        {
          default: () => row.html.replace(/<[^>]+>/g, "")
          .replace(/[ ]|[&nbsp;]/g, "")
        }
      );
    },
  },
  {
    title: '是否热门',
    key: 'hot',
    render (row) {
      return h(
        NSwitch,
        { value: row.hot, disabled: true },
        null
      );
    },
  },
  {
    title: '创建时间',
    key: 'openTime',
    render (row) {
      return h(
        NEllipsis,
        {
          style:'width: 100px',

        },
        {
          default: () =>$dateFormat(row.openTime) ,
        }
      );
    },
  },
  {
    title: '修改时间',
    key: 'updateTime',
    render (row) {
      return h(
        NEllipsis,
        {
          style:'width: 100px',

        },
        {
          default: () => $dateFormat(row.updateTime),
        }
      );
    },
  },

  {
    title: '操作',
    key: 'actions',
    align: 'center',
    fixed: "right",
    width: 240,
    render (row) {
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
              $commonOpen({type:'router',url:'/admin/article/'+row.id})
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
                  const { pending, data, refresh, error } = await useAdminArticleListRemoveApi(row.id)
                  if (data.value) {
                    getTabList()
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


const list = ref([])


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
  }
});
const getTabList = async () => {
  const { pending, data, refresh, error } = await useAdminArticleListApi()
  if (data.value) {
    list.value = data.value.list
  }
}
getTabList()



</script>

<style lang="scss" scoped>
.card-title {
  margin-bottom: 10px;
}
</style>
