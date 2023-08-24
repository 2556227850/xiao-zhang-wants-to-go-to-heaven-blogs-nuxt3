<template>
  <div class="recommend">
    <n-card>
      <template #header>
        <span class="card-title">
          <n-icon :size="18" color="var(--error-color)">
            <BookOutline />
          </n-icon>
          <n-ellipsis>
            推荐文章
          </n-ellipsis>

        </span>
      </template>
      <div v-for="(item, index) in data" :key="index" class="recommend-item">
        <div class="list" @click="$commonOpen({ type: 'router', url: '/article/' + item.id })">
          <div class="data">
            <div class="img">
              <n-image preview-disabled object-fit="cover" :src="item.preview" :alt="item.title" />
            </div>
          </div>
          <div class="desc">
            <n-ellipsis :tooltip="false" :line-clamp="2">
              {{ item.title }}
            </n-ellipsis>
            <div class="tag">
              <n-ellipsis :tooltip="false">
                <n-tag v-for="(item, index) of item.tags" :bordered="false" type="info" :key="index">
                  {{ item.name }}
                </n-tag>
              </n-ellipsis>

            </div>

          </div>
        </div>
        <div class="date">
          <n-ellipsis>
            <n-icon color="var(--info-color)">
              <CalendarOutline />
            </n-icon>
            {{ $dateFormat(item.updateTime) }}
          </n-ellipsis>
        </div>
      </div>

    </n-card>
  </div>
</template>

<script setup>
import { NCard, NIcon, NImage, NEllipsis, NTag } from 'naive-ui';
import { BookOutline, CalendarOutline } from '@vicons/ionicons5'
defineProps({
  data: {
    type: Array,
    default: []
  }
});
</script>

<style lang="scss" scoped>
.recommend {
  .recommend-item {
    margin-bottom: 20px;

    .list {
      height: 100px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;

      .data {
        width: 40%;

        .img {
          height: 100%;

          .n-image {
            height: 100%;
            width: 100%;

            :deep(img) {
              border-radius: 3px;
              width: 100%;
              height: 100%;
            }
          }
        }

      }

      .desc {
        font-size: 16px;
        width: calc(60% - 10px);

        .tag {
          .n-tag {
            cursor: pointer;
            margin-right: 10px;
          }
        }
      }
    }

    .date {
      margin-top: 10px;
      font-size: 12px;
      color: var(--text-color-3);

      svg {
        vertical-align: bottom;
      }
    }

  }



  .n-card {
    border: none;
    border-radius: 10px;
    margin-top: 40px;
    visibility: visible;
    box-shadow: 0 1px 20px -6px var(--text-color-3);
    transition: all .3s ease;

    .card-title {
      :deep(.n-ellipsis) {
        padding-left: 10px;
      }

      svg {
        animation: scale 1s ease-in-out infinite;
        vertical-align: bottom;
      }
    }
  }

  .n-card:hover {
    box-shadow: 0 5px 10px 5px var(--clear-color-hover);
  }
}
</style>
