<template>
  <div class="list">
    <div class="list-title">
      <n-icon :size="22" color="var(--success-color)">
        <LogoOctocat />
      </n-icon>
      <n-ellipsis>
        最新发布
      </n-ellipsis>

    </div>
    <div class="article-list" v-for="(item, index) in data" :key="index">

      <div class="article-list-left" v-if="index % 2 === 0 || innerWidth < 1200">
        <div class="preview">
          <n-image object-fit="cover" :alt="item.title" :src="item.preview" preview-disabled />
        </div>
        <div class="content">
          <div class="date">
            <n-icon :size="12" color="var(--info-color)">
              <CalendarOutline />
            </n-icon>
            <n-ellipsis :line-clamp="1" :tooltip="false">
              更新于 {{ $dateFormat(item.updateTime) }}
            </n-ellipsis>
          </div>
          <div class="title" @click="$commonOpen({ type: 'router', url: '/article/' + item.id })">
            <n-ellipsis :line-clamp="1">
              {{ item.title }}
            </n-ellipsis>
          </div>
          <div class="number">
            <n-ellipsis :line-clamp="1" :tooltip="false">
              <span class="span">
                <n-icon :size="12" color="var(--error-color)">
                  <Flame />
                </n-icon>
                {{ item.pageView }}热度 </span>
              <span class="span">
                <n-icon :size="12" color="var(--error-color)">
                  <ChatbubbleEllipses />
                </n-icon>
                {{ item.comment.length }}评论 </span>
              <span class="span">
                <n-icon :size="12" color="var(--error-color)">
                  <ThumbsUp />
                </n-icon>
                {{ item.like.length }}点赞 </span>
            </n-ellipsis>
          </div>
          <div class="desc">
            <ClientOnly>
              <n-ellipsis :line-clamp="4" :tooltip="false">
                {{ item.html.replace(/<[^>]+>/g, "")
                  .replace(/[ ]|[&nbsp;]/g, "") }}
              </n-ellipsis>
              <template #fallback>
                <!-- this will be rendered on server side -->
                <p>加载中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="tag">
            <n-ellipsis :line-clamp="1" :tooltip="false">
              <n-tag :bordered="false" type="info" v-for="(tag, i) in item.tags" :key="i">
                {{ tag.name }}
              </n-tag>
            </n-ellipsis>

          </div>
        </div>

      </div>
      <div class="article-list-right" v-else>

        <div class="content">
          <div class="date">
            <n-icon :size="12" color="var(--info-color)">
              <CalendarOutline />
            </n-icon>
            <n-ellipsis :line-clamp="1" :tooltip="false">
              更新于 {{ $dateFormat(item.updateTime) }}
            </n-ellipsis>
          </div>
          <div class="title" @click="$commonOpen({ type: 'router', url: '/article/' + item.id })">
            <n-ellipsis :line-clamp="1">
              {{ item.title }}
            </n-ellipsis>
          </div>
          <div class="number">
            <n-ellipsis :line-clamp="1" :tooltip="false">
              <span class="span">
                <n-icon :size="12" color="var(--error-color)">
                  <Flame />
                </n-icon>
                {{ item.pageView }}热度 </span>
              <span class="span">
                <n-icon :size="12" color="var(--error-color)">
                  <ChatbubbleEllipses />
                </n-icon>
                {{ item.comment.length }}评论 </span>
              <span class="span">
                <n-icon :size="12" color="var(--error-color)">
                  <ThumbsUp />
                </n-icon>
                {{ item.like.length }}点赞 </span>
            </n-ellipsis>
          </div>
          <div class="desc">
            <ClientOnly>
              <n-ellipsis :line-clamp="4" :tooltip="false">
                {{ item.html.replace(/<[^>]+>/g, "")
                  .replace(/[ ]|[&nbsp;]/g, "") }}
              </n-ellipsis>
              <template #fallback>
                <!-- this will be rendered on server side -->
                <p>加载中...</p>
              </template>
            </ClientOnly>
          </div>
          <div class="tag">
            <n-ellipsis :line-clamp="1" :tooltip="false">
              <n-tag :bordered="false" type="info" v-for="(tag, i) in item.tags" :key="i">
                {{ tag.name }}
              </n-tag>
            </n-ellipsis>

          </div>
        </div>
        <div class="preview">
          <n-image object-fit="cover" :alt="item.title" :src="item.preview" preview-disabled />
        </div>
      </div>
    </div>
    <div class="next-page">
      <n-button size="large" type="success" ghost round>
        下一页
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { NIcon, NEllipsis, NTag, NImage, NButton } from 'naive-ui';
import { LogoOctocat, CalendarOutline, Flame, ChatbubbleEllipses, ThumbsUp } from '@vicons/ionicons5';
const props = defineProps({
  data: {
    type: Array,
    default: []
  }
});

