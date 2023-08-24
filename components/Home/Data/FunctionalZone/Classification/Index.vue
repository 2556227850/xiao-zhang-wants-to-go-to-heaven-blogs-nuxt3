<template>
  <div class="classification primary">
    <div
      class="item"
      v-for="(item, index) in data"
      :key="index"
      :class="{
        info: item.type === 'info',
        success: item.type === 'success',
        warning: item.type === 'warning',
        error: item.type === 'error',
      }"
    >
      <n-card>
        <template #header>
          <span class="card-title">
            <n-ellipsis> 分类 </n-ellipsis>
          </span>
        </template>
        <div class="title">
          <n-ellipsis>
            {{ item.name }}
          </n-ellipsis>
        </div>
        <div class="desc">
          <n-ellipsis :tooltip="false">
            {{ item.desc }}
          </n-ellipsis>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { NCard, NIcon, NButton, NAvatar, NEllipsis } from 'naive-ui';
defineProps({
  data: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="scss" scoped>
.classification {
  .item {
    cursor: pointer;

    .title {
      font-size: 25px;
      font-weight: 700;
    }

    .desc {
      font-size: 15px;
      margin-top: 15px;
      font-weight: bold;
    }

    .n-card {
      border: none;
      border-radius: 10px;
      margin-top: 40px;
      visibility: visible;
      box-shadow: 1px 1px 3px var(--text-color-3);
      transition: all 0.3s ease;
    }

    .n-card:hover {
      box-shadow: 0 5px 10px 5px var(--clear-color-hover);
    }
  }
}

.info {
  .n-card {
    background: linear-gradient(
      to right,
      var(--info-color),
      var(--info-color-hover)
    );
  }
}

.success {
  .n-card {
    background: linear-gradient(
      to right,
      var(--success-color),
      var(--success-color-hover)
    );
  }
}

.warning {
  .n-card {
    background: linear-gradient(
      to right,
      var(--warning-color),
      var(--warning-color-hover)
    );
  }
}

.error {
  .n-card {
    background: linear-gradient(
      to right,
      var(--error-color),
      var(--error-color-hover)
    );
  }
}
</style>
