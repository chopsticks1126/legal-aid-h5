<style lang="less" scoped>
    @import "select";
</style>

<template>
    <div class="mc-cell-select-wrap">

        <label class="mc-cell-select" :class="[access?'mc-cell-select-access':'',
                                            disabled?'mc-cell-select-disabled':'',
                                            border?'mc-cell-select-border-'+border:'',
                                            isShowClear?'mc-cell-select-showclear':''
                                            ]">

            <div class="hd">
                <slot name="hd">
                    <label><span style="color: red">*</span>{{label}}</label>
                </slot>
            </div>

            <div class="bd">
                <div class="show-text" :class="[showText==placeholder?'placeholder-color':'']">
                    {{showText}}
                    <i class="clearicon iconfont icon-round_close_light" v-show="isShowClear" @click="clearinput"></i>
                </div>

                <select class="mc-select-inner"
                        v-bind:value="value"
                        v-bind:disabled="disabled"
                        v-on:change="handleChange"
                >
                    <option value="" v-if="placeholder">{{placeholder}}</option>
                    <option :value="item.value" v-for="(item,index) in options" :key="index">{{item.text}}</option>
                </select>


            </div>

            <div class="access-arrow"></div>

            <div class="ft" v-if="$slots.ft">
                <slot name="ft"></slot>
            </div>
        </label>

        <div class="mc-cell-select-msg" v-if="$slots.msg">
            <slot name="msg"></slot>
        </div>

    </div>


</template>

<script>
    export default {
        name: 'McSelect',
        props: {
            value: {
                type: [String, Number]
            },
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
            label: String,
            placeholder: {
                default: '请选择'
            },
            disabled: Boolean,
            access: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'text'
            },
            border:{
                type:String,
                default:'bottom'
            }
        },
        data(){
            return {
                hovering: false,
                focused: false
            }
        },
        computed: {
            showText(){
                let tmp = this.placeholder.substring()
                this.options.map(item => {
                    if (item.value == this.value) {
                        tmp = item.text
                    }
                })
                return tmp
            },
            isShowClear(){
                if (!this.clearable) {
                    return false
                }
                if (this.value) {
                    return true
                }
                return false
            }
        },
        watch: {
            options: {
                deep: true,
                handler: function (newVal, oldVal) {
                }
            },
        },
        mounted(){
        },
        methods: {
            clearinput(){
                this.$emit('input', '')
            },
            handleChange(event) {
                this.$emit('input', event.target.value);
                this.$emit('change',event.target.value)
            },
        }
    }
</script>

