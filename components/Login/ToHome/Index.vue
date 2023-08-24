<template>
  <div @click="backToHome" class="my-to-home">
  </div>
</template>

<script setup>
// 回到首页
const route = useRoute();
const backToHome = () => {
  navigateTo(route.query.from || '/', { replace: true });

}
</script>

<style lang="scss" scoped>
@keyframes toHome {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

.hiddenScroll {
  top: -50px !important;
}

.my-to-home {
  animation: toHome 1s linear infinite;
  animation-iteration-count: 1;
  z-index: 99;
  width: 70px;
  height: 100vh;

  cursor: pointer;
  background: url('@/assets/img/top.jpg') no-repeat 50%;
  background-size: contain;
}
</style>
