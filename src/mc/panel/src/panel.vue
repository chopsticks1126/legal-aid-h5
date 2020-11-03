<style lang="less" scoped>
    @import "./panel.less";
</style>

<template>
    <div class="mc-panel" :class="[access?'mc-panel-access':'']">
        <div class="mc-panel-hd" v-if="title">{{title}}</div>
        <div class="mc-panel-bd">
            <slot></slot>
        </div>
        <slot name="ft">
            <div v-show="access" class="mc-panel-ft" @click="handleClick">
                {{accessText}}
            </div>
        </slot>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'McPanel',
        props: {
            title: {
                type: String,
                default: ''
            },
            access: {
                type: Boolean,
                default: false
            },
            accessText: {
                type: String,
                default: '更多'
            }
        },
        methods: {
            handleClick(evt){
                this.$emit('click', evt)
            }
        }
    };
</script>
