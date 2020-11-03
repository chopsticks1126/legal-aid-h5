<style lang="less" scoped>

    @import "../../style/fn.less";

    .mc_search_bar {
        position: relative;
        padding: 0.1rem 0.1rem;
        box-sizing: border-box;
        background-color: #fff;
        height: 0.5rem;
        display: flex;
    }

    .mc_nv_back {
        position: relative;
        width: 0.4rem;
    }

    .mc_search_outer {
        position: relative;

        background-color: #F4F8F9;
        border-radius: 3rem;

        height: 0.3rem;
        flex: 1;
    }

    .mc_search_inner {
        position: relative;
        padding-left: 0.35rem;
        padding-right: 0.30rem;
        height: 0.30rem;
        width: 100%;
        box-sizing: border-box;
        border: none;
        z-index: 1;

        border-radius: 5rem;
    }

    .mc_search_inner .mc_search_input {
        display: block;
        width: 100%;
        height: 0.20rem;
        line-height: 0.20rem;
        padding-top: 0.05rem;
        padding-bottom: 0.05rem;
        border: 0;
        font-size: 0.14rem;
        box-sizing: content-box;
        background: transparent;
        color: #666;
    }

    .mc_search_inner .mc_search_input:focus {
        outline: none;
        color: #666;
    }

    .mc_search_inner .mc_search_icon {
        position: absolute;
        left: 0.10rem;
        line-height: 0.28rem;
        font-size: 0.18rem;
        color: #C4C4C4;
    }

    .mc_search_inner .mc_clear_icon {
        position: absolute;
        right: 0.11rem;
        top: 0.01rem;
        line-height: 0.28rem;
        font-size: 0.18rem;
        color: #ccc;
    }

    .mc_search_ft {
        line-height: 0.28rem;
        padding-left: 0.10rem;
        color: #808080;
        font-size: 0.16rem;
    }

    .mc_search_input:not(:valid) ~ .mc_icon_clear {
        display: none;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }

</style>

<template>
    <div class="mc_search_bar">

        <div class="mc_nv_back" v-if="$slots.hd">
            <slot name="hd"></slot>
        </div>

        <div class="mc_search_outer">
            <div class="mc_search_inner">
                <i class="mc_search_icon iconfont icon-search_light"></i>
                <input type="search" class="mc_search_input" ref="input" v-bind:value="value" :placeholder="placeholder"
                       v-on:input="updateValue($event.target.value)" v-on:keyup.enter="search"/>
                <i v-if="value" class="mc_clear_icon iconfont icon-round_close_light" @click="clearKeyword"></i>
            </div>
        </div>

        <div class="mc_search_ft" v-if="$slots.ft">
            <slot name="ft">
                取消
            </slot>
        </div>

    </div>

</template>

<script>
    export default {
        name:'McSearchBar',
        props: {
            value: {},
            callBack:null,
            placeholder:''
        },
        methods: {

            // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
            updateValue: function (value) {
                var formattedValue = value.trim()  // 删除两侧的空格符

                // 如果值不统一，手动覆盖以保持一致
                if (formattedValue !== value) {
                    this.$refs.input.value = formattedValue
                }

                // 通过 input 事件发出数值
                this.$emit('input', formattedValue)
            },
            handleback () {
                if(this.callBack){
                    this.callBack()
                }else{
                    this.$router.go(-1)
                }
            },
            clearKeyword () {
                this.$emit('input','')
            },
            search () {
                this.$emit('on-search')
            }
        }
    }
</script>

