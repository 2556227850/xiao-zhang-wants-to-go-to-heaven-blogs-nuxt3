<template>
  <div class="home-saying">
    <div>
      <h1>
        <span v-for="(item, index) in data.title" :key="index">{{ item }}</span>
      </h1>
    </div>
    <div>
      <h3>
        <div :class="{ light: theme === 'light', dark: theme === 'dark', }">
          <span>
            {{ verse }}
          </span>
          <span class="twinkling">|</span>
        </div>
      </h3>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
});

// 全局主题色相关
const theme = useTheme()
const handleUpdateValue = (value) => {
  theme.value = value
}

const title = ref('路漫漫其修远兮.....')
const verse = ref('')

const funVerse = (text) => {
  let i = 0
  for (let index = 0; index < text.length; index++) {
    if (i === index) {
      var timer = setInterval(() => {
        if (text[i]) {
          verse.value += text[i]
          i = i + 1
        }
        if (i > text.length) {
          i = 0
          clearTimeout(timer)
        }
      }, 300);
    }
  }
}
funVerse(props.data.verse)

</script>

<style lang="scss" scoped>
// 主题背景色和body保持一致
.light {
  transition: all .6s ease-in-out;
  background: rgba(255, 255, 255, .6);
}

.dark {
  transition: all .6s ease-in-out;
  background: rgba(16, 16, 20, .6);

}

@media (min-width: 0px) {
  .home-saying {
    width: var(--mobileContentWidth);
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    height: 100px;

    h1 {

      span {
        transition: all .6s ease-in-out;
        cursor: default;
        padding: 3px;
        font-size: 40px;
      }

    }

    h3 {
      div {
        display: inline-block;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        font-size: 18px;

        span {
          font-weight: 200;
          padding: 3px;
        }

        .twinkling {
          font-weight: bold;
          animation: twinkling .6s infinite ease-in-out;
        }
      }
    }

  }
}

@media (min-width: 768px) {}


@media (min-width: 1200px) {}
</style>
