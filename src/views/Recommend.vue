<template>
  <div class="recommend">
   <div class="recommend-wrapper">
     <ScrollView>
       <div>
         <Banner :banners="banners"></Banner>
         <!-- 推荐歌单 -->
         <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
         <!-- 组件复用：最新专辑 -->
         <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>
         <!-- 推荐新音乐 -->
         <Song :songs="songs"></Song>
       </div>
     </ScrollView>
   </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewestAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import Song from '../components/Recommend/Song'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    Song,
    ScrollView
  },
  data () {
    return {
      // 轮播图数据
      banners: [],
      // 推荐歌单数据
      personalized: [],
      // 最新专辑数据
      albums: [],
      // 推荐新音乐数据
      songs: []
    }
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  created () {
    // 获取轮播图图片
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch(function (err) {
        console.log(err)
      })

    // 获取推荐歌单
    getPersonalized()
      .then((data) => {
        // console.log(data)
        this.personalized = data.result
      })
      .catch(function (err) {
        console.log(err)
      })

    // 获取最新专辑
    getNewestAlbum()
      .then((data) => {
        // console.log(data)
        // 业务需求，界面只显示6条
        this.albums = data.albums.splice(0, 6)
      })
      .catch(function (err) {
        console.log(err)
      })

    // 获取最新音乐数据
    getNewSong()
      .then((data) => {
        // console.log(data.result)
        // this.newSong = data.result
        const list = []
        data.result.forEach(value => {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
}
  .v-enter {
  transform: translateX(100%);
  }
  .v-enter-to {
    transform: translateX(0%);
  }
  .v-enter-active {
    transition: transform 0.5s;
  }
  .v-leave {
    transform: translateX(0%);
  }
  .v-leave-to {
    transform: translateX(100%);
  }
  .v-leave-active {
    transition: transform 0.5s;
  }
  .recommend-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
