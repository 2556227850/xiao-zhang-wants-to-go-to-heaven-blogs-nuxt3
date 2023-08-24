<template>
  <div class="functional-zone">
    <div class="functional-zone-user">
      <HomeDataFunctionalZoneUser :data="data.user" />
    </div>
    <div class="functional-zone-recommend">
      <HomeDataFunctionalZoneRecommend :data="data.recommend" />
    </div>
    <div class="functional-zone-supporter">
      <HomeDataFunctionalZoneSupporter />
    </div>
    <div class="functional-zone-classification">
      <HomeDataFunctionalZoneClassification :data="data.classification" />
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
  .functional-zone {
    width: 100%;
    margin: 0 auto;

    &>div {
      margin-bottom: 40px;
    }
  }

}

@media (min-width: 1200px) {
  .functional-zone {
    width: calc(100% - 40px);
    max-width: 300px;
  }
}
</style>
