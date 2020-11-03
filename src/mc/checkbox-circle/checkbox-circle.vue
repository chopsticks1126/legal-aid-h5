<style lang="less" scoped>
    @import "./checkbox-circle.less";
</style>

<template>

    <label class="mc-checkbox-circle" :class="[
      { 'is-focus': focus },
      { 'is-checked': model === v }
    ]">

        <input type="checkbox" ref="input" :value="v" :name="name"
               @focus="focus = true"
               @blur="focus = false"
               :disabled="disabled"
               :checked="model === v"
               @change="handleChange" v-model="model">

        <i class="iconfont mc-checkbox-icon"></i>

        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </label>

</template>

<script>

    export default {
        name: 'McCheckboxCircle',
        props: {
            value: {},
            v: String,
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
                get () {
                    return this.value;
                },
                set (val) {
                    this.$emit('input', val);
                }
            },
        },
        methods: {
            handleChange () {
                this.$nextTick(() => {
                    this.$emit('change', this.model);
                })
            }
        },

    }
</script>

