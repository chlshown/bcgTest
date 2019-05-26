<template>
  <div class="home">
    <div class="container"  :class="{ 'loading': loadingState }">
      <div class="loading-div" v-if="loadingState">加载中...</div>
      <List />
    </div>
  </div>
</template>

<script>
import List from '@/components/List.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState({
      loadingState: state => state.loadingState
    })
  },
  components: {
    List
  }
}
</script>
<style lang='less'>
  * {
    margin: 0;
    padding: 0;
  }
  .loading{
    background: #2c3e5014;
    opacity: 0.3;

    .loading-div{
      position: absolute;
      left: 50%;
      right: 50%;
      top: 50%;
      bottom: 50%;
      width: 100px;
      transform: translate(-50%, -50%);
    }
  }
  .home {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;

    .container {
      position: relative;
      width: 100%;
      flex-grow: 1;
    }
  }
</style>
