<template>
    <div>
      <!-- swiper的轮播bug，到达最后一张图片后停止，可以利用v-if="banners.length > 0"可使轮播功能恢复 -->
      <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
        <!-- slides -->
        <swiper-slide v-for="item in banners" :key="item.bannerId" class="item">
          <a :href="item.url">
            <img v-lazy="item.pic" alt="">
          </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 2000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>

<style lang="scss">
  @import "src/assets/css/mixin";
  .banner {
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      background: #fff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      @include bg_color()
    }
  }
</style>
