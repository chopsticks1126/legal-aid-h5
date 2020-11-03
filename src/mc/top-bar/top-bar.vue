<style lang="less" scoped>
</style>

<template>
    <div class="mc-top-bar" :class="[border?'mc-top-bar-border':'']">

        <div class="mc-top-bar-back" @click="handleback">
            <slot name="hd">
                <i class="back_arrow"></i>
            </slot>
        </div>

        <div class="mc-top-bar-title">
            <slot>{{title}}</slot>
        </div>

        <div class="mc-top-bar-right" v-if="$slots.ft">
            <slot name="ft"></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'McTopBar',
        props: {
            title: {
                type: String,
                default: ''
            },
            border: {
                type: Boolean,
                default: true
            },
            callBack: null
        },
        mounted () {
        },
        methods: {
            handleback () {
                if (this.callBack) {
                    this.callBack()
                } else {
                    this.$router.go(-1)
                }
            }
        }
    }
</script>