const innerWidth = ref(0)


onMounted(() => {
  innerWidth.value = window.innerWidth
  window.onresize = () => {
    return (() => {
      innerWidth.value = window.innerWidth
    })()
  }
})
</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .list {
    .list-title {
      margin-bottom: 50px;

      :deep(.n-ellipsis) {
        padding-left: 10px;
      }

      svg {
        vertical-align: middle;
      }

      padding-bottom: 5px;
      font-size: 16px;
      border-bottom: 1px dashed var(--border-color);
    }

    .article-list {
      .article-list-left {
        height: 100%;
        // cursor: pointer;
        margin-bottom: 40px;
        box-shadow: 0 1px 20px -6px var(--text-color-3);
        transition: all .3s ease;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        flex-wrap: wrap;


        .content {
          width: 100%;
          padding: 20px;

          .n-ellipsis {
            vertical-align: middle;
          }

          .date {
            font-size: 12px;
            color: var(--text-color-3);

            :deep(.n-ellipsis) {
              padding-left: 5px;
            }

            svg {
              vertical-align: middle;
            }
          }

          .title {
            padding: 15px 0;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;

            :deep(.n-ellipsis) {
              width: 100%;
              vertical-align: middle;
            }
          }

          .number {

            .span {
              margin-right: 5px;

              svg {
                vertical-align: bottom;
              }
            }

            color: var(--text-color-3);
            font-size: 12px;
            margin-bottom: 15px;
          }

          .desc {
            min-height: 102px;
            margin-bottom: 12px;
            font-size: 15px;
            line-height: 1.7;
          }

          .tag {
            .n-tag {
              cursor: pointer;
              margin-right: 10px;
            }
          }
        }

        .preview {
          width: 100%;
          height: 200px;
          overflow: hidden;


          .n-image {
            height: 100%;
            width: 100%;

            :deep(img) {
              transition: all 1s;
              height: 100%;
              width: 100%;
            }

            :deep(img:hover) {
              transform: scale(1.2);
            }
          }
        }
      }

      .article-list-right {
        height: 100%;
        // cursor: pointer;
        margin-bottom: 40px;
        box-shadow: 0 1px 20px -6px var(--text-color-3);
        transition: all .3s ease;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        overflow: hidden;
        flex-wrap: wrap;

        .content {
          width: 100%;
          padding: 20px;

          .n-ellipsis {
            vertical-align: middle;
          }

          .date {
            font-size: 12px;
            color: var(--text-color-3);

            :deep(.n-ellipsis) {
              padding-left: 5px;
            }

            svg {
              vertical-align: middle;
            }
          }

          .title {
            padding: 15px 0;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;

            :deep(.n-ellipsis) {
              width: 100%;
              vertical-align: middle;
            }
          }

          .number {

            .span {
              margin-right: 5px;

              svg {
                vertical-align: bottom;
              }
            }

            color: var(--text-color-3);
            font-size: 12px;
            margin-bottom: 15px;
          }

          .desc {
            min-height: 102px;
            margin-bottom: 12px;
            font-size: 15px;
            line-height: 1.7;
          }

          .tag {
            .n-tag {
              cursor: pointer;
              margin-right: 10px;
            }
          }
        }

        .preview {
          width: 100%;
          height: 200px;
          overflow: hidden;


          .n-image {
            height: 100%;
            width: 100%;

            :deep(img) {
              transition: all 1s;
              height: 100%;
              width: 100%;
            }

            :deep(img:hover) {
              transform: scale(1.2);
            }
          }
        }
      }


      .article-list-left:hover,
      .article-list-right:hover {
        box-shadow: 0 5px 10px 5px var(--clear-color-hover);
      }
    }

    .next-page {
      text-align: center;
    }


  }
}

@media (min-width: 768px) {}

@media (min-width: 1200px) {
  .list {
    .article-list {
      .article-list-left {
        height: 300px;

        .content {
          width: 50%;

          padding: 20px;
        }

        .preview {
          width: 50%;
          height: 100%;

        }
      }

      .article-list-right {
        height: 300px;

        .content {
          width: 50%;

          padding: 20px;
        }

        .preview {
          width: 50%;
          height: 100%;


        }
      }
    }
  }
}
</style>
