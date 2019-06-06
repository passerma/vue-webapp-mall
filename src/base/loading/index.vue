<template>
  <div class="mine-loading" :class="{'mine-loading-inline': inline}">
    <span class="mine-loading-indicator" v-if="indicator==='on'">
      <slot><img src="./loading.gif" alt="loading"></slot>
    </span>
    <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
  </div>
</template>

<script>
  export default {
    name: 'MeLoading',
    props: {
      indicator: {
        type: String,
        default: 'on',
        validator(value) {
          return ['on', 'off'].indexOf(value) > -1;
        }
      },
      text: {
        type: String,
        default: '加载中...'
      },
      inline: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loadingText: this.text
      };
    },
    watch: {
      text(text) {
        this.loadingText = text;
      }
    },
    methods: {
      // setText(text = this.text) {
      //   this.loadingText = text;
      // }
      setText(text) {
        this.loadingText = text;
      }
    }
    // watch: {
    //   text(text) {
    //     this.loadingText = text;
    //   }
    // },
    // methods: {
    //   setText(text = this.text) {
    //     this.loadingText = text;
    //   }
    // }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-loading {
    overflow: hidden;
    width: 100%;
    height: 100%;
    @include flex-center(column);

    &.mine-loading-inline {
      flex-direction: row;

      .mine-loading-indicator ~ .mine-loading-text {
        margin-top: 0;
        margin-left: 6px;
      }
    }
  }

  .mine-loading-indicator ~ .mine-loading-text {
    margin-top: 6px;
  }

</style>
