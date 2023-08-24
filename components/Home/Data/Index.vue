<template>
  <div class="home-data">
    <div class="home-el-data">
      <div class="home-el-data-main">
        <div class="home-el-data-main-functional-zone">
          <HomeDataFunctionalZone :data="data.functionalZone" />
        </div>
        <div class="home-el-data-main-data-list">
          <LazyHomeDataDataList :data="data.dataList" />
        </div>
      </div>
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
  .home-data {
    height: 100%;

    .home-el-data {
      transition: all .6s ease-in-out;

      background-color: var(--body-color);
      height: 100%;
      padding-top: 40px;

      .home-el-data-main {
        width: var(--mobileContentWidth);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
        margin: 0 auto;
        flex-direction: row;

        .home-el-data-main-functional-zone {
          width: 100%;
        }

        .home-el-data-main-data-list {
          width: 100%;
        }
      }
    }
  }
}

@media (min-width: 768px) {}


@media (min-width: 1200px) {
  .home-data {

    .home-el-data {

      .home-el-data-main {
        width: 90%;
        padding: 0 20px 40px 20px;

        .home-el-data-main-functional-zone {
          width: 30%;
        }

        .home-el-data-main-data-list {
          width: 70%;
        }
      }
    }
  }
}
</style>
