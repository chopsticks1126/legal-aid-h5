<template>
    <transition name="mcModalAnim">

        <div class="mc_message_box" v-show="visible">
            <div class="mc_message">

                <div class="mc_message_bd">
                    <div class="mc_message_title" v-if="title">
                        {{title}}
                    </div>
                    <div class="mc_message_text">
                        <slot>{{ message }}</slot>
                    </div>
                </div>
                <div class="mc_message_ft mc_confirm">
                    <a class="mc_btn_dialog mc_btn_cancel" @click="cancelConfirm">{{cancelButtonText}}</a>
                    <a class="mc_btn_dialog" @click="doConfirm">{{confirmButtonText}}</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/babel">

    import Popup from '../../utils/popup';

    export default {
        mixins: [Popup],
        props: {
            modal: {
                default: true
            },
            lockScroll: {
                default: true
            }
        },
        data() {
            return {
                title: '',
                message: null,
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                cancelFn: null,
                confirmFn: null
            };
        },
        methods: {
            cancelConfirm() {
                this.visible = false;
                setTimeout(() => {
                    this.destroyElement()
                    if (typeof this.cancelFn === 'function') {
                        this.cancelFn(this);
                    }
                }, 200)
            },
            doConfirm(){
                this.visible = false;
                setTimeout(() => {
                    this.destroyElement()
                    if (typeof this.confirmFn === 'function') {
                        this.confirmFn(this);
                    }
                }, 200)
            },
            destroyElement() {
                this.$el.parentNode.removeChild(this.$el);
            },
        }
    };
</script>
