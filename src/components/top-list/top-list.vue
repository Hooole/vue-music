<template>
  <transition name="slider">
    <music-list :title="title" :bgImage="bgImage" :songs="topSongs"></music-list>
  </transition>
</template>
<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default {
    data() {
      return {
        topSongs: []
      }
    },
    computed: {
      bgImage() {
        if (this.topSongs.length) {
          return this.topSongs[0].image
        } else {
          return ''
        }
      },
      title() {
        return this.topList.topTitle
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.topSongs = this._normalizeSongs(res.songlist)
            console.log(this.topSongs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider-enter-active, .slider-leave-active
    transition: all 0.2s

  .slider-enter, .slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
