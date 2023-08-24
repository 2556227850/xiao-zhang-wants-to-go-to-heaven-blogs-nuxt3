<template>
  <div class="about-me">
    　<iframe frameborder="0" scrolling="auto" src="http://about.tcmoo.com/"></iframe>
  </div>
</template>

<script setup>
import { } from 'vue';
</script>

<style lang="scss" scoped>
.about-me {
  height: 100vh;
  overflow: hidden;

  iframe {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    margin: 0;
    margin-top: -22px;
  }
}
</style>
