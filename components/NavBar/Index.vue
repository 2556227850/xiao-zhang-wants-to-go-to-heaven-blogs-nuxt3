<template>
  <n-el tag="div" class="nav-bar-el">
    <div class="nav-bar" :class="{
      light: theme === 'light',
      dark: theme === 'dark',
      navBarHidden: navBarHidden,
      navBarShow: !navBarHidden,
    }">
      <div class="title" @click="$commonOpen({ type: 'router', url: '/' })">
        小张想上天
      </div>
      <div class="menus">
        <ul>
          <li class="menu" v-for="(item, index) of menus" :key="index">
            <div class="my-dropdown" v-if="item.trigger === 'hover'">
              <n-dropdown :options="item.children" placement="bottom" trigger="hover" @select="menuSelect">
                <div>
                  <div class="my-dropdown-title" @click="menuClick(item)">
                    {{ item.icon }}
                    {{ item.label }}
                    <n-icon size="17" v-if="item.children.length > 0">
                      <CaretDownOutline />
                    </n-icon>
                    <n-icon v-else> </n-icon>
                  </div>
                  <div class="my-border-bottom"></div>
                </div>
              </n-dropdown>
            </div>
            <div class="my-dropdown" v-if="item.trigger === 'click'">
              <n-dropdown @clickoutside="clickoutside" @select="menuSelect" :options="item.children" placement="bottom"
                :show="showDropdown">
                <div>
                  <div class="my-dropdown-title" @click="menuClick(item)">
                    {{ item.icon }}
                    {{ item.label }}
                    <n-icon size="17" v-if="item.children.length > 0">
                      <svg t="1688365902160" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="15063">
                        <path
                          d="M779.5 839.8c-71.1 44.1-157.5 56.9-240.3 35.7l-45.3-11.7-278.6-71.6c-50.5-13-82.6-64.8-71.8-115.8 10.8-51 60.5-81.8 110.9-68.8l95.8 24.6-101.8-164-116.7-188.1c-28.1-45.2-15.7-103.7 27.6-130.6 43.3-26.9 101.2-12 129.3 33.2l110.7 178.5c3.3 5.3 10.1 7.1 15.2 3.9L646 221.5c48.2-30 112.7-13.4 143.9 37l84 135.3c95.9 154.5 53.6 354.2-94.4 446"
                          p-id="15064"></path>
                      </svg>
                    </n-icon>
                    <n-icon v-else>
                      <ArrowRedo />
                    </n-icon>
                  </div>
                  <div class="my-border-bottom"></div>
                </div>
              </n-dropdown>
            </div>
          </li>
          <li class="menu theme">
            <div>
              <n-switch @update:value="handleUpdateValue" :value="theme" checked-value="light" unchecked-value="dark">
                <template #checked> 浅色 </template>
                <template #unchecked> 深色 </template>
              </n-switch>
            </div>
          </li>
          <li class="menu user login">
            <div>
              <span @click="
                $commonOpen({
                  type: 'router',
                  url: '/login?from=' + $route.fullPath,
                })
                " v-if="!user">
                登录/注册
              </span>
              <n-dropdown :options="userOptions" @select="menuSelect" v-else>
                <div>
                  <n-avatar :img-props="{ alt: user.nickname }" @click="$commonOpen({ type: 'router', url: '/profile' })"
                    :src="user.avatar" round>
                  </n-avatar>
                </div>
              </n-dropdown>
            </div>
          </li>
        </ul>
      </div>
      <div class="mobile-menus">
        <n-icon size="30">
          <Menu />
        </n-icon>
      </div>
    </div>
  </n-el>
</template>

<script setup>
import { NDropdown, NIcon, NSwitch, NAvatar, NEl } from 'naive-ui';
import {
  CaretDownOutline,
  ArrowRedo,
  PersonCircleOutline,
  LogOutOutline,
  Menu,
  BuildSharp,
} from '@vicons/ionicons5';
const { $commonOpen } = useNuxtApp();

// 用户信息
const user = useUser();

// 全局主题色相关
const theme = useTheme();
const handleUpdateValue = (value) => {
  theme.value = value;
};

