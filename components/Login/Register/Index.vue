<template>
  <div class="register" :style="{ background: activeName === 'register' ? 'var(--body-color)' : 'var(--info-color)' }">

    <div v-if="activeName === 'register'" class="is-register">
      <div class="title">
        注册
      </div>
      <n-form ref="formRef" :model="reg" :rules="rules">
        <n-form-item-row path="username" label="用户名">
          <n-input :allow-input="(value) => !value || /^\d+$/.test(value)" v-model:value="reg.username"
            placeholder="请输入用户名(仅限数字)" />
        </n-form-item-row>
        <n-form-item-row path="nickname" label="昵称">
          <n-input maxlength="30" v-model:value="reg.nickname" placeholder="请输入昵称" />
        </n-form-item-row>
        <n-form-item-row path="email" label="邮箱">
          <n-input v-model:value="reg.email" placeholder="请输入邮箱" />
          <n-button type="primary" :disabled="!regEmail" :loading="isEmail" size="medium" @click="getEmailCodeClick">{{
            count != 0 ? count : '获取验证码' }}</n-button>
        </n-form-item-row>
        <n-form-item-row v-if="regEmail" path="emailCode" label="邮箱验证码">
          <n-input style="width: 50%" v-model:value="reg.emailCode" placeholder="请输入邮箱验证码" />
        </n-form-item-row>
        <n-form-item-row path="password" label="密码">
          <n-input maxlength="16" type="password" show-password-on="mousedown" v-model:value="reg.password"
            placeholder="请输入密码" />
        </n-form-item-row>
        <n-form-item-row path="reenteredPassword" label="重复密码">
          <n-input type="password" show-password-on="mousedown" v-model:value="reg.reenteredPassword"
            placeholder="请输入再次输入密码" />
        </n-form-item-row>
      </n-form>
      <n-button @click="handleValidateClick" :loading="regLoading" type="primary" block secondary strong>
        注册
      </n-button>
    </div>
    <div v-else class="to-register">
      <n-button @click="toRegister" type="warning" ghost>
        去注册
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

const reg = ref({
  username: null,
  nickname: null,
  email: null,
  emailCode: null,
  password: null,
  reenteredPassword: null,
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
  nickname: [
    {
      required: true,
      max: 30,
      message: '请输入1-30个字符组成的昵称',
      trigger: 'blur',
    },
  ],
  email: [
    {
      type: 'email',
      required: true,
      message: '邮箱格式不正确',
      trigger: ['input', 'blur'],
    },
  ],
  emailCode: [
    {
      required: true,
      max: 6,
      min: 6,
      message: '请输入六位数的验证码',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      max: 16,
      min: 7,
      message: '请输入7-16位字符组成的密码',
      trigger: 'blur',
    },
  ],
  reenteredPassword: [
    {
      required: true,
      validator (rule, value) {
        if (value !== reg.value.password) {
          return new Error('两次密码不一致');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
};
const regEmail = ref(false);
const regLoading = ref(false);
const formRef = ref(null);
watch(
  () => reg.value.email,
  (val) => {
    const mailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (mailReg.test(val)) {
      regEmail.value = true;
    } else {
      regEmail.value = false;
    }
  }
);

const handleValidateClick = (e) => {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      regLoading.value = true;
      const { pending, data, refresh, error } = await useUserRegApi({
        ...reg.value,
      });
      regLoading.value = false;
      if (data.value) {
        reg.value = {
          username: null,
          nickname: null,
          email: null,
          emailCode: null,
          password: null,
          reenteredPassword: null,
        };
        isEmail.value = false;
        count.value = 0
        clearInterval(timer.value);
        timer.value = null;
        emits('updateActiveName', 'login')

      }
    } else {
      console.log(errors);
    }
  });
};

const getEmailCodeClick = async () => {
  const { message } = createDiscreteApi(['message']);
  const mailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  if (mailReg.test(reg.value.email)) {
    const { pending, data, refresh, error } = await useGetEmailCodeApi({
      email: reg.value.email,
    });
    if (data.value) {
      Verification();
    }
  } else {
    message.warning('请检查邮箱!');
  }
};

const isEmail = ref(false);
const timer = ref(null);
const TIME_COUNT = 60;
const count = ref(0);
const Verification = () => {
  isEmail.value = true;
  if (!timer.value) {
    count.value = TIME_COUNT;
    timer.value = setInterval(() => {
      if (count.value > 0 && count.value <= TIME_COUNT) {
        count.value--;
        if (count.value === 0) {
          isEmail.value = false;
        }
      } else {
        clearInterval(timer.value);
        timer.value = null;
      }
    }, 1000);
  }
};


const emits = defineEmits(['updateActiveName'])
const toRegister = () => {
  emits('updateActiveName', 'register')
}
</script>

<style lang="scss" scoped>
.register {
  transition: all .6s ease-in-out;
  height: 100%;
  position: relative;



  .to-register {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .is-register {
    .title {
      font-weight: bold;
      font-size: 32px;
      text-align: center;
    }

    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
