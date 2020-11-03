<style lang="less" scoped>
    .mc-nav-tab {
        width: 100%;
        background-color: #fff;
        text-align: center;
        height: 0.5rem;
        font-size: 0;
    }
    .mc-nav-tab-border{
        box-shadow: 0 1px 2px rgba(0, 0, 0, .06);
    }
</style>

<template>
    <div class="mc-nav-tab" :class="[border?'mc-nav-tab-border':'']">
        <slot></slot>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'McNavTab',
        props: {
            value:{},
            border: {
                type: Boolean,
                default: true
            },
        },
        methods: {

        }
    };
</script>
