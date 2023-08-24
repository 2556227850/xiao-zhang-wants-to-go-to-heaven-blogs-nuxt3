<template>
  <div class="user">
    <n-card>
      <div class="user-info">
        <div class="avatar">
          <n-avatar :size="120" :src="data.avatar" :img-props="{ alt: data.name }" round>
          </n-avatar>
        </div>
        <div class="title">
          <n-ellipsis>
            {{ data.name }}
          </n-ellipsis>
        </div>
        <div class="article-class">
          <div>
            <div>文章</div>
            <div class="number">
              {{ data.articleCount }}
            </div>
          </div>
          <div>
            <div>分类</div>
            <div class="number">
              {{ data.classificationCount }}
            </div>
          </div>
        </div>
        <div class="dynamic">
          <div class="scroll"></div>
          <div class="text">
            <n-icon>
              <StarOutline />
            </n-icon>
            动态
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { NCard, NAvatar, NIcon, NEllipsis } from 'naive-ui';
import { StarOutline } from '@vicons/ionicons5'
defineProps({
  data: {
    type: Object,
    default: {}
  }
});

</script>

<style lang="scss" scoped>
.user {

  .user-info {
    overflow: hidden;
    text-align: center;

    .avatar {
      .n-avatar {
        transition: all .3s ease-in-out;
      }
    }

    .avatar:hover {
      .n-avatar {
        transform: rotate(360deg);
      }
    }

    .title {
      font-size: 30px;
      font-weight: 700;
      margin: 20px 0;
    }

    .article-class {
      font-size: 16px;
      display: flex;
      justify-content: space-around;

      .number {
        margin-top: 12px;
      }
    }

    .dynamic {
      font-size: 16px;
      position: relative;
      margin: 12px auto;
      background: var(--clear-color);
      cursor: pointer;
      width: 80%;
      height: 35px;
      border-radius: 1rem;
      text-align: center;
      line-height: 35px;
      overflow: hidden;

      .scroll {
        width: 0;
        border-radius: 1rem;
        height: 35px;
      }

      .text {
        white-space: nowrap;
        position: absolute;
        transform: translate(-50%, 0);
        top: 0;
        left: 50%;

        svg {
          vertical-align: middle;
        }
      }
    }

    .dynamic:hover {
      .scroll {
        width: 100%;
        background: var(--info-color-hover);
        transform: scaleX(1);
        transform-origin: 0;
        transition: all .5s ease-out;
        transition-timing-function: cubic-bezier(.45, 1.64, .47, .66);
      }
    }
  }


  .n-card {
    border: none;
    border-radius: 10px;
    background: linear-gradient(-45deg, var(--success-color), var(--success-color-hover), var(--info-color), var(--warning-color), var(--warning-color-hover));
    background-size: 400% 400%;
    box-shadow: 0 1px 20px -6px var(--text-color-3);
    animation: gradientBG 10s ease infinite;
    transition: all .3s ease;
  }

  .n-card:hover {
    box-shadow: 0 5px 10px 5px var(--clear-color-hover);
  }
}
</style>
