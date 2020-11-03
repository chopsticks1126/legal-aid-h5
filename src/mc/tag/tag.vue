<style lang="less" scoped>
    @import "../style/fn";
    .mc-tag {
        display: inline-block;
        position: relative;
        padding: 0 0.12rem;

        height: 0.3rem;
        line-height: 0.3rem;

        font-size: 0.12rem;
        color: #999;
        box-sizing: border-box;
        background-color:#fff;
        white-space: nowrap;

        border-radius: 0.50rem;

        &:after {
            content: " ";
            width: 200%;
            height: 200%;
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid rgba(0, 0, 0, .2);
            transform: scale(.5);
            transform-origin: 0 0;
            box-sizing: border-box;
            border-radius: 0.50rem;
        }

        &.mc-tag-active{
            color: #fff;
            background-color: @globalPrimaryColor;
        }

        &.mc-tag-active:after{
            border: 1px solid @globalPrimaryColor;
        }


        .iconfont{
            vertical-align: bottom;
        }
    }
</style>

<template>
    <span class="mc-tag" @click="handleClick" :class="[active?'mc-tag-active':'']">
        <slot></slot>
    </span>
</template>

<script type="text/babel">

    export default {
        name: 'McTag',
        props: {
            active: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event)
            },
        }
    };
</script>
