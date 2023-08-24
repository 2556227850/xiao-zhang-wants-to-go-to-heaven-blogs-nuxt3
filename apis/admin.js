// 博客后台模块

// 分类
/**
 * 获取文章分类列表
 *
 */
export function useAdminClassificationArticleListApi() {
  return useHttpGet(
    'adminClassificationArticleList',
    'admin/classification/article/list',
  );
}
/**
 * 新增文章分类
 * @body {string} id 唯一id
 * @body {string} name 名称
 * @body {string} groupId 父级id
 * @body {string} desc 备注
 *
 */
export function useAdminClassificationArticleNewApi(body) {
  return useHttpPost(
    'adminClassificationArticleNew',
    'admin/classification/article/new',
    {
      body,
    }
  );
}
/**
 * 编辑文章分类
 * @body {string} id 唯一id
 * @body {string} name 名称
 * @body {string} groupId 父级id
 * @body {string} desc 备注
 */
export function useAdminClassificationArticleEditApi(body) {
  return useHttpPost(
    'adminClassificationArticleEdit',
    'admin/classification/article/edit',
    {
      body,
    }
  );
}
/**
 * 删除文章分类
 * @id {string} id 唯一id
 */
export function useAdminClassificationArticleRemoveApi(id) {
  return useHttpGet(
    'adminClassificationArticleRemove',
    'admin/classification/article/remove/' + id
  );
}
// 标签
/**
 * 获取标签列表
 * @body {string} classificationId 绑定分类id
 * @body {string} type 标签类型
 */
export function useAdminClassificationTagListApi(body) {
  return useHttpPost(
    'adminClassificationTagList',
    'admin/classification/tag/list',
    {
      body,
    }
  );
}

/**
 * 新增分类标签
 * @body {string} id 唯一id
 * @body {string} name 名称
 * @body {string} classificationId 绑定分类id
 * @body {string} type 标签类型
 * @body {string} desc 备注
 *
 */
export function useAdminClassificationTagNewApi(body) {
  return useHttpPost(
    'adminClassificationTagNew',
    'admin/classification/tag/new',
    {
      body,
    }
  );
}
/**
 * 编辑分类标签
 * @body {string} id 唯一id
 * @body {string} name 名称
 * @body {string} classificationId 绑定分类id
 * @body {string} type 标签类型
 * @body {string} desc 备注
 */
export function useAdminClassificationTagEditApi(body) {
  return useHttpPost(
    'adminClassificationTagEdit',
    'admin/classification/tag/edit',
    {
      body,
    }
  );
}

/**
 * 删除分类标签
 * @id {string} id 唯一id
 */
export function useAdminClassificationTagRemoveApi(id) {
  return useHttpGet(
    'adminClassificationTagRemove',
    'admin/classification/tag/remove/' + id
  );
}
// 文章
/**
 * 根据分类获取文章标签列表
 * @body {string} classificationId 绑定分类id
 */
export function useAdminArticleWriteListApi(body) {
  return useHttpPost('adminArticleWriteList', 'admin/article/write/list', {
    body,
  });
}
/**
 * 创建文章
 * @body {string} title 文章标题
 * @body {string} content 文章md
 * @body {string} html 文章html
 * @body {Array} tag 文章绑定的标签
 * @body {string} classificationId 绑定分类id
 * @body {boolean} hot 热度
 * @body {file} preview 预览图文件
 */
export function useAdminArticleWriteNewApi(body) {
  return useHttpPost('adminArticleWriteNew', 'admin/article/write/new', {
    body,
  });
}
/**
 * 获取文章列表
 */
export function useAdminArticleListApi(body) {
  return useHttpPost('adminArticleList', 'admin/article/list', {
    body,
  });
}

/**
 * 删除文章
 * @id {string} id 唯一id
 */
export function useAdminArticleListRemoveApi(id) {
  return useHttpGet(
    'adminArticleListRemove',
    'admin/article/list/remove/' + id,
  );
}
/**
 * 获取文章详细数据
 * @id {string} id 唯一id
 */
export function useAdminArticleListInfoApi(id) {
  return useHttpGet('adminArticleListInfo', '/admin/article/list/info/' + id);
}

/**
 * 编辑文章详细
 * @id {string} id 唯一id
 * @body {string} title 文章标题
 * @body {string} content 文章md
 * @body {string} html 文章html
 * @body {Array} tag 文章绑定的标签
 * @body {string} classificationId 绑定分类id
 * @body {boolean} hot 热度
 * @body {file} preview 预览图文件
 */
export function useAdminArticleListEditApi(body) {
  return useHttpPost('adminArticleListEdit', '/admin/article/list/edit', {
    body,
  });
}

