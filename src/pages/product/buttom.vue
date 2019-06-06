<template>
    <div class="product-bu">
        <div class="product-text">
            <i class="iconfont icon-shop"></i>
            <span>店铺</span>
        </div>
        <div class="product-text">
            <i class="iconfont icon-service"></i>
            <span>服务</span>
        </div>
        <div class="product-text" @click="toCollect">
            <i class="iconfont icon-collect" ref="collect"></i>
            <span>收藏</span>
        </div>
        <div class="product-cat">
            <span class="product-toCat"
                  @click="toCart">加入购物车</span><span class="product-buy">立即购买</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Buttom",
        methods: {
            toCollect(){
                this.$refs.collect.style.color = 'red';
            },
            toCart(){
                this.$emit('to-cart');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .product-bu{
        position: absolute;
        background-color: #fff;
        z-index: 10;
        margin-top: -60px;
        width: 100%;
        height: 60px;
        display: flex;
        border-top: 2px solid $border-color;
        .product-text{
            @include flex-center(column);
            flex: 1;
            .iconfont{
                font-size: $icon-font-size-sm + 2;
            }
            span{
                font-size: $font-size-l;
            }
        }
        .product-cat{
            flex: 4;
            text-align: center;
            line-height: 60px;
            span{
                height: 40px;
                line-height: 40px;
                font-size: 15px;
                display: inline-block;
                width: 50%;
                font-weight: bold;
            }
            .product-toCat{
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                background-image: linear-gradient(to right, #FFC500, #FF9402);
            }
            .product-buy{
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                background-image: linear-gradient(to right, #FF7A00, #FE560A);
            }
        }
    }
</style>
