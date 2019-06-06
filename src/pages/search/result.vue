<template>
  <!-- <div>
    result
  </div> -->
  <div class="result">
    <div class="loading-container" v-show="loading">
      <me-loading/>
    </div>
    <ul class="g-list" v-show="!loading && results.length">
      <li
        class="g-list-item"
        v-for="(item, index) in results"
        :key="index"
        @click="$_search_selectItem(item)"
      >
        <span class="g-list-text">{{item}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'SearchResult',
    components: {
      MeLoading
    },
    data() {
      return {
        results: [],
        loading: true
      };
    },
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    mixins: [searchMixin],
    watch: {
      query(query) {
        this.getResults(query);
      }
    },
    methods: {
      getResults(keyword) {
        if (!keyword) {
          return;
        }
        this.loading = true;
        getSearchResult(keyword).then(data => {
          if (data) {
            this.results = data;
            this.loading = false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .loading-container{
    margin-top: 100px;
  }
  .no-result{
    margin-top: 100px;
    text-align: center;
    font-size: 20px;
  }
</style>
