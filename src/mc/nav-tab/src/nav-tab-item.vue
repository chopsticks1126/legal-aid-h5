<style lang="less" scoped>
    @import "../../style/fn";
    .mc-nav-tab-item {
        display: inline-block;
        text-align: center;
        height: 100%;
        padding: 0 0.02rem;
        line-height: 0.5rem;
        font-size: 0.16rem;

        color: @globalTextColor;
        &.active {
            border-bottom: 0.03rem solid @globalPrimaryColor;
        }
    }

    .mc-nav-tab-item + .mc-nav-tab-item {
        margin-left: 0.5rem;
    }

</style>

<template>
    <div class="mc-nav-tab-item" @click="$parent.$emit('input', v)"
         :class="{'active': $parent.value === v }">
        <slot></slot>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'McNavTabItem',
        props: ['v'],
        methods: {}
    };
</script>
