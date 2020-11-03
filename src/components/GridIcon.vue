<style lang="less" scoped>

    @import "../style/fn";
    .mc_grid {
        display: block;
        color: #333;
        text-align: center;
        position: relative;
        float: left;
        width: 100% / 3;
        box-sizing: border-box;

        &:before {
            content: '';
            position: absolute;
            box-sizing: border-box;
            width: 200%;
            height: 200%;
            left: 0;
            top: 0;
            border-bottom: 1px solid #D9D9D9;
            border-right: 1px solid #D9D9D9;
            transform-origin: 0 0;
            transform: scale(.5);
        }

        &:nth-child(3n) {
            &:before {
                border-right-width: 0;
            }
        }
        &:active {
            background-color: #E4E4E4;
        }
    }

    .mc_icon {
        display: inline-block;
        font-size: 28px;
        margin-top: 20px;
        margin-bottom: 6px;


        font-size: 0.28rem;
        margin-top: 0.20rem;
        margin-bottom: 0.06rem;

        line-height: 1;
    }
    .mc_icon_name{
        height: 42px;
        padding:0 4px;
        font-size: 11px;

        height: 0.42rem;
        padding:0 0.04rem;
        font-size: 0.11rem;


        line-height: 1.4;
        .ellipsisLn(2);
    }
</style>

<template>
    <router-link :to="url" class="mc_grid" :target="target">
        <i :class="['mc_icon','iconfont',icon]"></i>
        <div class="mc_icon_name">
            {{name}}
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'gridIcon',
        props: ['name', 'url', 'icon','target'],
    }
</script>

