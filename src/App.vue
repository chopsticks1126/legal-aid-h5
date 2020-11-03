<style lang="less" scoped>
</style>

<template>

    <div id="app">
        <!--keep alive  根据 meta keepAlive 判断是否需要   -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        mounted(){
        }
    }
</script>
