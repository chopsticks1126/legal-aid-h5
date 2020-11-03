<style lang="less" scoped>
    .img-top-show {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000000;
        background-color: #3C3C3C;
    }

    .closeicon {
        position: absolute;
        display: block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        left: 5px;
        top: 5px;
        font-size: 30px;
    }

    .ss-wrap {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
    }

    .index-num {
        position: absolute;
        background-color: #303030;
        display: inline-block;
        bottom: 20px;
        left: 50%;
        padding: 4px 22px;
        transform: translateX(-50%);
        border-radius: 10000px;
        color: #fff;
        font-size: 15px;
    }
</style>

<template>

    <transition name="mc-ani-updown">

        <div class="img-top-show" v-if="value">

            <i class="closeicon iconfont icon-close_light" @click="handleClose"></i>

            <div class="ss-wrap" :style="vstyle">
                <img-swipe :pagination="false" @on-height="setStyle" @on-index="setIndex">
                    <img-swipe-item v-for="(item,index) in imglist" :key="index+'_imgtopshow'">
                        <img :src="item">
                    </img-swipe-item>
                </img-swipe>
            </div>

            <span class="index-num">
            {{index}} / {{imglist.length}}
            </span>
        </div>
    </transition>

</template>

<script>

    export default {
        name: 'McImgTopShow',
        props: {
            value: {},
            imglist: {
                type: Array,
                default: []
            },
        },
        data () {
            return {
                vstyle: {},
                index: 1,
            }
        },
        mounted(){
        },
        methods: {
            handleClose(){
                this.$emit('input', false)
            },
            setStyle(v){
                this.vstyle = {
                    marginTop: (-(v / 2)) + 'px'
                }
            },
            setIndex(v){
                this.index = v.index + 1
            }
        }

    }
</script>
