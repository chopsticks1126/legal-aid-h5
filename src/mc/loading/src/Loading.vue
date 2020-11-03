<template>
    <div class="mc-loading">
        <span class="l_icon_a"></span>
        <slot>正在加载</slot>
    </div>
</template>

<script>
    export default {
        name: 'McLoading',
    }
</script>

<style lang="less" scoped>

    .mc-loading{
        display: inline-block;

        height: 30px;
        line-height: 30px;

        font-size: 14px;

        text-align: center;

        color:#ccc;
    }

    .l_icon_a {
        vertical-align: middle;
        margin-bottom: 2px;
        margin-right: 4px;

        display: inline-block;

        height: 14px;
        width: 14px;
        border-radius: 100%;
        border: 3px solid #31BD16;

        border-bottom-color: #ccc;

        animation: mcloadingrotate 1s linear infinite;
    }

    @keyframes mcloadingrotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
