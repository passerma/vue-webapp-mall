<template>
    <div class="login">
        <div class="login-img">
            <img src="https://gw.alicdn.com/tfs/TB1p.BGQXXXXXbFXFXXXXXXXXXX-160-160.png">
        </div>
        <Logincommn v-if="loginTypeData"
                    @login-ByType="loginByType"
                    @to-Scroll="toScroll"></Logincommn>
        <Loginmobile v-else @login-ByType="loginByType"
                     @to-Scroll="toScroll"></Loginmobile>
    </div>
</template>

<script>
    import Logincommn from './logincommen'
    import Loginmobile from './loginmobile'
    export default {
        name: "Login",
        components:{
            Logincommn,
            Loginmobile
        },
        data (){
            return {
                loginTypeData: true
            }
        },
        methods: {
            loginByType(){
                this.loginTypeData = !this.loginTypeData;
                this.$emit('to-IndexScrollTop',scroll);
            },
            toScroll(scroll){
                this.$emit('to-IndexScroll',scroll);
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .login{
        position: relative;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 120px;
        &-img{
            position: relative;
            height: 100px;
            img{
                display: block;
                position: absolute;
                width: 100px;
                height: 100px;
                left: 50%;
                margin-left: -50px;
            }
        }
    }

</style>
