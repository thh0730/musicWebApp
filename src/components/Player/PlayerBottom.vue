<template>
    <div class="player-bottom">
      <div class="bottom-progress">
        <span ref="eleCurrentTime">00:00</span>
        <div class="progress-bar" @click="progressClick" ref="progressBar">
          <div class="progress-line" ref="progressLine">
            <div class="progress-dot"></div>
          </div>
        </div>
        <span ref="eleTotalTime">00:00</span>
      </div>
      <div class="bottom-control">
        <div class="mode loop" @click="mode" ref="mode"></div>
        <div class="prev" @click="prev"></div>
        <div class="play" @click="play" ref="play"></div>
        <div class="next" @click="next"></div>
        <div class="favorite" @click="favorite" :class="{'active': isFavorite(currentSong)}"></div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import type from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === type.loop) {
        this.setModeType(type.one)
      } else if (this.modeType === type.one) {
        this.setModeType(type.random)
      } else if (this.setModeType(type.random)) {
        this.setModeType(type.loop)
      }
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    formartTime (time) {
      // 2.得到两个时间之间的差值(秒)
      const differSecond = time
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24))
      day = day >= 10 ? day : '0' + day
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor(differSecond / (60 * 60) % 24)
      hour = hour >= 10 ? hour : '0' + hour
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor(differSecond / 60 % 60)
      minute = minute >= 10 ? minute : '0' + minute
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60)
      second = second >= 10 ? second : '0' + second
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }
    },
    progressClick (e) {
      // 1.计算进度条的位置
      // 进度条距离左边默认的位置
      // const normalLeft = e.target.offsetLeft
      const normalLeft = this.$refs.progressBar.offsetLeft
      // 用户点击的位置距离左边的位置
      const eventLeft = e.pageX
      // 实际点击到的位置 = 用户点击的位置距离左边的位置 - 进度条距离左边默认的位置
      const clickLeft = eventLeft - normalLeft
      // 获取整个进度条的宽度
      const progressWidth = this.$refs.progressBar.offsetWidth
      // 获取点击位置与整个进度条的宽度比例
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'

      // 2.计算当前应该播放的位置
      // 用总时长 * 进度条的比例 = 点击后播放的位置
      const currentTime = this.totalTime * value
      // 设置播放时间
      this.setCurTime(currentTime)
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      const result = this.favoriteList.find(currentValue => {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === type.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === type.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === type.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      // 获取选中歌曲最大时间
      const time = this.formartTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
    },
    // 获取选中歌曲进度时间
    currentTime (newValue, oldValue) {
      // 1.格式化当前播放的时间
      const time = this.formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // 2.根据当前播放时间计算比例
      const value = newValue / this.totalTime * 100
      // 3.由前景的宽度变化来实现进度条
      this.$refs.progressLine.style.width = value + '%'
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
  .player-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .bottom-progress {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        @include font_size($font_samll);
        @include font_color();
      }
      .progress-bar {
        margin: 0 10px;
        width: 100%;
        height: 10px;
        background: #ffffff;
        .progress-line {
          width: 0%;
          height: 100%;
          background: #ccc;
          position: relative;
          .progress-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #ffffff;
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .bottom-control {
      width: 80%;
      margin: 0 auto;
      padding: 50px 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        width: 84px;
        height: 84px;
      }
      .mode {
        &.loop {
          @include bg_img('../../assets/images/loop');
        }
        &.one {
          @include bg_img('../../assets/images/one');
        }
        &.random {
          @include bg_img('../../assets/images/shuffle');
        }
      }
      .prev {
        @include bg_img('../../assets/images/prev')
      }
      .play {
        @include bg_img('../../assets/images/play');
        &.active {
          @include bg_img('../../assets/images/pause')
        }
      }
      .next {
        @include bg_img('../../assets/images/next')
      }
      .favorite {
        @include bg_img('../../assets/images/un_favorite');
        &.active {
          @include bg_img('../../assets/images/favorite');
        }
      }
    }
  }
</style>
