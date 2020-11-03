<style lang="less" scoped>
</style>

<template>

    <div>
        <transition name="mc-ani-updown">

            <div class="mc-bottom-modal" v-show="visible">

                <div class="hd" v-if="showhd">
                    <slot name="hd">
                            <span class="cancel-text" v-if="cancelButtonText"
                                  @click="doCancel">{{cancelButtonText}}</span>
                        <span class="confirm-text" v-if="confirmButtonText"
                              @click="doConfirm">{{confirmButtonText}}</span>
                        {{title}}
                    </slot>
                </div>
                <div class="bd">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>

</template>

<script type="text/babel">
    import Popup from '../utils/popup';

    export default {
        name: 'McBottomModal',
        mixins: [Popup],
        props: {
            modal: {
                default: true
            },
            closeOnClickModal: {
                default: true
            },
            title: '',
            showhd: {
                type: Boolean,
                default: true //是否显示头部，默认true,显示，不要头部传 fale 即可
            },
            cancelButtonText: {  //取消按钮的文字，传空则 不显示
                type: String,
                default: '取消'
            },
            confirmButtonText: { //确定按钮的文字，传空则 不显示
                type: String,
                default: '确定'
            },
            cancelFn: null, // 点击取消之后回调
            confirmFn: null, // 点击确认之后回调
        },
        methods: {
            handleClose() {
                this.$emit('visible-change', false);
            },
            doCancel() {
                this.handleClose();
                if (typeof this.cancelFn === 'function') {
                    this.cancelFn(this);
                }
            },
            doConfirm(){
                this.handleClose();
                if (typeof this.confirmFn === 'function') {
                    this.confirmFn(this);
                }
            },
        },
    };
</script>
