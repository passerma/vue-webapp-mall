<template>
    <div class="statusbar" v-if="priceAll.length">
        <div class="statusbar-left">
            <div class="price ">¥<strong class="small">{{(priceAll[0]/100).toFixed(2)}}</strong></div>
            <div class="information">
                <div class="sold-count"><span>{{priceAll[2]}}</span>件已售</div>
                <div class="all-price"><del>¥ {{(priceAll[1]/100).toFixed(2)}}</del></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Statusbar',
        props: {
            priceAll: {
                type: Array,
                default: []
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .statusbar {
        position: relative;
        height: 54px;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#fd1414), to(#a61414));
        overflow: hidden;
        color: #fff;
        .statusbar-left {
            position: relative;
            margin-right: 100px;
            height: 54px;
            .price{
                padding: 0 10px;
                display: inline-block;
                height: 54px;
                line-height: 54px;
                vertical-align: text-bottom;
                font-size: 24px;
                .small{
                    font-size: 42px;
                    font-weight: 400;
                }
            }
            .information{
                position: absolute;
                top: 0;
                display: inline-block;
                color: #fff;
                width: 150px;
                .sold-count{
                    display: inline-block;
                    padding: 0 6px;
                    height: 18px;
                    line-height: 18px;
                    font-size: 11px;
                    margin-top: 10px;
                }
                .all-price{
                    padding: 0 4px;
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                }
            }
        }
    }
</style>
