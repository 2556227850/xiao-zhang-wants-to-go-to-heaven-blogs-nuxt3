import { createDiscreteApi } from 'naive-ui';

export const fetchConfig = {
  baseURL: 'http://server.tcmoo.com:3004/api',
  // baseURL: 'http://18.119.138.133:3004/api',
  headers: {},
};

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL;
  options.headers = options.headers ?? {};
  options.lazy = options.lazy ?? false;
  // 用户登录，默认传token
  const token = useCookie('token');
  if (token.value) {
    options.headers.Authorization = `Bearer ${token.value}`;
  }
  return options;
}

export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;

  if (options.$) {
    const data = ref(null);
    const error = ref(null);
    return await $fetch(url, options)
      .then((res) => {
        if (res.info) {
          const { message } = createDiscreteApi(['message']);
          switch (res.infoType) {
            case 'info':
              message.info(res.code + ' ' + res.message);
              break;
            case 'error':
              message.error(res.code + ' ' + res.message);
              break;
            case 'warning':
              message.warning(res.code + ' ' + res.message);
              break;
            case 'success':
              message.success(res.code + ' ' + res.message);
              break;
          }
        }
        // 如果返回状态码code码等于500001，清除浏览器token
        if (res.code === 500001) {
          const token = useCookie('token');
          token.value = null;
          const route = useRoute();
          navigateTo('/login?from=' + route.fullPath);
        }

        data.value = res.data;
        return {
          data,
          error,
        };
      })
      .catch((err) => {
        const msg = err?.data?.message;
        if (process.client) {
          const { message } = createDiscreteApi(['message']);
          message.error(msg || '服务端错误');
        }
        error.value = msg;
        return {
          data,
          error,
        };
      });
  }

  let res = await useFetch(url, {
    ...options,
    // 相当于响应拦截器
    transform: (res) => {
      if (res.info) {
        const { message } = createDiscreteApi(['message']);
        switch (res.infoType) {
          case 'info':
            message.info(res.code + ' ' + res.message);
            break;
          case 'error':
            message.error(res.code + ' ' + res.message);
            break;
          case 'warning':
            message.warning(res.code + ' ' + res.message);
            break;
          case 'success':
            message.success(res.code + ' ' + res.message);
            break;
        }
      }

      // 如果返回状态码code码等于500001，清除浏览器token
      if (res.code === 500001) {
        const token = useCookie('token');
        token.value = null;
        const route = useRoute();
        navigateTo('/login?from=' + route.fullPath);
      }

      return res.data;
    },
  });

  // 客户端错误处理
  if (process.client && res.error.value) {
    const msg = res.error.value?.data?.message;
    if (!options.lazy) {
      const { message } = createDiscreteApi(['message']);
      message.error(msg || '服务端错误');
    }
  }

  return res;
}

// GET请求
export function useHttpGet(key, url, options = {}) {
  options.method = 'GET';
  return useHttp(key, url, options);
}

// POST请求
export function useHttpPost(key, url, options = {}) {
  options.method = 'POST';
  return useHttp(key, url, options);
}
