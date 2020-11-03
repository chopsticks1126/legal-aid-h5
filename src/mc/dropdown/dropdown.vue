<style lang="less" scoped>
</style>

<template>

    <div class="dropdown" :class="[disabled?'disabled':'']" v-click-outside="hide" @click="toggleSelect">
        <div class="dropdown-trigger">
            <slot name="trigger">
            </slot>
        </div>
        <div class="dropdown-menu" :class="[menuRight?'dropdown-menu-right':'']" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'McDropdown',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            outline: {
                type: Boolean,  // 只对 primary success warning info error 有效
                default: false
            },
            disabled: Boolean,
            menuRight: Boolean,
            link: Boolean,
        },
        data ()  {
            return {
                open: false
            }
        },
        computed: {},
        mounted () {
//            document.addEventListener("click", () => {
//                this.open = false
//            });
        },
        methods: {
            toggleSelect (e) {
                e.stopPropagation();
                if (this.disabled) {
                    return
                }
                this.open = !this.open
            },
            hide(){
                this.open = false
            }
        }
    }
</script>
