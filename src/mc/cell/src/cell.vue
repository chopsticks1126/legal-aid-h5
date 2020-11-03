<style lang="less" scoped>
</style>

<template>
    <div class="mc-cell" :class="[access?'mc-cell-access':'',border?'mc-cell-border-'+border:'']" @click="handleClick">
        <div class="mc-cell-hd">
            <slot name="hd">
               <span style="color: red">*</span>{{label}}
            </slot>
        </div>
        <div class="mc-cell-bd">
            <slot></slot>
        </div>
        <div class="mc-cell-ft">
            <slot name="ft"></slot>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'McCell',
        props: {
            label: {
                default: ''
            },
            access: {
                default: ''
            },
            border:{
                type:String,
                default:'bottom'
            }
        },
        methods: {
            handleClick(evt){
                if (this.url) {
                    location.href = this.url
                } else {
                    this.$emit('click', evt)
                }
            }
        }
    };
</script>
