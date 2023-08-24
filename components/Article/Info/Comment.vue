<template>
  <div class="article-info-comment">
    <div class="input">
      <div class="title">
        <n-icon size="20">
          <Create />
        </n-icon>
        评论
      </div>
      <div>
        <n-input type="textarea" />
      </div>
      <div class="button">
        <n-button type="info">
          发送
        </n-button>
      </div>
    </div>
    <div class="comment" v-for="index in 1" :key="index">
      <div class="title">
        全部评论 | 10条评论
      </div>
      <div class="message">
        <div>
          <div class="info">
            <div class="user">
              <div class="avatar">
                <n-avatar :img-props="{ alt: '小张想上天' }"
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
              </div>
              <div class="name">
                小张想上天</div>
              <div class="date">2020/3/3</div>
            </div>
            <div>
              <n-button type="warning" secondary size="small">
                回复
              </n-button>
            </div>
          </div>
          <div class="text">
            功能尚未开发，请等待！
          </div>
          <div class="reply">
            <div class="info">
              <div class="user">
                <div class="avatar">
                  <n-avatar :img-props="{ alt: '小张想上天' }"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                </div>
                <div class="name">小张想上天</div>
                <div class="date">2020/3/3</div>
              </div>
              <div>
                <n-button type="warning" secondary size="small">
                  回复
                </n-button>
              </div>
            </div>
            <div class="text">
              <span class="reply-user">
                @小麦
              </span>
              功能尚未开发，请等待！
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Create } from '@vicons/ionicons5';
import { NEllipsis, NButton, NIcon, NInput, NAvatar } from 'naive-ui';

</script>

<style lang="scss" scoped>
.article-info-comment {
  margin: 20px 0;

  .input {
    .title {
      color: var(--info-color);
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      margin-top: 40px;

      svg {
        vertical-align: bottom;
      }
    }

    .button {
      margin-top: 10px;
      text-align: right;
    }
  }

  .comment {
    .title {
      font-size: 16px;
      color: var(--success-color);
      margin-bottom: 20px;
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .reply {
      margin-left: 40px;
      margin-top: 10px;

      .reply-user {
        color: var(--info-color);
      }
    }

    .user {
      overflow: hidden;
      display: flex;
      align-items: center;
      font-size: 16px;

      .avatar {
        margin-right: 6px;
      }

      .name {
        color: var(--warning-color);

        margin-right: 10px;
        font-weight: bold;
        white-space: nowrap;
      }

      .date {
        color: var(--text-color-3);
        font-size: 12px;
      }
    }

    .text {
      margin-left: 40px;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      background-color: var(--divider-color);
      border-radius: 5px;
      font-size: 14px;
    }

  }
}
</style>
