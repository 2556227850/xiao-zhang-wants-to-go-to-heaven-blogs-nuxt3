<template>
  <div @click="backTop" class="myBackTop" :class="{ hiddenScroll: scroll > visibilityHeight }">
  </div>
</template>

<script setup>
import { } from 'vue'
defineProps({
  visibilityHeight: {
    type: Number,
    default: 180
  }
})

const scroll = ref(0)
function handleScroll () {
  let scrollTop =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset;
  scroll.value = scrollTop
}
onBeforeMount(() => document.addEventListener('scroll', handleScroll));
onUnmounted(() => document.removeEventListener('scroll', handleScroll));
const backTop = () => {

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })

}
</script>

<style lang="scss" scoped>
.hiddenScroll {
  top: -50px !important;
}

.myBackTop {
  transition: all .6s ease-in-out;
  position: fixed;
  right: 5vh;
  top: -100%;
  z-index: 99;
  width: 70px;
  height: 100%;
  cursor: pointer;
  background: url('@/assets/img/top.jpg') no-repeat 50%;
  background-size: contain;

}
</style>
