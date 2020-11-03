<style lang="less" scoped>
</style>

<!--胶囊提示-->
<template>
    <transition name="mcFade">
        <div v-show="visible" class="mc-info" :class="typeClass" :style="wrapStyle">
            <span>{{message}}</span>
        </div>
    </transition>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                visible: false,
                closed: false,
                message: '',
                duration: 1500,
                callBack: null,
                timer: null,
                type: '',  //  'success','info', 'warning','error'
                position: {
                    type: String,
                    default: 'center'
                }
            };
        },

        mounted() {
            this.startTimer()
        },
        computed: {
            typeClass () {
                return "mc-" + this.type + '-color'
            },
            wrapStyle(){
                if (this.position === 'bottom') {
                    return {
                        bottom: '20%',
                        marginBottom: '-20px'
                    }
                } else if (this.position === 'top') {
                    return {
                        top: '20%',
                        marginTop: '-20px'
                    }
                } else if (this.position === 'center') {
                    return {
                        top: '50%',
                        marginTop: '-20px'
                    }
                }
                return {
                    top: '50%',
                    marginTop: '-20px'
                }
            }
        },
        watch: {
            closed(newVal) {
                if (newVal) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destroyElement)
                    setTimeout(() => {
                        this.destroyElement()
                    }, 200)
                }
            }
        },
        methods: {
            destroyElement () {
                this.$el.removeEventListener('transitionend', this.destroyElement)
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            clear () {  //清除一个实例，不执行回调函数
                this.closed = true
            },
            close() {
                this.closed = true
                if (typeof this.callBack === 'function') {  //此时的callBack在main.Js内已经处理过
                    this.callBack(this)
                }
            },
            clearTimer() {
                clearTimeout(this.timer)
            },
            startTimer () {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.duration);
                }
            }
        },

    };
</script>
