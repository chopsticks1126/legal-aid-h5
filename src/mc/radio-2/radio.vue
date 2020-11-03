<style lang="less" scoped>
</style>

<template>
    <label class="mc-cell-radio" :class="[disabled?'disabled':'']">

        <div class="hd" v-if="position==='left'">
            <input type="radio" ref="input" :value="v"
                   @focus="focus = true"
                   @blur="focus = false"
                   :disabled="disabled"
                   :checked="model === v"
                   @change="handleChange" v-model="model">
            <i class="iconfont mc-cell-radio-icon-check"></i>
        </div>

        <div class="bd" v-if="$slots.default">
            <slot>...</slot>
        </div>

        <div class="ft" v-if="position==='right'">
            <input type="radio" ref="input" :value="v"
                   @focus="focus = true"
                   @blur="focus = false"
                   :disabled="disabled"
                   :checked="model === v"
                   @change="handleChange" v-model="model">
            <i class="iconfont mc-cell-radio-icon-check"></i>
        </div>
    </label>
</template>

<script>
    export default {
        name: 'McRadio',
        props:{
            value: {},
            v: {
                type: [String]
            },
            disabled: Boolean,
            type:{
                type:Number,
                default:0 //0 raido为正常radio  1为钩子
            },
            position:{
                type:String,
                default:'right'
            }
        },
        data(){
            return {
                focus: false
            }
        },
        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        },
        methods: {
            handleChange() {
                this.$nextTick(() => {
                    this.$emit('change', this.model);
                });
            }
        }
    }
</script>
