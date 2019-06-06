<template>
  <me-navbar class="header">
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <div slot="center" class="ca-center" @click="goToSearch">
      <i data-v-12aec79e="" class="iconfont icon-search"></i>搜索商品、商铺</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>
<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'CategoryHeader',
    components: {
      MeNavbar
    },
    methods:{
        goBack() {
            this.$router.back();
        },
        goToSearch() {
            this.$router.push('/search');
        }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: $bgc-theme;
      border-bottom: 1px solid #e5e5e5;
    }
    .ca-center{
      height: 30px;
      line-height: 30px;
      margin: 10px 6px;
      font-size: $font-size-l;
      background: white;
      border-radius: 15px;
      .iconfont{
        font-size: $font-size-l;
        margin-right: 10px;
        margin-left: 5px;
        line-height: 30px;
      }
    }
    .iconfont {
      color: #5d656b;
      font-size: $icon-font-size;
    }
  }
</style>
