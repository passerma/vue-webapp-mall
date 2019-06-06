<template>
  <transition name="search">
    <div class="search">
    <header class="g-header-container">
        <search-header @query="getQuery"/>
    </header>
    <div class="g-content-container">
      <me-scroll ref="scroll">
        <search-hot @loaded="updateScroll" v-show="!query"/>
        <search-history
          @show-confirm="showConfirm"
          ref="history"
          v-show="!query"
          @remove-item="updateScroll"
        />
        <search-result :query="query" v-show="query"/>
      </me-scroll>
    </div>
    <me-confirm
        msg="确定要清空吗？"
        ref="confirm"
        @confirm="clearAllSearchHistorys"
      />
  </div>
  </transition>
</template>

<script>
  import MeScroll from 'base/scroll';
  import MeConfirm from 'base/confirm';
  import SearchHeader from './header';
  import SearchHot from './hot';
  import SearchHistory from './history';
  import SearchResult from './result';

  export default {
    name: 'Search',
    components: {
      MeScroll,
      MeConfirm,
      SearchHeader,
      SearchHot,
      SearchHistory,
      SearchResult
    },
    data() {
      return {
        query: ''
      };
    },
    methods: {
      getQuery(query) {
        this.query = query;
      },
      showConfirm() {
        this.$refs.confirm.show();
      },
      clearAllSearchHistorys() {
        this.$refs.history.clear();
        this.$refs.history.update();
      },
      updateScroll() {
        this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .search {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }
  .search-enter-active,
  .search-leave-active {
      transition: all 0.3s;
  }
  .search-enter,
  .search-leave-to {
     transform: translate3d(100%, 0, 0);
  }
</style>
