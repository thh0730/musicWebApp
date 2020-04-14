<template>
    <div class="detail-top">
      <div class="img-container">
        <img :src="imgUrl" alt="">
        <div class="mask" ref="mask"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    imgUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    changeMask (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top {
  width: 100%;
  height: 500px;
  position: relative;
  z-index: -1;
  overflow: hidden;
  .img-container {
    img {
      width: 100%;
    }
    .mask {
      position: absolute;
      background: #000;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
}
</style>
