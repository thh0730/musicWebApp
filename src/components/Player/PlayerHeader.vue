<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{currentSong.name}}</h3>
      <p>{{currentSong.singer}}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";

  .header {
    width: 100%;
    height: 100px;
    display: flex;
    //@include bg_color();
    justify-content: space-between;

    /*position: relative;*/
    /*z-index: 999;*/
    .header-left,
    .header-right {
      width: 84px;
      height: 84px;
      /*background: #000;*/
      /* 垂直居中： (100px-84px) / 2 = 8px */
      margin-top: 8px;
    }

    .header-left {
      @include bg_img('../../assets/images/down')
    }

    .header-right {
      // @include bg_img('../../assets/images/more')
    }

    .header-title {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      color: #fff;
      @include font_size($font_medium);
      @include no-wrap();
    }
  }
</style>
