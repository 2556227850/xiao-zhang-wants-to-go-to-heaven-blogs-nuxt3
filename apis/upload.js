/**
 * 文本编辑器上传图片文件
 * @id {string} id 唯一id
 */
export function useAdminArticleUploadMdEditorImgApi(body) {
  return useHttpPost('adminArticleUploadMdEditorImg', '/admin/article/upload/mdEditorImg',{body});
}
