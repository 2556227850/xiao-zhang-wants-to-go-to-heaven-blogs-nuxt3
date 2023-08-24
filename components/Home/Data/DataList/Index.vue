<template>
  <div class="data-list">
    <div class="data-list-inform">
      <HomeDataDataListInform :data="data.inform" />
    </div>
    <div class="data-list-list">
      <HomeDataDataListList :data="data.list" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
});
</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .data-list {
    margin: 0 auto;
    max-width: 100%;

    .data-list-inform {
      margin-bottom: 50px;
    }

    &>div {
      margin-bottom: 40px;
    }

  }
}

@media (min-width: 1200px) {
  .data-list {
    max-width: 780px;
  }
}
</style>
