<style lang='less' scoped>
    @import '../style/index.less';
</style>
<style>
    .body-fixed {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: fixed;
    }
</style>

<template>
    <transition name='scale' @after-leave='beforeDestroyed'>
        <div class='preview_wrapper' :style='mainStyle' v-if='visible'>
            <p class='preview_top-label'>
                <span v-if="imgList.length > 1">{{currentIndex + 1}}/{{imgList.length}}</span>
                <span class='preview_top-center'>
					缩放比例:{{scaling}}，
					原图尺寸: {{currentImg.originx}} × {{currentImg.originy}}
				</span>
                <span class='preview_top-close' @click='close'>×</span>
            </p>

            <div class="preview_img-wrapper" ref='imgWrapper'>
                <div class='preview_img' :style="{width:100*imgList.length+'%', left:-currentIndex*100+'%'}">
                    <div v-for='(item,index) in imgList' class='preview_img-item'>
                        <img :src="item" alt="" :class="{'img-transition':!isMoving}">
                    </div>
                </div>
            </div>

            <div class='preview_panel'>
                <div>
                    <span @click="handleSize('-')" class='iconfont icon-jian'>-</span>
                    <span @click="handleSize('+')" class='iconfont icon-add_light'></span>
                    <span @click="handleSize('1:1')" class='iconfont icon-icon-test'>1:1</span>

                    <span class='iconfont icon-refresh_light' style="transform: rotateY(180deg);"
                          @click="rotate(-1)"></span>
                    <span class='iconfont icon-refresh_light' @click="rotate(1)"></span>

                    <span @click="move(-1)" v-show="currentIndex !== 0" class='iconfont icon-back_light'></span>
                    <span v-show='currentIndex === 0 && imgList.length>1' class='hide'></span>
                    <span @click="move(1)" v-show="currentIndex < imgList.length - 1"
                          class='iconfont icon-right'></span>
                    <span v-show='currentIndex === imgList.length-1 && imgList.length>1' class='hide'></span>

                </div>

            </div>
        </div>
    </transition>
