<template>
    <div class="detail">
      <DetailHeader class="sub-header" :title="playlist.name"></DetailHeader>
      <DetailTop :img-url="playlist.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <div class="scroll-wrapper">
          <ScrollView ref="scrollView">
            <DetailBottom :playlist="playlist.tracks"></DetailBottom>
          </ScrollView>
        </div>
      </div>
    </div>
</template>

<script>
import DetailHeader from '../components/Detail/DetailHeader'
import { getPlayList, getAlbum } from '../api'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playlist: {}
    }
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'albums') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollView.scrolling((offsetY) => {
      if (offsetY < 0) {
        const scale = Math.abs(offsetY) / defaultHeight
        // console.log(scale)
        this.$refs.top.changeMask(scale)
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        /*
        注意: 高斯模糊效果是非常消耗性能的,不推荐在移动端中使用
        如果非要在移动端中使用,那么建议只设置一次
        * */
      } else {
        // transform: scale -> 放大图片 1为默认大小, 参数越大图片越大
        // 向下拖拽时,offsetY会增加,除以默认高度得到的结果小于1,通过加1
        const scale = 1 + offsetY / defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/mixin";
  .detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    .scroll-wrapper {
      width: 100%;
      height: 100%;
    }
    .bottom {
      position: fixed;
      top: 500px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
