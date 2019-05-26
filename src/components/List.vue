<template>
  <div class="list">
    <div class="search-div">
        <input placeholder="Search artist" maxlength="20" class="search-input" @input="onchange" :disabled="loadingState"/>
    </div>
    <div class="list-div" v-if="listArray.length > 0">
        <div class="list-item" v-for="(item, index) in listArray" :key="index">
            <img :src="item.artworkUrl100" class="list-img"/>
            <div class="list-info-div">
                <div class="list-info-name">{{item.trackName}}</div>
                <div class="list-info-artist">{{item.artistName}}</div>
                <div class="list-info-collection">{{item.collectionName}}</div>
            </div>
            <div class="list-display-div">
                <img src="@/assets/display.png" class="list-display-button" v-if="currentItem.trackId !== item.trackId" @click="playMusic(item)"/>
                <img src="@/assets/playing2.gif" class="list-display-button" v-else/>
            </div>
        </div>
        <div class="fix-div"></div>
    </div>
    <div v-else class="no-message-div">抱歉，暂无搜索到相关歌曲</div>
    <div class="display-control" v-if="currentItem.trackId">
        <audio :src="currentItem.previewUrl" controls="controls" autoplay>
            不支持该格式
        </audio>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'list',
  data () {
    return {
      delayTag: 0,
      currentItem: {}
    }
  },
  computed: {
    ...mapState({
      listArray: state => state.listArray,
      loadingState: state => state.loadingState
    })
  },
  methods: {
    ...mapActions({
      doSearch: 'doSearch'
    }),
    playMusic: function (item) {
      this.currentItem = item
    },
    onchange: function (e) {
      const value = e.target.value
      if (!value) {
        return
      }
      this.delayTag++
      setTimeout(async () => {
        this.delayTag--
        if (this.delayTag === 0) {
          console.log(`延迟加载: ${value}`)
          this.doSearch(value)
        }
      }, 1000)
    }
  }
}
</script>
<style lang='less'>
  .list {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-flow: column;
    height: 100%;

    .search-div {
        width: 100%;
        background: #2b2b2b;
        height: 150px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;

        .search-input {
            width: 300px;
            height: 60px;
            font-size: 22px;
            border-radius: 5px;
            padding: 10px;
            box-sizing: border-box;
        }
    }

    .no-message-div{
        margin-top: 10px;
    }

    .display-control{
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .list-div{
        width: 100%;
        flex-grow: 1;
        overflow-y: scroll;

        .fix-div{
            width: 100%;
            height: 100px;
        }

        .list-item{
            width: 100%;
            height: 200px;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: #cccccc;
            box-sizing: border-box;
            padding: 50px 20px 50px 20px;
            display: flex;

            .list-img{
                width: 100px;
                flex-grow: 0;
                flex-shrink: 0;
                margin-right:15px;
            }

            .list-info-div{
                flex-grow: 1;
                flex-shrink: 1;
                text-align: left;
                flex-basis: 120px;
                min-width: 120px;
                margin-right: 10px;

                .list-info-name{
                    margin-top: 10px;
                    font-weight: bold;
                    font-size: 20px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }

                .list-info-collection{
                    margin-top: 10px;
                    font-size: 16px;
                    color: #b7b7b7;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }

                .list-info-artist{
                    margin-top: 10px;
                    font-size: 16px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
            }

            .list-display-div{
                flex-grow: 0;
                flex-shrink: 0;
                min-width: 50px;
                flex-basis: 50px;
                display: flex;
                align-items: center;
                justify-content: center;

                .list-display-button{
                    width: 50px;
                    height: 50px;
                }
            }

        }
    }

    .list-div::-webkit-scrollbar {
        display: none;
    }
  }
</style>
