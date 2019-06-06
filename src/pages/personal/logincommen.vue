<template>
    <div class="loginCommn">
        <div class="loginCommn-box">
            <div class="loginCommn-box-name">
                <input  class="needsclick" type="text" placeholder="手机号/邮箱/会员名" @focus="getScroll(1)" ref="input1">
            </div>
            <div class="loginCommn-box-pasWord">
                <input  class="needsclick" type="password" placeholder="请输入密码" @focus="getScroll(2)" ref="input2">
            </div>
        </div>
        <div class="loginCommn-more">
            <span class="loginCommn-more-mobile" @click="loginByMobile">短信验证码登录</span>
            <span class="loginCommn-more-register">免费注册</span>
        </div>
        <div class="loginCommn-btn">
            <button class="loginCommn-btn-to" type="submit">登录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Logincommen",
        methods:{
            loginByMobile(){
                this.$emit('login-ByType');
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
    .loginCommn{
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
     }
    }
    &-more{
         width: 100%;
         padding: 0 20px;
         display: flex;
         font-size: $font-size-l;
         color: #999999;
    &-mobile{
         display: inline-block;
         flex: 1;
     }
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
        }
    }
</style>
