<template>
    <div class="shoplist">
        <MeLoading v-if="!productPri && !productImg && !productTitle && !productSellerName" class="cart-load"></MeLoading>
        <div v-else>
            <div class="shoplist-header">
            <span class="shoplist-header-se" @click="selectProductAll">
                <img :src="selectPng" v-if="productSelectAll"/>
                <img :src="selectPngNone" v-if="!productSelectAll"/>
            </span>
                <span class="shoplist-header-sh">{{productID}}</span>
                <span class="shoplist-header-get" >领券</span>
            </div>
            <div class="shoplist-text"
                 v-for="(item,index) in productAllID" :key="item">
                <div class="shoplist-text-se" @click="selectProduct(item)">
                    <img :src="selectPng" v-if="productSelectType[item]">
                    <img :src="selectPngNone" v-if="!productSelectType[item]">
                </div>
                <div class="shoplist-text-img" @click="toProduct(productAllID[index])">
                    <img v-lazy="productImg[item]"/>
                </div>
                <div class="shoplist-text-title" @click="toProduct(productAllID[index])">{{productTitle[item]}}</div>
                <div class="shoplist-text-all">官方标配</div>
                <div class="shoplist-text-btn">
                    <span class="shoplist-text-btn-pri" v-if="productPri[item]">￥{{(productPri[item]/100).toFixed(2)}}</span>
                    <div class="shoplist-text-btn-all">
                    <span
                            class="shoplist-text-btn-1"
                            @click="addProduct(item,'subtract')"
                    >-</span><span class="shoplist-text-btn-2" ><input
                            type="number"
                            class="needsclick"
                            v-model="productNum[item]"
                            @blur="upProductNum(item)"
                            @focus="toUpNum($event)"/></span><span
                            class="shoplist-text-btn-3"
                            @click="addProduct(item,'add')"
                    >+</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getProductText, getProductPrice} from 'api/product';
    import {getCartShop,getProductParameter,selectProtect,addProductNum,selectProductFun} from "./manageCart";
    import MeLoading from 'base/loading';
    export default {
        name: "Shoplist",
        components:{
            MeLoading
        },
        data(){
          return {
              shopBuyNum: 1,
              selectPng: require('./img/se.png'),
              selectPngNone: require('./img/none.png'),
              productAllID:[],
              productImg:{},
              productTitle:{},
              productSellerName:{},
              productPri: {},
              productNum: {},
              productNeedPri:{},
              productSelectType:{},
              productSelectAll: true,
          }
        },
        props:{
          productID: {
              type: String,
          },
          cmProdyct:{
              type: Boolean
          }
        },
        watch:{
            productSelectType:{
                handler(val, oldVal){
                    this.productSelectAll = true;
                    for(let i = 0; i < this.productAllID.length; i++){
                        if(val[this.productAllID[i]] === false){
                            this.productSelectAll = false;
                        }
                    }
                    this.$emit('pri-Shop', this.productAllID);
                },
                deep:true
            },
            cmProdyct(){
                this.productAllID.map((item) => {
                    getProductParameter(item).then(data =>{
                        this.$set(this.productSelectType, item, data.isSelect);
                    });
                });
            }
        },
        created() {
            this.productAllID = getCartShop(this.productID);
            this.productAllID.map((item) => {
                getProductText(item).then(data => {
                    this.$set(this.productTitle, item, data.item.title);
                    this.$set(this.productImg, item, data.item.images[1]);
                    this.$set(this.productSellerName, item, data.seller.shopName);
                });
                getProductPrice(item).then(data => {
                    this.$set(this.productPri, item, data.activityPrice);
                });
                getProductParameter(item).then(data =>{
                    this.$set(this.productNum, item, data.num);
                    let NeedPri = data.num * data.pri;
                    this.$set(this.productNeedPri, item, NeedPri);
                    this.$set(this.productSelectType, item, data.isSelect);
                });
                this.$emit('num-ShopNum');
            });
        },
        beforeDestroy(){
            this.productAllID.map((item) => {
                selectProtect(item, false);
            });
        },
        methods:{
            toProduct(productId){
                this.$router.push({name:'home-product',params: {id: productId}})
            },
            addProduct(id,type){
                addProductNum(id,type);
                getProductParameter(id).then(data =>{
                    this.$set(this.productNum, id, data.num);
                    let NeedPri = data.num * data.pri;
                    this.$set(this.productNeedPri, id, NeedPri);
                });
                this.$emit('pri-Shop', this.productAllID);
            },
            selectProduct(id){
                selectProductFun(id);
                getProductParameter(id).then(data =>{
                    this.$set(this.productSelectType, id, data.isSelect);
                })

            },
            selectProductAll(){
                if(this.productSelectAll === true){
                    selectProtect();
                    this.productAllID.map((item) => {
                        selectProtect(item, false);
                        getProductParameter(item).then(data =>{
                            this.$set(this.productSelectType, item, data.isSelect);
                        })
                    });
                }
                if(this.productSelectAll === false){
                    selectProtect();
                    this.productAllID.map((item) => {
                        selectProtect(item, true);
                        getProductParameter(item).then(data =>{
                            this.$set(this.productSelectType, item, data.isSelect);
                        })
                    });
                }
            },
            upProductNum(id){
                if(this.productNum[id] < 1){
                    this.productNum[id] = 1;
                }
                addProductNum(id,parseInt(this.productNum[id]));
                getProductParameter(id).then(data =>{
                    this.$set(this.productNum, id, data.num);
                    let NeedPri = data.num * data.pri;
                    this.$set(this.productNeedPri, id, NeedPri);
                });
                this.$emit('pri-Shop', this.productAllID);
            },
            toUpNum(e){
                let NowEl = e.currentTarget;
                function getOffsetTop(el){
                    return el.offsetParent
                        ? el.offsetTop + getOffsetTop(el.offsetParent)
                        : el.offsetTop
                }
                let scroll = getOffsetTop(NowEl);
                this.$emit('to-Scroll',scroll);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .shoplist{
        width: 100%;
        padding: 0 10px;
        .cart-load{
            height: 135px;
        }
        &-header{
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: white;
            padding: 0 10px;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            position: relative;
            span{
                font-size: $font-size-sm;
                display: inline-block;
            }
            &-se{
                width: 20px;
                height: 20px;
                margin-top: 10px;
                position: absolute;
                left: 10px;
                z-index: 10;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            &-sh{
                position: absolute;
                color: rgb(51, 51, 51);
                width: 100%;
                padding: 0 55px 0 35px;
                height: 40px;
                line-height: 40px;
                @include ellipsis();
            }
            &-get{
                position: absolute;
                right: 10px;
                color: rgb(153, 153, 153);
            }
        }
        &-text{
            background-color: rgb(255, 248, 244);
            position: relative;
            padding-bottom: 95px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            &-se{
                position: absolute;
                width: 20px;
                height: 20px;
                left: 10px;
                margin-top: 37px;
                z-index: 10;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            &-img{
                position: absolute;
                width: 60px;
                height: 60px;
                margin-top: 15px;
                left: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            &-title{
                height: 35px;
                line-height: 18px;
                margin-top: 10px;
                position: absolute;
                margin-left: 115px;
                padding-right: 10px;
                @include muli-mobile;
                font-size: $font-size-l;
                color: rgb(51, 51, 51);
            }
            &-all{
                width: 100%;
                margin-top: 50px;
                position: absolute;
                padding-left: 115px;
                font-size: $font-size-l - 1;
                color: rgb(153, 153, 153);
            }
            &-btn{
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-size: $font-size-l;
                width: 100%;
                margin-top: 10px;
                padding-left: 120px;
                padding-right: 10px;
                &-pri{
                    display: inline-block;
                    float: left;
                    color: red;
                    font-size: $font-size-sm;
                }
                &-all{
                    float: right;
                    display: inline-block;
                    height: 16px;
                }
                &-1{
                    width: 18px;
                    display: inline-block;
                    height: 16px;
                    text-align: center;
                    border: 1px gray solid;
                }
                &-2{
                    width: 30px;
                    display: inline-block;
                    height: 16px;
                    text-align: center;
                    border: 1px gray solid;
                    border-left: none;
                    border-right: none;
                    input{
                        width: 100%;
                        height: 100%;
                        color: rgb(51, 51, 51);
                        background-color: #fff8f4;
                        border: none;
                        text-align: center;
                        line-height: 16px;
                    }
                    input{
                        -moz-appearance:textfield;
                    }
                    input::-webkit-inner-spin-button,
                    input::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        appearance: none;
                        margin: 0;
                    }
                }
                &-3{
                    display: inline-block;
                    height: 16px;
                    width: 18px;
                    text-align: center;
                    border: 1px gray solid;
                }
            }
        }
    }
</style>
