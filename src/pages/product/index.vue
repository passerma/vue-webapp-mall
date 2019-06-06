<template>
  <transition name="search">
    <div class="product">
      <div class="toCartSucAm" ref="toCartSucAm">加入购物车成功</div>
      <me-scroll ref="scroll" class="product-scroll" @scroll-end="scrollEnd">
        <me-navbar class="product-navbar">
          <div class="product-navbar-btn" slot="left" @click="goBack">
            <i class="iconfont icon-back"></i>
          </div>
          <div class="product-navbar-btn"  slot="right" @click="goCart">
            <i class="iconfont icon-cart"></i>
          </div>
        </me-navbar>
        <me-loading class="product-lodaing" v-if="!swiperImg.length"></me-loading>
        <swiper class="slider-top" :options="swiperOption" v-else>
          <swiper-slide class="product-slide"
                        v-if="swiperImg.length"
                        v-for="(item,index) in swiperImg" :key="index"
          >
            <img @load="updateScroll" class="product-img" v-lazy="item">
          </swiper-slide>
          <div class="swiper-pagination product-pagination" slot="pagination">
          </div>
        </swiper>
        <Statusbar :priceAll="activity"></Statusbar>
        <div v-if="productAskText">
          <div>
            <div class="product-title">
              {{swiperTitle}}
            </div>
            <div class="product-title product-title-min">
              <span v-for="(item, index) in swiperTest" :key="index">{{item}}</span>
            </div>
          </div>
          <div class="product-sev">
            <span>服务</span>
            <span class="product-sev-all"
                  v-for="(item, index) in swiperSev"
                  :key="index">
          {{item}}
        </span>
            <i class="iconfont icon-back icon-back-t"></i>
          </div>
          <div class="product-tall" v-if="productTall">
            <div class="product-tall-coun">
              <span>商品评价({{swiperTallCun}})</span>
              <i class="iconfont icon-back icon-back-t"></i>
              <span class="icon-product-all">查看全部</span>
            </div>
            <div class="product-tall-text">
            <span class="product-tall-text-name">
              <i class="iconfont icon-personal"></i>
              {{productTallName}}</span>
              {{productTall}}
              <div class="product-tall-text-time">
                <span>{{productTallTime}}</span>
                <span>{{productSkuInfo}}</span>
              </div>
            </div>
          </div>
          <div class="product-tall product-tall-none" v-else>
            该商品暂无评价
          </div>
          <div class="product-ask">
            <div class="product-ask-title">
              <span>问大家</span>
              <i class="iconfont icon-back icon-back-t"></i>
              <span class="icon-product-all">查看全部</span>
            </div>
            <div class="product-ask-qus">
              <span class="product-ask-qus-text">{{productAskText}}</span>
              <span class="product-right">5个回答</span>
            </div>
          </div>
          <div class="product-seller">
            <div class="product-seller-text">
              <img v-lazy="productSellerImg">
              <span>{{productSellerName}}</span>
            </div>
            <div class="product-seller-com">
              <div class="product-seller-com-ms">
                <span class="product-seller-com-ms-1">{{productSellerCn[0].title}}</span>
                <span class="product-seller-com-ms-2">{{productSellerCn[0].score}}</span>
                <span class="product-seller-com-ms-3">{{productSellerCn[0].levelText}}</span>
              </div>
              <div class="product-seller-com-ms">
                <span class="product-seller-com-ms-1">{{productSellerCn[1].title}}</span>
                <span class="product-seller-com-ms-2">{{productSellerCn[1].score}}</span>
                <span class="product-seller-com-ms-3">{{productSellerCn[1].levelText}}</span>
              </div>
              <div class="product-seller-com-ms">
                <span class="product-seller-com-ms-1">{{productSellerCn[2].title}}</span>
                <span class="product-seller-com-ms-2">{{productSellerCn[2].score}}</span>
                <span class="product-seller-com-ms-3">{{productSellerCn[2].levelText}}</span>
              </div>
            </div>
          </div>
          <div class="product-js">
            <img src="./img/js.png">
          </div>
        </div>
      </me-scroll>
      <bottom @to-cart="toCart"></bottom>
      <div class="g-backtop-container">
        <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import {getProductText, getProductPrice} from 'api/product';
  import MeLoading from 'base/loading';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import Statusbar from './statusbar';
  import MeScroll from 'base/scroll';
  import Bottom from './buttom';
  import MeNavbar from 'base/navbar';
  import MeBacktop from 'base/backtop';
  import {productLocal,productLocalName,toProductParameter} from './storage';

  export default {
    name: 'Product',
    components:{
      MeLoading,
        swiper,
        swiperSlide,
        Statusbar,
        MeScroll,
        Bottom,
        MeNavbar,
        MeBacktop
    },
    data() {
        return {
            isBacktopVisible: false,
            swiperImg: [],
            swiperTitle: [],
            activity: [],
            swiperTest: [],
            swiperSev:[],
            swiperTallCun: '',
            productTall: '',
            productTallName: '',
            productTallTime: '',
            productSkuInfo: '',
            productAskText: '',
            productSellerImg: '',
            productSellerName: '',
            productSellerCn: [],
            swiperOption: {
                loop: false,
                pagination: {
                    el: '.swiper-pagination',
                }
            }
        }
    },
      created(){
          getProductText(this.$route.params.id).then(data => {
              this.swiperImg = data.item.images;
              this.swiperTitle = data.item.title;
              if(data.rate){
                  this.swiperTallCun = data.rate.totalCount;
                  if(data.rate.rateList){
                      this.productTall = data.rate.rateList[0].content;
                      this.productTallName = data.rate.rateList[0].userName;
                      this.productTallTime = data.rate.rateList[0].dateTime;
                      this.productSkuInfo = data.rate.rateList[0].skuInfo;
                  }
              }
              this.productAskText = (data.resource.entrances.askAll.text);
              this.productAskText = this.productAskText.substring(1,this.productAskText.length-1);
              this.productSellerImg = data.seller.shopIcon;
              this.productSellerName = data.seller.shopName;
              this.productSellerCn = data.seller.evaluates;
          });
          getProductPrice(this.$route.params.id).then(data => {
              this.activity = [];
              this.activity.push(data.activityPrice,data.originalPrice,data.soldCount);
              this.actPri = data.activityPrice;
              this.swiperTest = data.picFeature.itemFeatures;
              this.swiperSev = data.showTagNames;

          });
      },
    methods: {
        goBack(){
            this.$router.back();
        },
        goCart(){
            this.$router.push('/cart');
        },
        updateScroll() {
            this.$refs.scroll && this.$refs.scroll.update();
        },
        backToTop(){
            this.$refs.scroll && this.$refs.scroll.scrollToTop();
        },
        scrollEnd(translate, scroll, pulling) {
            this.isBacktopVisible = translate < 0 && -translate > scroll.height-500;
        },
        toCart(){
            let that = this;
            this.$refs.toCartSucAm.style.display = 'block';
            setTimeout(function () {
                that.$refs.toCartSucAm.style.display = 'none';
            },1000);
            productLocalName(this.productSellerName);
            productLocal(this.productSellerName,parseInt(this.$route.params.id));
            toProductParameter(parseInt(this.$route.params.id), this.actPri);
        }
    }
  };
