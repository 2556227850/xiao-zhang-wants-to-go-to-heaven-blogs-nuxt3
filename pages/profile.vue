<template>
  <BackgroundImage />
  <div class="profile-center">
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
            path: '/profile',
          },
        },
        { default: () => '个人信息' }
      ),
    key: 'profile',
  },
];

definePageMeta({
  middleware: ['auth'],
});
</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .profile-center {
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
  .profile-center {
    width: 80%;


    .menu {
      display: block;
    }

    .mobile-menus {
      display: none;
    }

    .body {
      width: calc(80% - 10px);
    }
  }
}
</style>