<style lang="less" scoped>
    @import "input";
</style>

<template>
    <label class="mc-cell-field"
           :class="[full?'mc-cell-field-full':'',access?'mc-cell-field-access':'',disabled?'mc-cell-field-disabled':'',isShowClear?'mc-cell-field-showclear':'',border?'mc-cell-field-border-'+border:'']">

        <div class="hd" style="display: flex" v-if="!full">
            <span style="color: red">*</span><label>{{label}}</label>
        </div>

        <div class="bd">

            <input :type="type" class="mc-input"
                   :placeholder="placeholder"
                   v-bind:value="value"
                   v-bind:disabled="disabled"
                   v-on:focus="handleFocus"
                   v-on:blur="handleBlur"
                   v-on:input="updateValue($event.target.value)"
                   @change="handleChange"
            >

            <i class="clearicon iconfont icon-round_close_light" v-show="isShowClear"
               @click="clearinput"></i>

        </div>

        <div class="ft">
            <slot name="ft"></slot>
        </div>

    </label>
</template>

<script>
    export default {
        name: 'McInput',
        props: {
            value: {
                type: [String, Number]
            },
            label: String,
            placeholder: String,
            disabled: Boolean,
            access: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            full: Boolean,
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
            isShowClear(){
                if (!this.clearable) {
                    return false
                }
//                if (!this.focused) {
//                    return false
//                }
                if (this.value) {
                    return true
                }
                return false
            }
        },
        methods: {
            updateValue: function (value) {
//                let formattedValue = value.trim();
//                if (formattedValue !== value) {
//                    this.$refs.input.value = formattedValue
//                }
                this.$emit('input', value)
            },
            clearinput(){
                this.$emit('input', '')
            },
            handleFocus(event) {
                this.focused = true;
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.focused = false;
                this.$emit('blur', event);
            },
            handleChange(event) {
                this.$emit('change', event.target.value);
            },
        }
    }
</script>

