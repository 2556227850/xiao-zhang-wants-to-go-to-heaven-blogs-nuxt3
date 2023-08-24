<template>
  <div class="article-info-head">
    <div class="info-div" :class="{ light: theme === 'light', dark: theme === 'dark', }">
      <div class="title">
        <n-ellipsis>
          {{ data.title }}
        </n-ellipsis>
      </div>
      <div class="info-message">
        <div class="tag">
          <n-ellipsis :line-clamp="1" :tooltip="false">
            <n-tag :bordered="false" type="info" v-for="(tag, i) in data.tags" :key="i">
              {{ tag.name }}
            </n-tag>
          </n-ellipsis>
        </div>
        <div class="message">
          <div class="date">
            <n-ellipsis>
              <span>
                {{ data.nickname }} · 文章发布于 {{ $dateFormat(data.openTime) }}
              </span>
            </n-ellipsis>
          </div>
          <div class="number">
            <n-ellipsis>
              <n-gradient-text type="error">
                <span>
                  <ClientOnly>
                    热度:{{ pageView }}
                    <template #fallback>
                      <!-- this will be rendered on server side -->
                      <span>加载中...</span>
                    </template>
                  </ClientOnly>
                </span>
              </n-gradient-text>
              <n-gradient-text type="info">
                <span>
                  <ClientOnly>
                    点赞数:{{ like?.length }}
                    <template #fallback>
                      <!-- this will be rendered on server side -->
                      <span>加载中...</span>
                    </template>
                  </ClientOnly>
                </span>
              </n-gradient-text>
              <n-gradient-text type="warning">
                <span>
                  <ClientOnly>
                    评论数:{{ comment?.length }}
                    <template #fallback>
                      <!-- this will be rendered on server side -->
                      <span>加载中...</span>
                    </template>
                  </ClientOnly>
                </span>
              </n-gradient-text>

            </n-ellipsis>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { NEllipsis, NGradientText, NTag, NSpace, } from 'naive-ui';

const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  comment: {
    type: Array,
    default: []
  },
  like: {
    type: Array,
    default: []
  },
  pageView: {
    type: Number,
    default: 0
  },
});

// 全局主题色相关
const theme = useTheme()
const handleUpdateValue = (value) => {
  theme.value = value
}

</script>

<style lang="scss" scoped>
@media (min-width: 0px) {

  .article-info-head {

    // 主题背景色和body保持一致
    .light {
      transition: all .6s ease-in-out;
      background: rgba(255, 255, 255, .6);
    }

    .dark {
      transition: all .6s ease-in-out;
      background: rgba(16, 16, 20, .6);

    }

    position: absolute;
    bottom: 20px;
    width: 100%;

    .info-div {
      padding: 10px 20px;
      border-radius: 10px;
      width: var(--mobileContentWidth);
      margin: 0 auto;

      .title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .info-message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .tag {
          width: 100%;

          .n-tag {
            cursor: pointer;
            margin-right: 10px;
          }
        }

        .message {
          width: 100%;

          .date {
            text-align: right;
            color: var(--text-color-3);

            span {
              font-size: 12px;
              font-weight: bold;
            }
          }

          .number {
            text-align: right;

            span {
              font-size: 12px;
              font-weight: bold;
              margin-right: 10px;
            }

            span:last-child {
              margin-right: 0;
            }
          }
        }

      }




    }


  }
}

@media (min-width: 768px) {}


@media (min-width: 1200px) {

  .article-info-head {

    .info-div {
      min-width: 1120px;
      width: 60%;

      .info-message {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .tag {
          width: 50%;
        }

        .message {
          width: 50%;

        }

      }
    }
  }
}
</style>
