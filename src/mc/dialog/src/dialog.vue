<template>
    <transition name="mcModalAnim">

        <div class="mc-dialog-box" tabindex="-1" v-show="visible" @click.self="handleWrapperClick">

            <div class="mc-dialog" ref="dialog">

                <i class="mc-dialog-close iconfont icon-round_close_light" v-if="showClose" @click="hide"></i>

                <div class="mc-dialog-hd" v-if="title">
                    <div class="mc-dialog-title">{{title}}</div>
                </div>

                <div class="mc-dialog-bd">
                    <slot></slot>
                </div>

                <div class="mc-dialog-ft" v-if="$slots.ft">
                    <slot name="ft"></slot>
                </div>

            </div>
        </div>
    </transition>
</template>

<script type="text/babel">

    import Popup from '../../utils/popup';

    export default {
        name: 'McDialog',
        mixins: [Popup],
        props: {
            title: {
                type: String,
                default: ''
            },
            showClose: { //是否显示关闭按钮
                type: Boolean,
                default: true
            },
            modal: {  //是否显示黑色背景
                default: true
            },
            closeOnClickModal: {  //点击背景是否关闭弹窗
                type: Boolean,
                default: true
            },
        },
        data() {
            return {};
        },
        methods: {
            handleWrapperClick() {
                if (!this.closeOnClickModal) return;
                this.hide();
            },
            hide() {
                this.$emit('update:visible', false);
                this.$emit('visible-change', false);
            }
        },
        mounted() {
        }

    };
</script>
