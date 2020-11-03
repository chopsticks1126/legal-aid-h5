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

                <div class="mc_message_ft">
                    <a class="mc_btn_dialog" @click="closeAlert">{{confirmButtonText}}</a>
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
                callBack: null,
                showConfirmButton: true,
                confirmButtonText: '确定'
            };
        },
        methods: {
//      willOpen(){
//        alert('will open')// 钩子，在utils/popup/index.js  182 line
//      },
            closeAlert() {
                this.visible = false;
                if (typeof this.callBack === 'function') {
                    this.callBack(this);
                }
                setTimeout(() => {
                    this.destroyElement()
                }, 200)
            },
            destroyElement() {
                this.$el.parentNode.removeChild(this.$el);
            },
        }
    };
</script>
