<style lang="less" scoped>
</style>


<template>
    <label class="mc-cell-checkbox" :class="[disabled?'disabled':'']">

        <div class="hd" v-if="position==='left'">

            <input type="checkbox" ref="input" :value="v" :name="name"
                   @focus="focus = true"
                   @blur="focus = false"
                   :disabled="disabled"
                   :checked="model === v"
                   @change="handleChange"
                   v-model="model">

            <i class="iconfont mc-checkbox-icon"></i>
        </div>

        <div class="bd">
            <slot>...</slot>
        </div>

        <div class="ft" v-if="position==='right'">

            <input type="checkbox" ref="input" :value="v" :name="name"
                   @focus="focus = true"
                   @blur="focus = false"
                   :disabled="disabled"
                   :checked="model === v"
                   @change="handleChange"
                   v-model="model">

            <i class="iconfont mc-checkbox-icon"></i>
        </div>

    </label>
</template>

<script>
    export default {
        name: 'McCheckbox',
        props:{
            value: {},
            v: String,
            name: String,
            circle:Boolean,
            disabled: Boolean,
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

