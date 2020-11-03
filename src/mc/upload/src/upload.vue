<style lang='less' scoped>
    @import "../../style/fn";

    .mc-upload {
        background: #fff;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        color: #8c939d;
        position: relative;
        border: 1px dashed #d9d9d9;

        .mc-upload-preview {
            width: 100%;
            height: 100%;
            position: relative;
            > img {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                max-width: 100%;
                max-height: 100%;
            }

            .closeicon {
                font-size: 24px;
                position: absolute;
                z-index: 99;
                right: -12px;
                top: -12px;
                color: @globalErrorColor;
            }
        }

        .mc-upload-icon {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 32px;
            }
        }

        .mc-file-input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            display: none;
        }

    }
</style>

<template>
    <div class="mc-upload" :style="vstyle">

        <div class="mc-upload-preview" v-if="imgUrl">
            <img :src="imgUrl" class="mc-upload-preview-img" @click="preview"/>
            <i class="closeicon iconfont icon-round_close_light" @click="deleteFile"></i>
        </div>

        <div class="mc-upload-icon" v-if="!imgUrl" @click="startUpload">
            <i class='iconfont icon-add_light'></i>
        </div>

        <input type="file" class="mc-file-input" name="" ref="input"
               @change="handleChange"
               :accept="accept"
               :multiple="multiple">
    </div>
</template>

<script>

    export default{
        name: 'McUpload',
        props: {
            accept: {
                type: String,
                default: 'image/*'
            },
            afterUpload: {
                type: Function,
            },
            imgUrl: {
                type: String
            },
            multiple: {
                type: Boolean,
                default: false
            },
            onChange: {
                type: Function,
            },
            onDelete: {
                type: Function
            },
            onPreview: {
                type: Function
            },
        },
        data(){
            return {
                vstyle: {}
            }
        },
        watch: {
            imgUrl: {
                handler(val){
                    val &&
                    this.$nextTick(() => {
                        this.getSize(this.imgUrl)
                            .then((res) => {
                                this.setImgContainSize(res.x, res.y)
                            })

                    })
                },
                immediate: true
            }
        },
        mounted(){
            let width = this.$el.offsetWidth;
            this.vstyle = {
                height: width + 'px'
            }
        },
        methods: {
            startUpload(){
                this.$refs.input.click()
            },
            handleChange(e){
                let files = e.target.files;
                if (!files || !files.length) {
                    this.onChange(null)
                    return
                }
                this.onChange(files)
            },
            deleteFile(e){
                e.stopPropagation()
                this.onDelete && this.onDelete()
            },
            preview(){
                this.onPreview && this.onPreview()
            },
            getSize(src){ // 获取图片初始尺寸
                return new Promise((resolve, reject) => {
                    var image = new Image();
                    image.onload = function () {
                        var image = this
                        resolve({
                            x: image.width,
                            y: image.height
                        })
                    }
                    image.src = src
                })
            },
            setImgContainSize(x, y){
                let img = this.$el.querySelector('.mc-upload-preview-img');
                let width = parseInt(this.$el.clientWidth);
                let height = parseInt(this.$el.clientHeight);
                if (x / width > y / height) {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                } else {
                    img.style.height = '100%';
                    img.style.width = 'auto';
                }
            },
        },

    }
</script>

