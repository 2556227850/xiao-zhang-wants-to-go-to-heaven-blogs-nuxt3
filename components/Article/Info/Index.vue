<template>
  <n-el tag="div">
    <div class="article-info">
      <div class="preview">
        <ArticleInfoBackgroundImage :data="data.info" />
        <ArticleInfoHead :data="data.info" :comment="updateInfo.comment" :like="updateInfo.like"
          :pageView="updateInfo.pageView" />
      </div>
      <div class="article-info-conter">
        <div class="article-info-main">
          <ArticleInfoContent :data="data.info" />
        </div>
        <div class="article-info-recommend-list">
          <ArticleInfoRecommend :data="data.recommend" :like="updateInfo.like" @updateArticleInfo="refresh()" />
        </div>
      </div>
      <div class="article-info-conter-comment">
        <div class="comment">
          <ArticleInfoComment />
        </div>
        <div class="coverage" />
      </div>
    </div>
  </n-el>
</template>

<script setup>
import { NEl, } from 'naive-ui';
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
});

useHead({
  title: props.data.info.title,
  meta: [
    {
      name: 'description',
      content: props.data.info.html.replace(/<[^>]+>/g, "")
        .replace(/[ ]|[&nbsp;]/g, "")
        .substring(0, 80),
    },
    {
      name: 'keywords',
      content: props.data.info.html.replace(/<[^>]+>/g, "")
        .replace(/[ ]|[&nbsp;]/g, "")
        .substring(0, 80),
    },
  ],
});

const route = useRoute()
const { id } = route.params;

const { pending, data: updateInfo, refresh, error } = await useHomeArticleUpdateInfoApi(id);



</script>

<style lang="scss" scoped>
@media (min-width: 0px) {
  .article-info {
    .preview {
      position: relative;
      height: 40vh;
    }

    .article-info-conter {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .article-info-main {
        width: var(--mobileContentWidth);
      }

      .article-info-recommend-list {
        width: var(--mobileContentWidth);
      }


    }

    .article-info-conter-comment {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .comment {
        width: var(--mobileContentWidth);
      }

      .coverage {
        width: var(--mobileContentWidth);
      }

    }



  }
}

@media (min-width: 768px) {}


@media (min-width: 1200px) {
  .article-info {

    .article-info-conter {
      .article-info-main {
        max-width: 800px;
      }

      .article-info-recommend-list {
        margin-left: 20px;
        max-width: 300px;
      }
    }

    .article-info-conter-comment {


      .comment {
        max-width: 800px;
      }

      .coverage {
        margin-left: 20px;
        max-width: 300px;
      }

    }
  }
}
</style>
