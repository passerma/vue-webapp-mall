<template>
  <div class="recommend">
    <h3 class="recommend-title">热卖推荐</h3>
    <div class="loading-container" v-if="!recommends.length">
      <me-loading inline/>
    </div>
    <ul class="recommend-list" v-else>
      <li
        class="recommend-item"
        v-for="(item, index) in recommends"
        :key="index"
      >
        <router-link
          class="recommend-link"
          :to="{name: 'home-product', params: {id: item.baseinfo.itemId}}"
        >
          <p class="recommend-pic"><img class="recommend-img" v-lazy="item.baseinfo.picUrlNew"></p>
          <p class="recommend-name">{{item.name.shortName}}</p>
          <p class="recommend-origPrice"><del>¥{{item.price.origPrice}}</del></p>
          <p class="recommend-info">
            <span class="recommend-price">¥<strong class="recommend-price-num">{{item.price.actPrice}}</strong></span>
            <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
  <!-- <div>
    HomeRecommend
  </div> -->
</template>

<script>
  import {getHomeRecommend} from 'api/home';
  import MeLoading from 'base/loading';

  export default {
    name: 'HomeRecommend',
    components: {
      MeLoading
    },
    data() {
      return {
        recommends: [],
        curPage: 1,
        totalPage: 1
      };
    },
    created() {
      // getHomeRecommend(1);
      this.getRecommend();
    },
    methods: {
      // API
      update() {
        return this.getRecommend();
      },
      getRecommend() {
        if (this.curPage > this.totalPage) {
          return Promise.reject(new Error('没有更多了'));
        }
        return getHomeRecommend(this.curPage).then(data => {
          return new Promise(resolve => {
            if (data) {
              this.curPage++;
              this.totalPage = data.totalPage;
              this.recommends = this.recommends.concat(data.itemList);
              this.$emit('loaded', this.recommends);
              resolve();
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .recommend {
    position: relative;
    &-title {
      position: relative;
      width: 100%;
      padding: 10px 0;
      font-size: $font-size-l;
      text-align: center;

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background-color: #ddd;
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }

    &-list {
      @include flex-between();
      flex-wrap: wrap;
    }

    &-item {
      width: 49%;
      background-color: #fff;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
      margin-bottom: 8px;
    }

    &-link {
      display: block;
    }

    &-pic {
      position: relative;
      width: 100%;
      padding-top: 100%;
      margin-bottom: 5px;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-name {
      height: 36px;
      padding: 0 5px;
      margin-bottom: 8px;
      line-height: 1.5;
      @include multiline-ellipsis();
    }

    &-origPrice {
      padding: 0 5px;
      margin-bottom: 8px;
      color: #ccc;
    }

    &-info {
      @include flex-between();
      padding: 0 5px;
      margin-bottom: 8px;
    }

    &-price {
      color: #e61414;
    }

    &-price-num {
      font-size: 20px;
    }

    &-count {
      color: #999;
    }
  }

  .loading-container {
    padding-top: 100px;
  }
</style>