/**
 * 导航条显示隐藏相关 false显示导航 true隐藏菜单导航
 */
const navBarHidden = ref(false);

const oldScrollTop = ref(0);
/**
 *
 * return 如果是true隐藏菜单导航然后为false显示导航
 */
const hideOrNot = function (e) {
  // 滚动条距文档顶部的距离
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  // 滚动条滚动的距离
  let scrollStep = scrollTop - oldScrollTop.value;
  // 更新——滚动前，滚动条距文档顶部的距离
  oldScrollTop.value = scrollTop;
  if (scrollStep < 0) {
    navBarHidden.value = false;
    // console.log('滚动条向上滚动了！')
    // console.log(navBarHidden.value)
  } else {
    navBarHidden.value = true;
    // console.log('滚动条向下滚动了！！')
    // console.log(navBarHidden.value)
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', hideOrNot);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', hideOrNot);
});

// 用户相关

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const userOptions = ref([]);

if (user && user.value?.email === '2556227850@qq.com') {
  userOptions.value = [
    {
      label: '个人中心',
      key: 'profile',
      icon: renderIcon(PersonCircleOutline),
    },
    {
      label: '后台管理',
      key: 'admin',
      icon: renderIcon(BuildSharp),
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: renderIcon(LogOutOutline),
    },
  ];
} else {
  userOptions.value = [
    {
      label: '个人中心',
      key: 'profile',
      icon: renderIcon(PersonCircleOutline),
    },

    {
      label: '退出登录',
      key: 'logout',
      icon: renderIcon(LogOutOutline),
    },
  ];
}

// 菜单相关
const menus = [
  {
    id: '0',
    label: '首页',
    trigger: 'click',
    icon: '🏡',
    path: '/',
    children: [],
  },
  {
    id: '1',
    label: '百宝箱',
    icon: ' 🧰 ',
    path: '/',
    trigger: 'hover',
    children: [
      {
        id: '1-1',
        label: '编程好帮手',
        icon: '🧰',
        key: '1-1',
      },
    ],
  },
  {
    id: '2',
    label: '音乐',
    icon: '  🎺  ',
    path: '/',
    trigger: 'click',
    children: [
      {
        id: '2-1',
        label: '周杰伦',
        icon: '🎺',
        key: '2-1',
      },
    ],
  },
  {
    id: '3',
    label: '关于我',
    trigger: 'click',
    icon: ' 🐟 ',
    path: '/about',
    children: [],
  },
];

const menuSelect = async (e) => {
  console.log(e);
  switch (e) {
    case 'logout':
      await useLogout();
      break;
    case 'profile':
      $commonOpen({ type: 'router', url: '/profile' });
      break;
    case 'admin':
      $commonOpen({ type: 'router', url: '/admin' });
      break;
  }
};
// 控制菜单点击下拉弹框是否显示
const showDropdown = ref(false);
// 点击下拉菜单外弹框外关闭下拉菜单
const clickoutside = () => {
  setTimeout(function () {
    showDropdown.value = false;
  }, 10);
};
const menuClick = (menu) => {
  //1、点击导航菜单按钮，判断该菜单是否有子集下拉菜单 大于0为下拉菜单 小于等于 0 为一级菜单

  if (menu.children.length > 0) {
    switch (menu.trigger) {
      //1、点击导航菜单按钮，判断该菜单点击方式{trigger}是否为click
      case 'click':
        showDropdown.value = !showDropdown.value;
        console.log('当前为 click 下拉不允许点击跳转页面');
        break;
      //2、点击导航菜单按钮，判断该菜单点击方式{trigger}是否为hover
      case 'hover':
        //2-1 判断该菜单的跳转路径{path}是否为空 不等于空就跳转
        if (menu.path !== '') {
          console.log('当前为 hover 点击跳转页面');

          $commonOpen({ type: 'router', url: menu.path });
        } else {
          console.log('path路径不存在');
        }
        break;
      default:
        console.log('参数错误 -- 不存在');
        break;
    }
  } else {
    console.log('无下级直接跳转页面');
    $commonOpen({ type: 'router', url: menu.path });
  }
};
// 监听导航栏是否消失，如果消失关闭已经打开的下拉菜单
watch(navBarHidden, (v) => {
  if (v) {
    showDropdown.value = false;
  }
});
</script>

