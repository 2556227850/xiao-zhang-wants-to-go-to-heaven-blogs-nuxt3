// 用户模块功能
/**
 * 注册获取邮箱验证码
 * @body {string} email 邮箱号
 */
export function useGetEmailCodeApi(body) {
  return useHttpPost('userGetEmailCode', '/user/getEmailCode', {
    body,
  });
}
/**
 * 注册
 * @body {string} email 邮箱号
 * @body {string} emailCode 邮箱验证码
 * @body {string} password 密码
 * @body {string} reenteredPassword 重复密码
 * @body {string} username 用户名
 */
export function useUserRegApi(body) {
  return useHttpPost('userReg', '/user/reg', {
    body,
  });
}
/**
 * 登录
 * @body {string} password 密码
 * @body {string} username 用户名
 */
export function useUserLoginApi(body) {
  return useHttpPost('userLogin', '/user/login', {
    body,
  });
}
/**
 * 获取用户信息
 */
export function useGetUserInfoApi() {
  return useHttpGet('userGetUserInfo', '/user/getinfo', {
    $: true,
  });
}
/**
 * 退出登录
 */
export function useUserLogoutApi() {
  return useHttpPost('userLogout', '/user/logout');
}
