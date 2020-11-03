<template>
    <button class="mc-btn" @click="handleClick"
            :disabled="disabled"
            :type="nativeType"
            :class="[
             type?'mc-btn-'+type:'',
             block?'mc-btn-block':'',
             size?'mc-btn-'+size:'',
             {'mc-btn-disabled':disabled,'mc-btn-plain':plain}
          ]"
    >
        <slot></slot>
    </button>
</template>

<script type="text/babel">

    export default {
        name: 'McBtn',
        props: {
            type: {
                type: String,
                default: 'default'
            },
            nativeType: {
                type: String,
                default: 'button'
            },
            size: String,
            plain: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            },
            block: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleClick(evt){
                this.$emit('click', evt)
            }
        }
    };
</script>
