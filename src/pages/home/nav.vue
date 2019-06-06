<template>
  <nav class="nav">
    <swiper class="slider-top" :options="swiperOption">
      <swiper-slide>
        <ul class="nav-list">
          <li
          class="nav-item"
          v-for="(item, index) in navs1"
          :key="index">
            <a :href="item.linkUrl" class="nav-link">
              <img :src="item.picUrl" class="nav-pic">
              <span>{{item.text}}</span>
            </a>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide>
        <ul class="nav-list">
          <li
            class="nav-item"
            v-for="(item, index) in navs2"
            :key="index">
            <a :href="item.linkUrl" class="nav-link">
              <img :src="item.picUrl" class="nav-pic">
              <span>{{item.text}}</span>
            </a>
          </li>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination nav-pagination" slot="pagination">
      </div>
    </swiper>
  </nav>
</template>

<script>
  import {navItems1, navItems2} from './config';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    name: 'HomeNav',
    created() {
      this.navs1 = navItems1;
      this.navs2 = navItems2;
    },
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .nav {
    margin-top: -8px;
    width: 100%;
    padding-top: 15px;
    background-color: #fff;
    position: relative;
    z-index: 2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      width: 20%;
      margin-bottom: 15px;
    }

    &-link {
      @include flex-center(column);
    }

    &-pic {
      width: 60%;
      margin-bottom: 8px;
    }
  }

</style>
