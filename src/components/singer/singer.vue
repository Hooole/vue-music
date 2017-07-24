<template>
  <div class="singer">
    <listview :singerlist="singerList" @select="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSinger} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import listview from 'base/listview/listview'
  const hotName = '热门'
  const hotSingerLength = 10
  export default {
    data() {
      return {
        singerList: []
      }
    },
    created() {
      this._initSingerList()
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/d/:${singer.id}`
        })
      },
      _initSingerList() {
        getSinger().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: hotName,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < hotSingerLength) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 数据有序化
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === hotName) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {
      listview
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