</template>
<script>

    import {addClass, removeClass} from '../../utils/dom'

    import PopupManager from '../../utils/popup/popup-manager';
    import debounce from 'throttle-debounce/throttle'
    import throttle from 'throttle-debounce/throttle'
    import Hammer from 'hammerjs'

    export default{
        name:'ImgPreview',
        data(){
            return {
                imgList: [],
                zIndex: 99,
                curSignList: [], // 图片尺寸信息
                box_size: {}, // 容器尺寸
                currentIndex: 0,
                visible: false,
                isMoving: true, // 拖拽过程中取消过渡效果
            }
        },
        computed: {
            mainStyle(){
                return {
                    zIndex: this.zIndex
                }
            },
            currentImg(){
                return this.curSignList[this.currentIndex] || {}
            },
            scaling(){
                let ratio = this.curSignList[this.currentIndex] && this.curSignList[this.currentIndex].ratio;
                return Math.floor(ratio * 100) + '%';
            }
        },
        watch: {
            visible: {
                handler(val){
                    if (val) {
                        addClass(document.body, 'body-fixed')
                    } else {
                        removeClass(document.body, 'body-fixed')
                    }
                },
                immediate: true
            }
        },
        mounted(){
            this.zIndex = PopupManager.nextZIndex();
            setTimeout(() => {
                this.set_box_size()
                let imgs = this.$refs.imgWrapper.querySelectorAll('img');
                this.imgList.map((item, index) => {
                    this.setImgSize(index)
                        .then(() => {
                            // 设置图片居中
                            this.setImgCenter()
                            //开始 hammer
                            this.start_hammer(imgs[index], index)
                        })

                })
            }, 30);

            this.handle = debounce(500, () => {
                //设置容器信息
                this.set_box_size()

                //设置图片信息
                this.setImgSize(this.currentIndex)
            })
            window.addEventListener('resize', this.handle)

            setTimeout(() => {
                this.isMoving = false;
            }, 300)
        },
        methods: {
            setImgCenter(){
                let curImgNode = this.$refs.imgWrapper.querySelectorAll('img')[this.currentIndex];
                curImgNode.style.left = (this.box_size.x - this.currentImg.originx) / 2 + 'px';
                curImgNode.style.top = (this.box_size.y - this.currentImg.originy) / 2 + 'px';
            },
            forceChangeTransform(){
                let node = this.$refs.imgWrapper.querySelectorAll('img')[this.currentIndex]
                node.style.transform = `translate3d(${this.currentImg.transformX}px,${this.currentImg.transformY}px,0) scale(${this.currentImg.ratio}) rotate(${this.currentImg.rotate}deg)`
            },
            // 照片拖拽
            start_hammer(node, index){
                var hammertime = new Hammer(node);

                //水平方向平移
                hammertime.get('pan').set({direction: Hammer.DIRECTION_ALL});

                //多触点的 pinch<捏放>
                hammertime.get('pinch').set({enable: true});

                //开始水平移动
                hammertime.on('panstart', (ev) => {
                    this.isMoving = true;
                })

                //水平移动时
                hammertime.on('panmove', (ev) => {
                    let x = ev.deltaX + this.currentImg.transformX
                    let y = ev.deltaY + this.currentImg.transformY
                    node.style.transform = `translate3d(${x}px,${y}px,0) scale(${this.currentImg.ratio}) rotate(${this.currentImg.rotate}deg)`
                });

                //水平移动结束
                hammertime.on('panend', (ev) => {
                    let res = node.style.transform.split(')')[0].split('(')[1].replace(/,|\s/g, '').split('px')
                    this.currentImg.transformX = parseInt(res[0])
                    this.currentImg.transformY = parseInt(res[1])
                    this.$nextTick(() => {
                        this.isMoving = false;
                    })
                });

                hammertime.on('pinchstart', (ev) => {
                    this.isMoving = true;
                })
                hammertime.on('pinchmove', (ev) => {
                    let ratio = this.currentImg.ratio * ev.scale
                    node.style.transform = `translate3d(${this.currentImg.transformX}px,${this.currentImg.transformY}px,0) scale(${ratio}) rotate(${this.currentImg.rotate}deg)`
                })

                hammertime.on('pinchend', (ev) => {
                    let scale = node.style.transform.split(')')[1].split('(')[1].replace(/\s/g, '')
                    this.currentImg.ratio = scale
                    setTimeout(() => {
                        this.isMoving = false;
                    })
                })
            },

            // 照片上一个，下一个切换
            move(num){
                let wrapper = this.$el.querySelector('.preview_img')
                let resIndex = this.currentIndex + num;
                if (resIndex < 0 || resIndex >= this.imgList.length) {
                    return
                }
                this.currentIndex = resIndex;
                this.$nextTick(() => {
                    this.currentImg.transformX = 0
                    this.currentImg.transformY = 0

                    if(this.currentImg.ratio<this.currentImg.best_ratio){
                        this.currentImg.ratio=this.currentImg.best_ratio
                    }
                    this.forceChangeTransform();
                    this.setImgCenter()
                })
            },

            //照片缩放
            handleSize(type, coe = 1){
                let ratio;
                let cur = this.curSignList[this.currentIndex];

                switch (type) {
                    case '1:1':
                        ratio = cur && cur.ratio == 1 ? cur.best_ratio : 1;
                        break;
                    case '+':
                        ratio = cur.ratio * (1 + coe / 10);
                        break;
                    case '-':
                        ratio = cur.ratio / (1 + coe / 10);
                        break;
                    default:
                        break;
                }
                cur.ratio = ratio;

                cur.transformX = 0
                cur.transformY = 0
                this.$nextTick(() => {
                    this.setImgCenter()
                    this.forceChangeTransform();
                })
            },
            close(){
                this.visible = false
            },
            getSize(src){ // 获取图片初始尺寸
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.onload = function () {
                        let image = this
                        resolve({
                            x: image.width,
                            y: image.height
                        })
                    }
                    image.src = src
                })
            },
            rotate(num){
                let cur = this.curSignList[this.currentIndex];
                cur.rotate = cur.rotate + num * 90
                this.forceChangeTransform()
            },

            setImgSize(index){ // 设置图片信息
                return this.getSize(this.imgList[index])
                    .then((img) => {
                        let best_ratio = Math.min(this.box_size.x / img.x, this.box_size.y / img.y);
                        let ratio = best_ratio > 1 ? 1 : best_ratio;
                        this.$set(this.curSignList, index, {
                            ratio: ratio,//缩放比例(初始默认只缩小，不放大)
                            rotate: 0,//旋转角度
                            best_ratio: best_ratio,//显示的最佳比例
                            x: ratio * img.x,//当前尺寸
                            y: ratio * img.y,
                            originx: img.x,//原图尺寸
                            originy: img.y,
                            transformX: 0,
                            transformY: 0,
                        })
                    })
            },
            // 获取容器尺寸
            set_box_size(){
                this.box_size = {
                    x: this.$el.querySelector('.preview_img-item').clientWidth,
                    y: this.$el.querySelector('.preview_img-item').clientHeight
                }
            },
            beforeDestroyed(){
                window.removeEventListener('resize', this.handle)
                this.$el.parentNode.removeChild(this.$el)
            },
        },
    }
</script>
