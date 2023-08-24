import { createDiscreteApi } from 'naive-ui';

export const useUser = () => useState('user', () => null);
export const useTheme = () => useState('theme', () => 'light');

// 更新用户信息
export async function useRefreshUserInfo() {
  const token = useCookie('token');
  const user = useUser();
  // 用户已登录，直接获取用户信息
  if (token.value) {
    let { data, error } = await useGetUserInfoApi();
    if (data.value) {
      user.value = data.value;
    }
    if (error.value) {
      const user = useUser();
      user.value = null;
      const token = useCookie('token');
      token.value = null;
    }
  }
}

// 退出登录
export async function useLogout() {
  await useUserLogoutApi();
  const user = useUser();
  user.value = null;
  const token = useCookie('token');
  token.value = null;
  const { message } = createDiscreteApi(['message']);
  message.success('退出登录成功');
  // 回到首页
  const route = useRoute();
  if (route.path != '/') {
    navigateTo('/', { replace: true });
  }
}

// 登录并且绑定手机号之后才能操作
export function useHasAuth(callback = null) {
  const route = useRoute();
  const token = useCookie('token');
  const user = useUser();
  const { message } = createDiscreteApi(['message']);
  // 未登录
  if (!token.value) {
    message.error('请先登录');
    return navigateTo('/login?from=' + route.fullPath);
  }

  // // 未绑定手机号
  // const phone = user.value?.phone;
  // if (!phone && route.name != 'bindphone') {
  //   message.error('请先绑定手机号');
  //   return navigateTo('/bindphone?from=' + route.fullPath);
  // }

  if (callback && typeof callback === 'function') {
    callback();
  }
}
