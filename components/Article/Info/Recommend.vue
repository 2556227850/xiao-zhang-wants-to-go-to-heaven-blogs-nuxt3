<template>
  <div class="pc">
    <n-affix :trigger-top="60" position="fixed">
      <div class="like">
        <ClientOnly>
          <n-space>
            <n-button :loading="loading" v-if="user && like?.includes(user.username)" @click="likeClick($route.params.id)"
              circle size="large" type="success">
              <n-icon>
                <ThumbsUpSharp />
              </n-icon>
            </n-button>
            <n-button :loading="loading" v-else @click="likeClick($route.params.id)" circle size="large" secondary
              type="success">
              <n-icon>
                <ThumbsUpSharp />
              </n-icon>
            </n-button>
            <n-button circle size="large" secondary type="warning">
              <n-icon>
                <ShareSocialSharp />
              </n-icon>
            </n-button>
          </n-space>
        </ClientOnly>
      </div>
      <n-card hoverable>
        <div>
          <n-h3 prefix="bar">
            相关推荐
          </n-h3>
        </div>
        <div v-for="(item, index) in data" :key="index" class="recommend">
          <div class="list" @click="$commonOpen({ type: 'router', url: '/article/' + item.id })">
            <div class="data">
              <div class="img">
                <n-image preview-disabled object-fit="cover" :src="item.preview" />
              </div>
            </div>
            <div class="title">
              <n-ellipsis :tooltip="false" :line-clamp="1">
                {{ item.title }}
              </n-ellipsis>
              <div class="html">
                <ClientOnly>
                  <n-ellipsis :tooltip="false" :line-clamp="3">
                    {{ item.html.replace(/<[^>]+>/g, "")
                      .replace(/[ ]|[&nbsp;]/g, "") }}
                  </n-ellipsis>
                  <template #fallback>
                    <!-- this will be rendered on server side -->
                    <p>加载中...</p>
                  </template>
                </ClientOnly>
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
    </n-affix>
  </div>

  <div class="mobile">
    <div class="like">
      <ClientOnly>

        <n-space>
          <n-button :loading="loading" v-if="user && like?.includes(user.username)" @click="likeClick($route.params.id)"
            circle size="large" type="success">
            <n-icon>
              <ThumbsUpSharp />
            </n-icon>
          </n-button>
          <n-button :loading="loading" v-else @click="likeClick($route.params.id)" circle size="large" secondary
            type="success">
            <n-icon>
              <ThumbsUpSharp />
            </n-icon>
          </n-button>
          <n-button circle size="large" secondary type="warning">
            <n-icon>
              <ShareSocialSharp />
            </n-icon>
          </n-button>
        </n-space>
      </ClientOnly>
    </div>
    <n-card hoverable>
      <div>
        <n-h3 prefix="bar">
          相关推荐
        </n-h3>
      </div>
      <div v-for="(item, index) in data" :key="index" class="recommend">
        <div class="list" @click="$commonOpen({ type: 'router', url: '/article/' + item.id })">
          <div class="data">
            <div class="img">
              <n-image preview-disabled object-fit="cover" :src="item.preview" />
            </div>
          </div>
          <div class="title">
            <n-ellipsis :tooltip="false" :line-clamp="1">
              {{ item.title }}
            </n-ellipsis>
            <div class="html">
              <ClientOnly>
                <n-ellipsis :tooltip="false" :line-clamp="3">
                  {{ item.html.replace(/<[^>]+>/g, "")
                    .replace(/[ ]|[&nbsp;]/g, "") }}
                </n-ellipsis>
                <template #fallback>
                  <!-- this will be rendered on server side -->
                  <p>加载中...</p>
                </template>
              </ClientOnly>
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
import { NH3, NCard, NIcon, NImage, NButton, NEllipsis, NTag, NSpace, NAffix, createDiscreteApi } from 'naive-ui';
import { CalendarOutline, ThumbsUpSharp, ShareSocialSharp } from '@vicons/ionicons5'
const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  like: {
    type: Array,
    default: []
  },
});

const loading = ref(false)
const user = useUser();

const emits = defineEmits(['updateArticleInfo'])

const likeClick = async (id) => {
  const token = useCookie('token');
  const { message } = createDiscreteApi(['message']);
  // 未登录
  if (!token.value) {
    return message.error('请先登录');
  }
  loading.value = true
  const { pending, data, refresh, error } = await useHomeArticleLikeApi(id);
  loading.value = false

  if (data.value) {
    emits('updateArticleInfo')
  }

}
</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .pc {
    display: none;

    .n-affix {
      width: 100%;
      max-width: 300px;
    }
  }

  .mobile {
    display: block;
  }

  .like {
    margin: 20px 0px;

    .n-space {
      justify-content: center !important;
    }
  }

  .recommend {
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

      .title {
        font-size: 16px;
        width: calc(60% - 10px);

        .n-ellipsis {
          width: 100%;
        }

        .html {
          font-size: 12px;
        }
      }
    }

    .date {
      margin-top: 10px;
      font-size: 12px;
      color: var(--clear-color-hover);

      svg {
        vertical-align: bottom;
      }
    }

  }
}

@media (min-width: 1200px) {
  .pc {
    display: block;
  }

  .mobile {
    display: none;
  }

  .like {
    .n-space {
      justify-content: end !important;
    }
  }
}
</style>
