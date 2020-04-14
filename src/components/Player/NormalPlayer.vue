<template>
  <transition
  @enter="enter"
  @leave="leave"
  :css="false"
  >
    <!--<div class="normal-player" v-show="this.$store.getters.isFullScreen">-->
    <!-- 利用mapGetters辅助函数简化代码调用 -->
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>
 </template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.slideUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideUpOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return
      }
      this.getSongLyric(newValue.id)
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
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
  .normal-player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /*background: pink;*/
    @include bg_sub_color();
    .player-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 999;
    }
    .player-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        filter: blur(8px);
        height: 100%;
      }
    }
  }
</style>
