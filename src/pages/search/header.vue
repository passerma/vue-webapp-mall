<template>
  <me-navbar class="header">
    <i
      class="iconfont icon-back"
      slot="left"
      @click="goBack"
    ></i>
    <me-search-box
      placeholder="开学季有礼，好货5折起"
      slot="center"
      @query="query"
    />
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'SearchHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    methods: {
      query(query) {
        this.$emit('query', query);
      },
      goBack() {
        this.$router.back();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    border-bottom: 1px solid $border-color;

    .iconfont{
      color: $icon-color;
      font-size: $icon-font-size;
    }

    .mine-search-box-wrapper {
      background-color: #f7f7f7;
    }
  }
</style>
