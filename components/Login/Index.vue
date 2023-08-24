<template>
  <n-el tag="div" class="login-and-register-el">
    <div class="login-and-register">
      <div class="back-to-home">
        <LoginToHome />
      </div>
      <BackgroundImage />
      <div class="login-and-register-card">
        <div class="login-and-register-card-login"
          :class="{ activeNameCard: activeName === 'login', activeNameNoCard: activeName !== 'login' }">
          <LoginLogin :activeName="activeName" @updateActiveName="updateActiveName" />
        </div>
        <div class="login-and-register-card-register"
          :class="{ activeNameCard: activeName === 'register', activeNameNoCard: activeName !== 'register' }">
          <LoginRegister :activeName="activeName" @updateActiveName="updateActiveName" />
        </div>
      </div>
    </div>
  </n-el>
</template>

<script setup>

import {
  NEl,
  createDiscreteApi,
} from 'naive-ui';



const activeName = ref('login')

const updateActiveName = (v) => {
  activeName.value = v
}

</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .activeNameCard {
    width: 70%;
  }

  .activeNameNoCard {
    width: 30%;
  }

  .login-and-register {
    width: 100%;
    height: 100%;

    .back-to-home {
      position: absolute;
      top: -65%;
      left: 5vw;
      z-index: 99;
    }

    .login-and-register-card {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: .9;
      border-radius: 10px;
      box-shadow: 0 1px 20px -6px var(--clear-color-hover);
      overflow: hidden;
      height: 620px;
      width: var(--mobileContentWidth);
      display: flex;



      .login-and-register-card-login,
      .login-and-register-card-register {
        transition: all .6s ease-in-out;

      }
    }
  }
}

@media (min-width: 768px) {
  .login-and-register {

    .login-and-register-card {

      width: 800px;

    }
  }
}

@media (min-width: 1200px) {}
</style>
