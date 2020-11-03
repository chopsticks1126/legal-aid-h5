<template>
    <div>

        <div class="mc-cell" :class="[access?'mc-cell-access':'',border?'mc-cell-border-'+border:'']" @click="chooseDate">
            <div class="mc-cell-hd">
                <slot name="hd">
                    {{label}}
                </slot>
            </div>
            <div class="mc-cell-bd">

                <template v-if="model">{{model}}</template>
                <span v-else class="placeholder-color">
                    {{placeholder}}
                </span>
            </div>
            <div class="mc-cell-ft">
                <slot name="ft"></slot>
            </div>
        </div>

        <mt-datetime-picker :class="[range==='month'?'month-pick-time':'']" ref="picker"
                            v-model="mydate"
                            :startDate="startDate"
                            type="date"
                            @confirm="handleConfirm">
        </mt-datetime-picker>

    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'McDateSelect',
        props: {
            value: {},
            label: {
                type: String,
                default: '选择日期'
            },
            access: {
                type: Boolean,
                default: true
            },
            range: {
                type: String,
                default: 'day'
            },
            placeholder: {
                default: '请选择'
            },
            border:{
                type:String,
                default:'bottom'
            },
            startDate:{
                type:Date ,
                defalut:new Date('2019-01-01'),
            }
        },
        computed: {
            model: {
                get(){
                    return this.value
                },
                set(v){
                    this.$emit('input', v)
                }
            }
        },
        data(){
            return {
                mydate: ''
            }
        },
        methods: {
            chooseDate(){
                if (this.model) {
                    if(this.range==='day'){
                        this.$refs.picker.setSlotsByValues(this.model.split('-'))
                    }else{
                        this.$refs.picker.setSlotsByValues(this.model.split('-').concat(['1']))
                    }
                }
                this.$refs.picker.open();
            },
            //确认
            handleConfirm(date){
                if (this.range === 'day') {
                    let v = Util.timeFormate.formate(date, 'day', '-')
                    this.model = v
                } else {
                    //month
                    this.model = this.getDate(date)
                }
            },
            //选择年月
            getDate(now) {
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                return year + "-" + month;
            },
        },
    }
</script>
<style lang="less">

    .month-pick-time {
        .picker-items {
            .picker-slot-center:nth-child(3) {
                flex: 0 0 0% !important;
            }
        }
    }

    .placeholder-color{
        color: #aaa;
    }

</style>
