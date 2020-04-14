<template>
  <ul class="song-list">
    <li class="item"  v-for="item in songs" :key="item.id" @click="selectedMusic(item.id)">
      <img v-lazy="item.picUrl" alt="">
      <div>
        <h3>{{item.name}}</h3>
        <p>{{item.singer}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectedMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .song-list {
    width: 100%;
    overflow: hidden;
    .item {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-top: 20px;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div {
        h3 {
          @include font_size($font_large);
          @include font_color()
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
          margin-top: 20px;
        }
      }
    }
  }

</style>
