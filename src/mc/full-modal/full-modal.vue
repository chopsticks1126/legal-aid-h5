<style lang="less" scoped>
</style>

<template>
    <transition name="mc-ani-updown">

        <div class="mc-full-modal" :class="[showhd?'mc-full-modal-hashd':'']" v-show="value">
            <div class="hd" v-if="showhd">
                <slot name="hd">
                    <i class="closeicon" @click="handleClose"></i>
                    {{title}}
                </slot>
            </div>

            <div class="bd" ref="modalbd">
                <slot></slot>
            </div>
        </div>

    </transition>
</template>

<script type="text/babel">

    import {addClass, removeClass} from '../utils/dom'

    export default {
        name: 'McFullModal',
        props: {
            value: {},
            showhd: {
                type: Boolean,
                default: true //是否显示头部，默认true,显示，不要头部传 false 即可
            },
            title: '',
            zindex: 200
        },
        data() {
            return {
                tout: null,
            };
        },
        mounted() {
        },
        watch: {
            value(val) {
                if (val) {
                    addClass(document.body, 'mc-modal-body-fixed')
                    this.$nextTick(() => {
                        this.$refs.modalbd.scrollTop = 0;
                    });
                } else {
                    removeClass(document.body, 'mc-modal-body-fixed')
                }
            }
        },
        methods: {
            handleClose() {
                this.$emit('input', false);
                this.$emit('visible-change', false);
            },
        }

    };
</script>