<style lang="scss" scoped>
// 是否隐藏导航 默认上下消失消失动画效果
.navBarHidden {
  overflow: hidden;
  height: 0px;
  opacity: 0;

  .menus,
  .title {
    opacity: 0;
    transition: all 0.6s ease-in-out;
  }
}

.navBarShow {
  height: 60px;
  opacity: 1;

  .menus,
  .title {
    opacity: 1;
    transition: all 0.6s ease-in-out;
  }
}

// 主题背景色和body保持一致
.light {
  transition: all 0.6s ease-in-out;
  box-shadow: 0 3px 3px 0 rgba(16, 16, 20, 0.05);
}

.dark {
  transition: all 0.6s ease-in-out;
  box-shadow: 0 3px 3px 0 rgba(255, 255, 255, 0.05);
}

/* 小屏 */
@media (min-width: 0px) {
  .nav-bar {
    // 导航高60px
    // 导航宽100%
    width: 100%;
    border-radius: 10px;
    user-select: none;
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.6s ease-in-out;
    background-color: var(--body-color);

    .title {
      font-weight: bold;
      font-size: 24px;
      white-space: nowrap;
      cursor: pointer;
      margin-left: 30px;
      transition: all 0.3s ease-in-out;
    }

    .title:hover {
      color: orange;
    }

    .menus {
      overflow: hidden;
      display: none;

      ul {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        padding: 0;

        .menu {
          position: relative;
          white-space: nowrap;
          margin: 0 12px;
          list-style-type: none;
          font-size: 17px;
          cursor: pointer;
          // 这里行高的作用是使菜单栏下方鼠标经过的橙色动画条位置 在对应菜单正下方不溢出整个导航区域(强迫症患者必须对齐)
          line-height: 60px;

          svg {
            vertical-align: bottom;
          }

          .my-dropdown {
            .my-dropdown-title {
              transition: all 0.3s ease-in-out;
              text-align: center;
            }

            .my-border-bottom {
              transition: all 0.3s ease-in-out;
              border-radius: 10px;
              top: 54px;
              width: 0px;
              height: 6px;
              position: absolute;
              background-color: orange;
            }
          }
        }

        .menu:hover {
          .my-dropdown {
            .my-dropdown-title {
              color: orange;
            }

            .my-border-bottom {
              width: 100%;
            }
          }
        }

        .theme {
          cursor: default;

          .n-switch {
            // 注意此地方的6px下边距是为了用户登录之后的头像能和导航中的菜单对齐（因为导航中菜单鼠标经过显示橙色动画条的是6px,而用户头像部分没有)
            margin-bottom: 6px;
            vertical-align: middle;

            :deep(.n-switch__checked, ),
            :deep(.n-switch__unchecked) {
              transition: all 0.3s ease-in-out;
            }
          }

          .n-switch:hover {

            :deep(.n-switch__checked, ),
            :deep(.n-switch__unchecked) {
              color: orange;
            }
          }
        }

        .login {
          cursor: default;
          margin-right: 30px;

          span {
            cursor: pointer;

            transition: all 0.3s ease-in-out;
          }

          span:hover {
            color: orange;
          }
        }

        .user {
          margin-right: 30px;

          .n-avatar {
            transition: all 0.3s ease-in-out;

            // 注意此地方的6px下边距是为了用户登录之后的头像能和导航中的菜单对齐（因为导航中菜单鼠标经过显示橙色动画条的是6px,而用户头像部分没有)
            margin-bottom: 6px;
            vertical-align: middle;
          }
        }

        .user:hover {
          .n-avatar {
            transform: rotate(360deg);
          }
        }
      }
    }

    .mobile-menus {
      margin-right: 30px;
      overflow: hidden;
      display: block;

      svg {
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }

  .nav-bar:hover {
    border-top-left-radius: 50px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 50px;
  }
}

/* 中屏 */
@media (min-width: 768px) {}

/* 大屏 */

@media (min-width: 1200px) {
  .nav-bar {
    .menus {
      display: block;
    }

    .mobile-menus {
      display: none;
    }
  }
}
</style>
