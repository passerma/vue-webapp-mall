<template>
    <div class="loginMobile">
        <div class="loginMobile-box">
            <div class="loginMobile-box-name">
                <input  class="needsclick" type="text" placeholder="请输入手机号码"
                       @focus="getScroll(1)" ref="input1">
            </div>
            <div class="loginMobile-box-pasWord">
                <input class="loginMobile-box-pasWord-text needsclick" type="text"
                       placeholder="校验码" @focus="getScroll(2)" ref="input2">
                <span class="loginMobile-box-pasWord-yan">
                    <span @click="getYan" v-if="!getYanLoad">获取验证码</span>
                    <span v-if="getYanLoad" v-text="getYanTime"></span>
                </span>
            </div>
        </div>
        <div class="loginMobile-more">
            <span class="loginMobile-more-register">免费注册</span>
        </div>
        <div class="loginMobile-btn">
            <button class="loginMobile-btn-to" type="submit">登录</button>
            <div class="loginMobile-btn-com">
                <span class="loginMobile-btn-com-to" @click="loginByCom">账号密码登录</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginMobile",
        data(){
          return {
              getYanLoad: false,
              getYanTime: 60,
            }
        },
        methods:{
            loginByCom(){
                this.$emit('login-ByType');
            },
            getYan(){
                this.getYanLoad = true;
                let _this = this;
                let LoadTime = setInterval(function () {
                    _this.getYanTime -= 1;
                    if(_this.getYanTime == 0){
                        clearInterval(LoadTime);
                        _this.getYanLoad = false;
                        _this.getYanTime = 60;
                    }
                },1000)
            },
            getScroll(type){
                if(type === 1){
                    let scrollIndent = this.$refs.input1.offsetTop;
                    this.$emit('to-Scroll',scrollIndent);
                }
                if (type === 2) {
                    let scrollIndent = this.$refs.input2.offsetTop;
                    this.$emit('to-Scroll',scrollIndent);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .loginMobile{
        &-box{
            width: 100%;
            margin-top: 40px;
            input{
                background: #eee;
                width: 100%;
                font-size: $font-size-sm;
            }
            &-name{
                text-align: center;
                margin: 0 20px;
                border-bottom: 1px solid #ff5000;
                padding-bottom: 10px;
            }
            &-pasWord{
                text-align: center;
                margin: 40px 20px;
                margin-bottom: 20px;
                border-bottom: 1px solid #ff5000;
                padding-bottom: 10px;
                clear: both;
                display: flex;
                &-text{
                    flex: 5;
                    display: inline-block;
                    height: 50%;
                }
                &-yan{
                    flex: 4;
                    display: inline-block;
                    color: chartreuse;
                    height: 20px;
                    text-align: right;
                    line-height: 20px;
                    font-size: $font-size-sm;
                    span{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        border-left: 1px chartreuse solid;
                    }
                }
            }
        }
        &-more{
            width: 100%;
            padding: 0 20px;
            display: flex;
            font-size: $font-size-l;
            color: #999999;
            &-regiter{
                display: inline-block;
                flex: 1;
            }
        }
        &-btn{
            width: 100%;
            height: 50px;
            margin: 20px 0;
            text-align: center;
            &-to{
                font-size: $icon-font-size-sm;
                width: 200px;
                height: 40px;
                line-height: 40px;
                border-radius: 20px;
                text-align: center;
                border: 0;
                background: -webkit-linear-gradient(left,#ff9000,#ff5000) no-repeat;
                color: #fff;
                box-shadow: 0 4px 10px #f7c7b1;
            }
            &-com{
                width: 100%;
                text-align: center;
                height: 40px;
                margin-top: 20px;
                &-to{
                    display: inline-block;
                    font-size: $icon-font-size-sm;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 20px;
                    border: 1px solid #ff5000;
                    text-align: center;
                    color: #ff9000;
                }
            }
        }
    }
</style>
