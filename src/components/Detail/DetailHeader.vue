<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <div class="header-title">{{title}}</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    back () {
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
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
  @include bg_color();
  justify-content: space-between;
  /*position: relative;*/
  /*z-index: 999;*/
  .header-left,.header-right {
    width: 84px;
    height: 84px;
    /*background: #000;*/
    /* 垂直居中： (100px-84px) / 2 = 8px */
    margin-top: 8px;
  }
  .header-left {
    @include bg_img('../../assets/images/back')
  }
  .header-right {
    @include bg_img('../../assets/images/more')
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
