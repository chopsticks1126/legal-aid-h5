<style lang="less" scoped>

    @import "../style/fn.less";

    .mc-switch {
        height:  0.24rem;
    }

    @mcSwitchHeight: 0.24rem;

    input[type="checkbox"] {
        appearance: none;
        position: relative;
        width: 0.48rem;
        height: @mcSwitchHeight;
        border: 1px solid #DFDFDF;
        outline: 0;
        border-radius: 0.16rem;
        box-sizing: border-box;
        background: #DFDFDF;
        background-color: #DFDFDF;
        transition: background-color .1s, border .1s;
    }

    input[type="checkbox"]:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 0.46rem;
        height: @mcSwitchHeight - 0.02;
        border-radius: 0.23rem;
        background-color: #FDFDFD;
        transition: transform .3s;
        transition: transform .35s cubic-bezier(0.45, 1, 0.4, 1);
    }

    input[type="checkbox"]:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: @mcSwitchHeight - 0.02;
        height: @mcSwitchHeight - 0.02;
        border-radius: 0.15rem;
        background-color: #FFFFFF;

        box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.4);
        transition: transform .35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }

    input[type="checkbox"]:checked {
        border-color: @globalPrimaryColor;
        background-color: @globalPrimaryColor;
    }

    input[type="checkbox"]:checked:before {
        transform: scale(0);
    }

    input[type="checkbox"]:checked:after {
        transform: translateX(0.23rem);
    }
</style>

<template>

    <div class="mc-switch" @click="handleClick">
        <input type="checkbox" ref="input"
               @focus="focus = true"
               @blur="focus = false"
               v-model="model"
               :value="v"
               @change="handleChange"
               :checked="isActive"
               :disabled="disabled"
        >
    </div>
</template>

<script>
    export default {
        name: 'McSwitch',
        props: {
            value: {
                type: [Boolean, String, Number],
                default: false
            },
            v: String,
            activeColor: {
                type: String,
                default: '#15CE70'
            },
            activeValue: {
                type: [Boolean, String, Number],
                default: 1
            },
            inactiveValue: {
                type: [Boolean, String, Number],
                default: 0
            },
            inactiveColor: {
                type: String,
                default: '#dcdfe6'
            },
            disabled: Boolean,
        },
        data(){
            return {
                focus:false
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
            },
            isActive(){
                if (this.value === this.activeValue) {
                    return true
                }
                return false
            },
        },
        mounted(){

        },
        methods: {
            handleChange(e){
                if(this.disabled){
                    return
                }
                this.$emit('input', !this.isActive ? this.activeValue : this.inactiveValue);
                this.$emit('change', !this.isActive ? this.activeValue : this.inactiveValue);

                this.$nextTick(() => {
                });
            },
            handleClick(event){
                this.$emit('click', event)
            }
        }
    }
</script>
