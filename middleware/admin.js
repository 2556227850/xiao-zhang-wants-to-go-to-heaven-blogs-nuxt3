import { createDiscreteApi } from 'naive-ui';
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');
  const user = useUser();
  const route = useRoute();
  // 未登录
  if (!token.value) {
    if (process.client) {
      const { message } = createDiscreteApi(['message']);
      message.error('请先登录');
    }
    return navigateTo('/login?from=' + route.fullPath);
  }
  // 判断是否超级管理员邮箱
  const email = user.value?.email;
  if (email && email != '2556227850@qq.com') {
    if (process.client) {
      const { message } = createDiscreteApi(['message']);
      message.error('您不是超级管理员，没有访问后台权限！');
    }
    return navigateTo('/');
  }
});
