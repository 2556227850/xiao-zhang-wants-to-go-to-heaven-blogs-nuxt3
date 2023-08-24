import dayjs from 'dayjs';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('commonOpen', (item) => {
    /**
     * @type { string } 使用跳转类型 webview 为外部跳转 router 为本站跳转
     * @url { string } 需要跳转的页面路径
     */
    const { url, type } = item;
    switch (type) {
      case 'webview':
        window.open(url);
        break;
      case 'router':
        navigateTo(url);
        break;
    }
  });

  nuxtApp.provide('dateFormat', (val, format = 'YYYY-MM-DD HH:mm:ss') => {
    /**
     * 时间格式
     * @val 时间戳
     * @format 返回时间类型
     */
    if (isNaN(val)) {
      return val;
    }
    val = parseInt(val);
    return dayjs(val).format(format);
  });
});
