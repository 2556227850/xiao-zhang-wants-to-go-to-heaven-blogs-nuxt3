<template>
  <div class="inform">
    <div class="icon">
      <n-icon :size="22" color="var(--warning-color)">
        <VolumeHighOutline />
      </n-icon>
    </div>

    <div class="list">
      <div class="main" v-for="(item, index) in data" :key="index">
        <div class="title">
          <n-ellipsis>
            {{ item.title }}
          </n-ellipsis>
        </div>
        <div class="desc">
          <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
            {{ item.desc }}
          </n-ellipsis>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NEllipsis, NIcon } from 'naive-ui';
import { VolumeHighOutline } from '@vicons/ionicons5';

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .inform {
    overflow: hidden;
    font-size: 16px;
    padding: 22px;
    border: 1px dashed var(--border-color);
    color: var(--greyFont);
    border-radius: 10px;
    display: flex;
    align-items: center;

    .icon {
      animation: scale 0.8s ease-in-out infinite;
    }

    .list {
      color: var(--text-color-3);

      .main {
        display: flex;
        margin-left: 20px;

        .title {
          width: 25%;
          margin-right: 20px;
        }
        .desc {
          width: calc(75% - 20px);
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .inform {
    .list {
      .main {
        .title {
          width: 10%;
        }
        .desc {
          width: calc(90% - 20px);
        }
      }
    }
  }
}
</style>
