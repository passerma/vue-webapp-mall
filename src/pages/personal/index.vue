<template>
  <div class="personal">
    <div class="personal-header">
      您需要登录才能继续访问
      <router-link class="personal-header-to" to="/home">关闭</router-link>
    </div>
    <me-scroll ref="scroll">
      <login @to-IndexScroll="toIndexScroll" @to-IndexScrollTop="scrollTop"></login>
    </me-scroll>
  </div>
</template>

<script>
  import Login from './login';
  import MeScroll from 'base/scroll';

  export default {
    name: 'Personal',
      components:{
          Login,
          MeScroll
      },
      methods:{
          toIndexScroll(qscroll){
              let scroll = -(qscroll - 20);
              this.$refs.scroll && this.$refs.scroll.scrollToAny(scroll);
          },
          scrollTop(){
              this.$refs.scroll && this.$refs.scroll.scrollToTop();
          }
      }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .personal{
    width: 100%;
    height: 100%;
    position: relative;
    &-header{
      width: 100%;
      height: 52px;
      background: white;
      line-height: 52px;
      text-align: left;
      padding-left: 20px;
      position: relative;
      font-size: 16px;
      font-weight: bold;
      color: rgb(51, 51, 51);
      &-to{
        display: block;
        position: absolute;
        right: 0;
        top:0;
        height: 52px;
        line-height: 52px;
        padding: 0 20px;
        color: rgb(153, 153, 153);
      }
    }
  }
</style>
