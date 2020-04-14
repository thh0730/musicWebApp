<template>
  <div>
    <swiper :options="swiperOption" class="banner">
      <!-- 封面界面 -->
      <swiper-slide class="cd">
        <div class="cd-wrapper" ref="cdWrapper">
          <img :src="currentSong.picUrl" alt="">
        </div>
        <p>{{getFistLyric()}}</p>
      </swiper-slide>
      <!-- 歌词界面 -->
      <swiper-slide class="lyric" ref="lyric">
        <ScrollView ref="scrollView">
          <ul>
            <li v-for="(value, index) in currentLyric" :key="index" :class="{'active' : currentLineNum === index}">
              {{value}}
            </li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', // 设置分页器一般状态下的类名
          bulletActiveClass: 'my-bullet-active' // 设置分页器激活时的类名
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      // console.log(newValue)
      /*
      // 1.歌词高亮
      const lineNum = Math.floor(newValue) + ''
      const result = this.currentLyric[lineNum]
      if (result !== undefined && result !== '') {
        this.currentLineNum = lineNum
        // 2.歌词滚动
        const currentLyricTop = document.querySelector('li.active').offsetTop
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
          console.log('开始滚动')
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        }
      }
       */
      // 1.歌词高亮
      const lineNum = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 2.歌词滚动
      const currentLyricTop = document.querySelector('li.active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        console.log('开始滚动')
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
  methods: {
    getFistLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .banner {
    position: fixed;
    top: 150px;
    bottom: 250px;
    left: 0;
    right: 0;
    /*background: #000;*/
    .cd {
      .cd-wrapper {
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 30px solid #ffffff;
        overflow: hidden;
        animation: sport 12s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin-top: 50px;
      }
    }
    .lyric {
      li {
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin: 10px 0;
        &:last-of-type {
          padding-bottom: 50%;
        }
        &.active {
          color: #ffffff;
        }
      }
    }
  }

  @keyframes sport {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<style lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .my-bullet {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #ffffff;
    margin: 0 20px;
  }
  .my-bullet-active {
    @include bg_color();
    width: 60px;
  }
</style>
