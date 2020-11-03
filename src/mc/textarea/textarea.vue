<style lang="less" scoped>
    @import "textarea.less";
</style>

<template>

    <label class="mc-cell-textarea"
           :class="[disabled?'mc-cell-textarea-disabled':'',border?'mc-cell-textarea-border':'']">

        <div class="hd">
           <span style="color: red">*</span>{{label}}
        </div>

        <div class="bd">

               <textarea :type="type" class="mc-input" :placeholder="placeholder"
                         v-bind:value="value"
                         v-bind:disabled="disabled"
                         v-on:input="updateValue($event.target.value)"
               ></textarea>

        </div>

    </label>

</template>

<script>
    export default {
        name: 'McTextarea',
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
                default: false
            },
            full: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            border: {
                type: Boolean,
                default: false
            },
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
                if (!this.focused) {
                    return false
                }
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

