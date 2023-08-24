<template>
  <div class="login" :style="{ background: activeName === 'login' ? 'var(--body-color)' : 'var(--error-color)' }">

    <div v-if="activeName === 'login'" class="is-login">
      <div class="title">
        登录
      </div>
      <n-form ref="formRef" :model="login" :rules="rules">
        <n-form-item-row path="username" label="用户名">
          <n-input :allow-input="(value) => !value || /^\d+$/.test(value)" v-model:value="login.username"
            placeholder="请输入用户名(用户名类型为数字)" />
        </n-form-item-row>
        <n-form-item-row path="password" label="密码">
          <n-input type="password" show-password-on="mousedown" v-model:value="login.password" placeholder="请输入密码" />
        </n-form-item-row>
      </n-form>
      <n-button class="log-but" :loading="loginLoading" type="primary" block secondary strong @click="loginCilck">
        登录
      </n-button>
    </div>
    <div v-else class="to-login">
      <n-button @click="toLogin" type="warning" ghost>
        去登录
        <template #icon>
          <n-icon>
            <LogInOutline />
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup>
import {
  NForm,
  NFormItemRow,
  NInput,
  NButton,
  NIcon,
  createDiscreteApi,
} from 'naive-ui';
import { LogInOutline } from '@vicons/ionicons5'
defineProps({
  activeName: {
    type: String,
    required: true
  }
})


const login = ref({
  username: null,
  password: null,
})
const rules = {
  username: [
    {
      required: true,
      min: 8,
      max: 12,
      message: '请输入8-12位数字组成的用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      min: 7,
      max: 16,
      message: '请输入7-16位字符组成的密码',
      trigger: 'blur',
    },

  ],
};

const route = useRoute();

const formRef = ref(null);


const loginLoading = ref(false);
const loginCilck = (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loginLoading.value = true;
      const { pending, data, refresh, error } = await useUserLoginApi({
        ...login.value,
      });
      loginLoading.value = false;

      if (data.value) {
        login.value = {
          username: null,
          password: null,
        };
        const token = useCookie('token');
        token.value = data.value.token;
        const user = useUser();
        user.value = data.value;
        // 跳转
        navigateTo(route.query.from || '/', { replace: true });
      }
    } else {
      console.log(errors);
    }
  });
};


const emits = defineEmits(['updateActiveName'])

const toLogin = () => {
  emits('updateActiveName', 'login')
}
</script>

<style lang="scss" scoped>
.login {
  transition: all .6s ease-in-out;
  height: 100%;
  position: relative;

  .to-login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .is-login {
    .title {
      font-weight: bold;
      font-size: 32px;
      text-align: center;
    }

    .log-but {
      margin-top: 20px;
    }

    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
