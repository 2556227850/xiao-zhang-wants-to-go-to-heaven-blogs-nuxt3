<template>
  <BackgroundImage />
  <div class="admin-center">
    <div class="menu">
      <n-card>
        <n-menu v-model:value="activeName" :options="menuOptions" />
      </n-card>
    </div>

    <div class="body">
      <div>
        <n-card>
          <template #header>
            <div class="mobile-menus">
              <n-icon size="30">
                <Menu />
              </n-icon>
            </div>
          </template>
          <NuxtPage :page-key="pageKey" />
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue';
import { NMenu, NCard, NIcon } from 'naive-ui';
import { Menu } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router';
const route = useRoute();
const pageKey = computed(() => route.fullPath);
const activeName = ref('');

watch(
  () => route.name,
  (val) => {
    if (val) {
      activeName.value = val;
    }
  },
  { immediate: true }
);

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin',
          },
        },
        { default: () => '数据分析' }
      ),
    key: 'admin',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin/home',
          },
        },
        { default: () => '首页配置' }
      ),
    key: 'admin-home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin/menus',
          },
        },
        { default: () => '菜单管理' }
      ),
    key: 'admin-menus',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin/classification',
          },
        },
        { default: () => '分类管理' }
      ),
    key: 'admin-classification',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin/article',
          },
        },
        { default: () => '文章管理' }
      ),
    key: 'admin-article',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/admin/background',
          },
        },
        { default: () => '背景设置' }
      ),
    key: 'admin-background',
  },

];
definePageMeta({
  middleware: ['admin'],
});

</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .admin-center {
    margin: 0 auto;
    width: var(--mobileContentWidth);
    padding-top: 70px;
    padding-bottom: 10px;
    height: 100vh;
    display: flex;
    justify-content: space-between;

    .menu {
      width: 20%;
      display: none;
    }

    .mobile-menus {
      display: block;

      .n-icon {
        vertical-align: middle;
      }
    }

    .body {
      overflow-x: hidden;
      width: 100%;
    }
  }
}

@media (min-width: 768px) {
  .admin-center {
    width: 80%;


    .menu {
      display: block;
    }

    .mobile-menus {
      display: none;
    }

    .body {
      width: calc(80% - 10px);

      .n-card {
        :deep(.n-card-header) {
          padding-top: 0px;
        }
      }
    }
  }
}
</style>