<template>
  <div class="cart">
    <me-scroll class="cart-meScroll" ref="scroll" @scroll-end="scrollEnd">
      <div class="cart-none" v-if="!shopList.length">
        <router-link to="/home">购物车为空，快去选购吧</router-link>
      </div>
      <div class="cart-header">
        <span class="cart-header-1">购物车({{productNum}})</span>
        <span class="cart-header-2" @click="inSelect">{{manage}}</span>
        <span class="cart-header-3">共{{productNum}}件宝贝</span>
      </div>
      <div class="cart-wrap">
        <shop-list class="cart-wrap-q"
                   v-for="(item, index) in shopList"
                   :key="item"
                   :productID="item"
                   @num-ShopNum="numShopNum"
                   @pri-Shop="priShop"
                   @to-Scroll = "toScroll"
                   :cmProdyct="productSelectAll"></shop-list>
      </div>
    </me-scroll>
    <div class="g-backtop-container cart-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
    </div>
    <div class="cart-bottom" v-if="shopList.length">
      <span class="cart-bottom-se" @click="toSelectProduct">
        <img :src="selectPng" v-if="productSelectAll">
        <img :src="selectPngNone" v-if="!productSelectAll">
        <span>全选</span>
      </span>
      <div class="cart-bottom-right" v-if="!select">
        <div class="cart-float-left">
          <span class="cart-bottom-right-all">合计:</span>
          <span class="cart-bottom-right-pri">￥{{(productNeedPri).toFixed(2)}}</span>
        </div>
        <div class="cart-float-left cart-bottom-right-div">
          <span class="cart-bottom-right-toBuy">结算({{productNeedNum}})</span>
        </div>
      </div>
      <div class="cart-bottom-right" v-else>
        <div class="cart-float-left cart-select-qin">
          清理
        </div>
        <div class="cart-float-left cart-select-yi">
          移入收藏夹
        </div>
        <div class="cart-float-left cart-select-del" @click="delProduct">
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShopList from './shoplist';
  import MeScroll from "../../base/scroll/index";
  import {getCart,getProductParameter,getCartShop,selectProtect,getProductParameterNone,delProductMethod} from './manageCart'
  import MeBacktop from 'base/backtop';
  export default {
      name: 'cart',
      components: {
          MeScroll,
          ShopList,
          MeBacktop,
      },
      data() {
          return {
              select: false,
              selectPng: require('./img/se.png'),
              selectPngNone: require('./img/none.png'),
              manage: '管理',
              shopList: [],
              productNum: 0,
              productNeedPri: 0,
              productShoplist: [],
              productNeedNum: 0,
              productSelectAll: false,
              isLoad: false,
              isBacktopVisible: false,
          }
      },
      created(){
          this.shopList = getCart();
          this.shopList.map((item) => {
              this.productShoplist.push(getCartShop(item));
          });
          this.productShoplist = [].concat.apply([], this.productShoplist);
      },
      methods: {
          inSelect() {
              this.select = !this.select;
              if (this.select) {
                  this.manage = '完成';
              } else {
                  this.manage = '管理';
              }
              this.$refs.scroll && this.$refs.scroll.scrollToTop();
          },
          numShopNum(){
              this.productNum += 1;
          },
          priShop(id){
              this.productNeedPri = 0;
              this.productNeedNum = 0;
              this.productSelectAll = true;
              this.productShoplist.map((item,index) => {
                  if(getProductParameterNone(item).isSelect === true){
                      let NeedPri = getProductParameterNone(item).num * getProductParameterNone(item).pri;
                      this.productNeedPri += NeedPri;
                      this.productNeedNum += 1;
                  }
                  if(getProductParameterNone(item).isSelect === false){
                      this.productSelectAll = false;
                  }
              });

          },
          toSelectProduct(){
              if (this.productSelectAll === false){
                  this.productSelectAll = true;
                  this.productShoplist.map((item) => {
                      selectProtect(item, true);
                  });
              } else {
                  this.productSelectAll = false;
                  this.productShoplist.map((item) => {
                      selectProtect(item, false)
                  });
              }
          },
          delProduct(){
              this.productShoplist.map((item) => {
                  getProductParameter(item).then(data => {
                      if(data.isSelect === true){
                          delProductMethod(this.productShoplist,this.shopList);
                          this.$router.go(0);
                      }
                  })
              });
          },
          scrollEnd(translate, scroll, pulling){
              this.isBacktopVisible = translate < 0 && -translate > scroll.height-500;
          },
          backToTop(){
              this.$refs.scroll && this.$refs.scroll.scrollToTop();
          },
          toScroll(qscroll){
              let scroll = -(qscroll - 60);
              this.$refs.scroll && this.$refs.scroll.scrollToAny(scroll);
              console.log(1)
          }
      }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .cart-float-left{
    float: left;
  }
  .cart{
    width: 100%;
    height: 100%;
    position: relative;
    &-none{
      width: 100%;
      height: 100%;
      position: absolute;
      margin-top: 200px;
      text-align: center;
      font-size: $icon-font-size-sm;
    }
    &-backtop-container{
      bottom: 60px;
    }
    &-header{
      background: red;
      padding: 20px 10px;
      height: 160px;
      span{
        display: inline-block;
        height: 40px;
        font-size: $font-size-sm + 1;
      }
      .cart-header-1{
        float: left;
      }
      .cart-header-2{
        float: right;
      }
      .cart-header-3{
        clear: both;
        float: left;
      }
    }
    &-meScroll{
      padding-bottom: 100px;
    }
    &-wrap{
      margin-top: -60px;
      &-q{
        margin-bottom: 20px;
      }
    }
    &-bottom{
      position: absolute;
      width: 100%;
      height: 50px;
      background: white;
      bottom: 0;
      border-bottom: 1px solid rgba(226, 226, 226, 0.66);
      z-index: 20000;
      padding: 0 20px;
      &-se{
        display: inline-block;
        height: 20px;
        margin-top: 15px;
        line-height: 20px;
        img{
          width: 20px;
          height: 20px;
          span{
            display: inline-block;

          }
        }
      }
      &-right{
        display: inline-block;
        float: right;
        height: 50px;
        line-height: 50px;
        font-size: $font-size-sm;
        &-pri{
          color: red;
        }
        &-div{
          height: 50px;
        }
        &-toBuy{
          margin-left: 10px;
          display: inline-block;
          border: 1px salmon solid;
          line-height: 38px;
          width: 80px;
          text-align: center;
          height: 40px;
          margin-top: 5px;
          border-radius: 20px;
          background-image: linear-gradient(90deg, #FF9000 0%, #FF5000 98%);
        }
        .cart-select-qin{
          margin-right: 10px;
        }
        .cart-select-yi{
          border: 1px salmon solid;
          text-align: center;
          height: 30px;
          line-height: 28px;
          margin-top: 10px;
          padding: 0 5px;
          margin-right: 10px;
          border-radius: 20px;
          color: #ffbc4c;
        }
        .cart-select-del{
          border: 1px salmon solid;
          text-align: center;
          height: 30px;
          line-height: 28px;
          margin-top: 10px;
          padding: 0 5px;
          border-radius: 20px;
          color: #ffbc4c;
        }
      }
    }
  }
</style>
