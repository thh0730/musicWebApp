<template>
    <ul class="detail-bottom">
      <li class="bottom-top" @click="selectAllMusic">
        <div class="bottom-icon"></div>
        <div class="bottom-title">播放全部</div>
      </li>
      <li class="item" v-for="item in playlist" :key="item.id" @click="selectedMusic(item.id)">
        <h3>{{item.name}}</h3>
        <p>{{item.al.name}} - {{item.ar[0].name}}</p>
      </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    // 通过mapActions辅助函数分发Action
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectedMusic (id) {
      // this.$store.dispatch('setFullScreen', true)
      this.setFullScreen(true)
      this.setSongDetail([id])
    },
    selectAllMusic () {
      this.setFullScreen(true)
      const ids = this.playlist.map(item => {
        return item.id
      })
      this.setSongDetail(ids)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";

  .detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #cccccc;
  }
    .bottom-top {
      display: flex;
      align-items: center;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      .bottom-icon {
        width: 60px;
        height: 60px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;

      }
      .bottom-title {
        @include font_color();
        @include font_size($font_large);
      }
    }
    .item {
      h3 {
        @include font_color();
        @include font_size($font_medium);

      }
      p {
        @include font_size($font_samll);
        @include font_color();
        margin-top: 10px;
        opacity: 0.8;
      }
    }
}
</style>