</script>

<style lang="scss" scoped>
 @import "~assets/scss/mixins";
 .toCartSucAm{
   width: 120px;
   height: 30px;
   position: fixed;
   top: 50%;
   left: 50%;
   margin-top: -15px;
   margin-left: -50px;
   z-index: 2000;
   color: white;
   background-color: rgba(57, 57, 57, 0.77);
   box-shadow:2px 2px 10px rgba(57, 57, 57, 0.77);
   line-height: 30px;
   text-align: center;
   font-size: $font-size-l;
   display: none;
 }
 .search-enter-active,
 .search-leave-active {
   transition: all 0.3s;
 }

 .search-enter,
 .search-leave-to {
   transform: translate3d(100%, 0, 0);
 }
 .product {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
   .icon-back-t{
     display: inline-block;
     float: right;
     transform: rotateZ(180deg);
   }
   .icon-product-all{
     display: inline-block;
     float: right;
     font-size: $font-size-l;
     color: red;
     margin-right: 7px;
   }
   .g-backtop-container{
     right: 20px;
     bottom: 70px;
     a{
       background-color: rgba(0, 0, 0, 0.2);
     }
   }
   &-lodaing{
     margin-top: 100px;
   }
   &-right{
     float: right;
   }
   &-scroll{
     padding-bottom: 60px;
   }
   &-slide{
     width: 100%;
     padding-top: 100%;
     position: relative;
   }
   &-navbar{
     position: absolute;
     background: none;
     z-index: 10;
     width: 100%;
     &-btn{
       width: 40px;
       height: 40px;
       margin-top: 5px;
       background: rgba(87, 87, 87, 0.5);
       border-radius: 50%;
       line-height: 40px;
       text-align: center;
       .iconfont{
         color: white;
         font-size: $icon-font-size;
       }
     }
   }
   .product-img{
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
   }
   &-title{
     padding: 10px;
     font-size: $font-size-l;
     line-height: 18px;
     color: #333;
     background-color: #fff;
     span{
       color: red;
       margin-right: 10px;
     }
   }
   &-title-min{
     padding-top: 0;
   }
   &-sev{
     width: 100%;
     height: 40px;
     line-height: 40px;
     margin-top: 10px;
     background: white;
     padding: 0 10px;
     font-size: 13px;
     color: rgb(153, 153, 153);
     &-all{
       padding-left: 10px;
       font-size: 13px;
       color: rgb(51, 51, 51);
     }
   }
   &-tall{
     width: 100%;
     line-height: 40px;
     margin-top: 10px;
     background: white;
     padding: 0 10px 10px 10px;
     font-size: 13px;
     color: rgb(153, 153, 153);
     &-coun{
       height: 40px;
       line-height: 40px;
       border-bottom: #999999 1px solid;
       padding-bottom: 10px;
       font-size: $font-size-l;
       .iconfont{
         color: red;
       }
     }
     &-text{
       margin-top: 5px;
       font-size: $font-size-l;
       line-height: 20px;
       color: #080808;
       &-name{
         display: block;
         height: 40px;
         line-height: 40px;
         vertical-align: middle;
         font-size: $font-size-sm;
         color: rgb(153, 153, 153);
         padding-bottom: 10px;
         .iconfont{
           font-size: 25px;
           color: #a61414;
           margin-right: 5px;
         }
       }
       &-time{
         color: #999999;
         width: 100%;
         font-size: $font-size-base;
         padding-top: 10px;
       }
     }
   }
   &-tall-none{
     padding: 0 10px;
   }
   &-ask{
     margin-top: 10px;
     padding: 10px;
     background: white;
     margin-bottom: 10px;
     span{
       font-size: $font-size-l;
     }
     &-qus{
       margin-top: 15px;
       padding-right: 10px;
       color: #080808;
       position: relative;
       padding-bottom: 15px;
       &-text{
         width: 100%;
         position: absolute;
         display: inline-block;
         padding-right: 55px;
         @include ellipsis;
       }
     }
   }
   &-seller{
     width: 100%;
     padding: 10px;
     background: white;
     margin-bottom: 10px;
     &-text{
       height: 50px;
       line-height: 50px;
       img{
         width: 50px;
         height: 50px;
       }
       span{
         font-size: $icon-font-size-sm;
         margin-left: 10px;
         color: red;
       }
     }
     &-com{
       width: 100%;
       height: 30px;
       margin-top: 10px;
       display: flex;
       &-ms{
         flex: 1;
         height: 30px;
         line-height: 30px;
         text-align: center;
         &-1{
           color: #f71616;
         }
         &-2{
           color: #a61414;
         }
         &-3{
           display: inline-block;
           width: 20px;
           height: 20px;
           margin-top: 5px;
           background: #a61414;
           line-height: 20px;
           color: white;
           border-radius: 50%;
         }
       }
       span{
         font-size: $font-size-base;
       }
     }
   }
   &-js{
     width: 100%;
     margin-bottom: 10px;
     img{
       width: 100%;
     }
   }
  }
</style>
