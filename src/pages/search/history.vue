<template>
  <!-- <div>
    history
  </div> -->
  <div class="history" v-if="historys.length">
    <h4 class="history-title">历史搜索</h4>
    <transition-group class="g-list" name="list" tag="ul">
      <li
        class="g-list-item"
        v-for="(item,index) in historys"
        :key="index"
        @click="$_search_selectItem(item)"
      >
        <span class="g-list-text">{{item}}</span>
        <i
          class="iconfont icon-delete"
          @click.stop="removeItem(item)"
        ></i>
      </li>
    </transition-group>
    <a
      href="javascript:;"
      class="history-btn"
      @click="showConfirm"
    ><i class="iconfont icon-clear"></i>清空历史搜索</a>
  </div>
</template>

<script>
  import storage from 'assets/js/storage';
  import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'SearchHistory',
    mixins: [searchMixin],
    data() {
      return {
        historys: []
      };
    },
    created() {
      this.getKeyword();
    },
    methods: {
      update() {
        this.getKeyword();
      },
      getKeyword() {
        this.historys = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      },
      removeItem(item) {
        this.historys = this.historys.filter(val => val !== item);
        storage.set(SEARCH_HISTORY_KEYWORD_KEY, this.historys);
        setTimeout(() => {
          this.$emit('remove-item', item);
        }, 100);
      },
      showConfirm() {
        this.$emit('show-confirm');
      },
      clear() {
        storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

  .history {
    padding-bottom: 30px;
    background-color: #fff;

    &-title {
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-btn {
      @include flex-center();
      width: 80%;
      height: 40px;
      background: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 0 auto;
      color: #686868;

      .iconfont {
        margin-right: 5px;
      }
    }
  }

  .g-list {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    margin-bottom: 20px;
  }

  .list {
    &-enter-active,
    &-leave-active {
      transition: height 0.1s;
    }

    &-enter,
    &-leave-to {
      height: 0;
    }
  }

</style>
