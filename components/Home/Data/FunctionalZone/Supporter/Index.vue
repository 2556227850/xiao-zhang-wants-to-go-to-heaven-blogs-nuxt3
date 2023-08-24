<template>
  <div class="supporter">
    <n-card>
      <template #header>
        <span class="card-title">
          <n-icon>
            <GiftOutline />
          </n-icon>
          <n-ellipsis>

            赞赏名单
          </n-ellipsis>

        </span>
      </template>
      <div class="list">
        <div class="list-scroll">
          <div class="item" v-for="i in 10" :key="i">
            <div class="username">
              <n-ellipsis>
                <n-avatar :img-props="{ alt: '小张想上天' }" round size="large"
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                <span class="title">小张想上天</span>
              </n-ellipsis>

            </div>
            <div class="money">
              <n-ellipsis>
                {{ i }}元
              </n-ellipsis>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <n-button size="large" round type="success">
          赞赏
        </n-button>
      </div>

    </n-card>
  </div>
</template>

<script setup>
import { NCard, NIcon, NButton, NAvatar, NEllipsis } from 'naive-ui';
import { GiftOutline, } from '@vicons/ionicons5'

</script>

<style lang="scss" scoped>
@keyframes scroll {
  0% {
    transform: translateY(0);
  }


  100% {
    transform: translateY(-50%);
  }
}

.supporter {
  .list {
    font-size: 16px;
    overflow: hidden;
    height: 280px;

    .list-scroll {
      animation: scroll 15s linear infinite;

      .item {
        padding: 8px;
        display: flex;
        justify-content: space-between;

        .username {
          span {
            vertical-align: middle;

          }

          .title {
            margin-left: 5px;
          }
        }

        .money {
          margin-left: 10px;
          line-height: 40px;
        }
      }
    }

    .list-scroll:hover {
      animation: 15s scroll linear infinite paused;
    }
  }

  .button {
    padding: 20px;
    overflow: hidden;

    .n-button {
      font-size: 16px;
      transition: all 1s;
    }

    .n-button:hover {
      transform: scale(1.2);

    }

    text-align: center;
  }


  .n-card {
    border: none;
    border-radius: 10px;
    margin-top: 40px;
    visibility: visible;
    box-shadow: 1px 1px 3px var(--text-color-3);
    background: url('@/assets/img/cardback.png') 50%/cover no-repeat;

    .card-title {
      :deep(.n-ellipsis) {
        padding-left: 10px;
      }

      svg {
        vertical-align: bottom;
      }
    }
  }
}
</style>
