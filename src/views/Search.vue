<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input type="text" placeholder="请输入想要收听的歌曲名称" v-model="keywords" v-throttle="search">
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click="selectedMusic(value.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hots" :key="value.first" @click.stop="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList, getSearchHot } from '../api'
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistory: []
    }
  },
  directives: {
    throttle: {
      // 指令的定义
      // 函数节流
      inserted: function (el, obj) {
        let timerId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value()
          }, 1000)
        })
      }
    }
  },
  created () {
    getSearchHot()
      .then(data => {
        // console.log(data)
        this.hots = data.result.hots
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    search () {
      if (this.keywords !== '') {
        // console.log(this.keywords)
        console.log('发送请求')
        getSearchList({ keywords: this.keywords })
          .then(data => {
            // console.log(data)
            this.songs = data.result.songs
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    selectedMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    },
    selectedHot (name) {
      this.keywords = name
      this.search()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/css/variable";
  @import "src/assets/css/mixin";
  .search {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    @include bg_sub_color();
    .search-box{
      display: flex;
      align-items: center;
      margin: 40px 20px;
      background: #ebecec;
      border-radius: 40px;
      border-bottom: 1px solid #ccc;
      /*height: 60px;*/
      img{
        width: 40px;
        height: 40px;
        margin-left: 20px;
      }
      input{
        border: none;
        outline: none;
        background: transparent;
        @include font_size($font_medium);
        height: 80px;
        width: 100%;
        margin-left: 20px;
      }
    }
    .search-suggest {
      position: fixed;
      left: 0;
      right: 0;
      top: 310px;
      bottom: 0;
      overflow: hidden;
      @include bg_sub_color();
      li {
        display: flex;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        img {
          height: 40px;
          width: 40px;
        }
        p {
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium)
        }
      }
    }
    .search-hot {
      h3 {
        @include font_color();
        @include font_size($font_medium);
        padding: 10px 20px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          height: 60px;
          line-height: 60px;
          border: 1px solid #000;
          border-radius: 30px;
          padding: 0 20px;
          margin: 15px;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
    }
    .search-history {
      margin-top: 20px;
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #cccccc;
        .history-left {
          display: flex;
          align-items: center;
          img {
            width: 40px;
            height: 40px;
          }
          p {
            margin-left: 20px;
            @include font_color();
            @include font_size($font_medium_s)
          }
        }
        .history-right {
          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
</style>
