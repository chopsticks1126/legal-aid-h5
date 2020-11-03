<style lang="less" scoped>
    @import "./radio-circle";
</style>


<template>

    <label class="mc-radio-circle" :class="[
      { 'is-focus': focus },
      { 'is-checked': model === v }
    ]">

        <input type="radio" ref="input" :value="v" :name="name"
               @focus="focus = true"
               @blur="focus = false"
               :disabled="disabled"
               :checked="model === v"
               @change="handleChange" v-model="model">

        <i class="iconfont mc-radio-circle-icon"></i>

        <span v-if="$slots.default">
            <slot></slot>
        </span>

    </label>
</template>

<script>

    import emitter from '../utils/emitter';

    export default {
        name: 'McRadioCircle',
        mixins: [emitter],
        props: {
            value: {},
            v: {
                type: [String]
            },
            name: String,
            disabled: Boolean,
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
                    this.dispatch('mc-form-item', 'mc.form.change', [this.value]);
                });
            }
        }
    }
</script>

