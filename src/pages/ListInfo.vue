<template>
  <div class="container">
    <mc-top-bar title="苏州园区智慧法律援助平台"></mc-top-bar>

    <div class="container-box">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.id" :title="item.caseDescription" is-link :id="item.applicationId"  @click="navToApplicationRecord" >
          <template #title>
            <span class="custom-title">{{item.caseDescription}}</span>
            <div>
              <van-tag  v-if="item.status==1" type="primary" round>待审查 </van-tag>
               <van-tag  v-if="item.status==0" type="primary" round>草稿 </van-tag>
            </div>
            <!-- <div>
              <van-col>2020-10-29 14:35:26</van-col>
            </div> -->
          </template>
        </van-cell>
      </van-list>
    </div>

  </div>
</template>

<script>
import {
  getDataInfo,geListInfo,
} from "@/api/legalaid/legalaid";
export default {
  name: 'ListInfo',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      applicationId:''
    }
  },
   created() {
    console.log("传参", this.$route.params.applicationId);
    this.applicationId = this.$route.params.applicationId;
    this.init();
  },
  methods: {
      init(){
           geListInfo().then((res) => {
               if(null !=res.content && res.content.length>0){
                this.list = res.content
               }
               debugger
               console.log(this.list);
        });

      },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 10) {
    //       this.finished = true
    //     }
    //   }, 1000)
    },
    //行列表
    navToApplicationRecord(event){
        console.log(event.currentTarget.id);
        debugger
        // applicationId- 案件信息
        this.$router.push({ name: 'Home',params:{applicationId:event.currentTarget.id} });
         debugger

    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #fff;
  .container-box {
    padding-top: 0.5rem;
  }
  .custom-title {
    font-size: 16px;
  }
}
</style>
