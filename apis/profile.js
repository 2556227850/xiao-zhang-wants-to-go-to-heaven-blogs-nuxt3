// 个人中心
/**
 * 修改用户头像
 * @body {binary} file 头像文件
 *
 */
export function useProfileUploadAvatarApi(body) {
  return useHttpPost('profileUploadAvatar', '/profile/upload/avatar', { body });
}
/**
 * 修改昵称
 * @body {string} nickname 昵称
 *
 */
export function useProfileUpdateNicknameApi(body) {
  return useHttpPost('profileUpdateNickname', '/profile/update/nickname', {
    body,
  });
}

/**
 * 修改性别
 * @body {string} gender 性别
 *
 */
export function useProfileUpdateGenderApi(body) {
  return useHttpPost('profileUpdateGender', '/profile/update/gender', { body });
}

/**
 * 修改简介
 * @body {string} Describe 简介
 *
 */
export function useProfileUpdateDescribeApi(body) {
  return useHttpPost('profileUpdateDescribe', '/profile/update/describe', {
    body,
  });
}
