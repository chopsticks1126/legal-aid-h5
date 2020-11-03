<style lang="less" scoped>
    @import "../../style/fn";

    .mc-loading-main-warp {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        /*background-color: rgba(40, 40, 40, 0.75);*/
        z-index: 1000000;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .mc-loading-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .mc-loading-main-icon {
        display: block;
        height: 24px;
        width: 24px;
        border-radius: 100%;
        border: 3px solid @globalPrimaryColor;
        border-bottom-color: #eee;

        animation: mc-loading-main-rotate 1s linear infinite;

        margin-bottom: 12px;
    }

    @keyframes mc-loading-main-rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .mc-loading-main-text {
        margin-top: 4px;
        line-height: 1;
        font-size: 14px;
        color: #ccc;
    }

</style>

<template>
    <div class="mc-loading-main-warp" v-show="visible">
        <div class="mc-loading-main">
            <span class="mc-loading-main-icon"></span>
            <span class="mc-loading-main-text">
                <slot>{{message}}</slot>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                closed: false,
                visible: false,
                message: ''
            }
        },
        mounted () {
        },
        computed: {
        },
        watch: {
            closed (newVal) {
                if (newVal) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                    setTimeout(() => {
                        this.destroyElement()
                    }, 200)
                }
            }
        },
        methods: {
            destroyElement () {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            //关闭一个实例，执行回调
            close() {
                this.closed = true;
            }
        },

    };
</script>
