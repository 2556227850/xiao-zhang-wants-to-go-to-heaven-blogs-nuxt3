<template>
  <div class="article-info-content">
    <div class="head-classification">
      <ArticleInfoContentClassification :data="data.classification" />

    </div>
    <div class="underline">
      <n-ellipsis>
        {{ data.title }}
      </n-ellipsis>
      <hr class="wire" />
    </div>
    <MdPreviewV3 :content="data.content" />
    <div class="trail">
      <n-ellipsis>
        文章最后更新于 {{ $dateFormat(data.updateTime) }}
      </n-ellipsis>
    </div>

    <div class="info">
      <div class="text">
        <n-ellipsis>
          作者: {{ data.nickname }}
        </n-ellipsis>
      </div>
      <div>
        <n-ellipsis>
          版权声明: 转载请注明文章出处
        </n-ellipsis>
      </div>
    </div>
    <div class="bottom-classification">
      <ArticleInfoContentClassification :data="data.classification" />
    </div>
    <div class="bottom-tag">
      <ArticleInfoContentTag :data="data.tags" />
    </div>
  </div>
</template>

<script setup>
import { NEllipsis, NButton, NIcon } from 'naive-ui';
import { ThumbsUpSharp } from '@vicons/ionicons5';

defineProps({
  data: {
    type: Object,
    default: {}
  }
});


</script>

<style lang="scss" scoped>
.article-info-content {
  .underline {
    font-size: 20px;
    color: var(--info-color);
    font-weight: bold;

    .wire {
      margin: 10px auto 60px;
      border-top: none;
      border-bottom: 4px dashed var(--success-color);
      overflow: visible;
    }
  }

  .trail {
    color: var(--text-color-3);
    font-size: 12px;
    font-weight: bold;
    margin: 20px 0px;
  }

  .head-classification {
    margin: 20px 0px;

    .like {
      text-align: right;
      margin: 20px 0px;
    }
  }



  .bottom-classification {
    text-align: right;
    margin: 20px 0px;

  }

  .info {
    padding: 10px;
    border-left: 5px solid var(--info-color);
    background-color: var(--divider-color);
    border-radius: 5px;
    font-size: 16px;

    .text {
      margin-bottom: 10px;
    }
  }



}
</style>
