/**
 * 首页数据列表
 */
export function useHomeDataApi() {
  return useHttpGet('homeData', '/home', {
    lazy: true,
  });
}

/**
 * 首页文章详情页数据
 * @id {string} id 唯一id
 */
export function useHomeArticleInfoApi(id) {
  return useHttpGet('homeArticleInfo', '/home/article/info/' + id, {
    lazy: true,
  });
}

/**
 * 首页文章详情更新页面数据
 * @id {string} id 唯一id
 */
export function useHomeArticleUpdateInfoApi(id) {
  return useHttpGet(
    'homeArticleUpdateInfo',
    '/home/article/update/info/' + id,
  );
}

/**
 * 文章详情点赞文章
 * @id {string} id 唯一id
 */
export function useHomeArticleLikeApi(id) {
  return useHttpGet('homeArticleLike', '/home/article/like/' + id);
}
