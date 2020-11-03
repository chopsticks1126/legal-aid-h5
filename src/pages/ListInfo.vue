<template>
  <div class="container">
    <mc-top-bar title="苏州园区智慧法律援助平台"></mc-top-bar>

    <div class="container-box">
      <van-list>
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.caseDescription"
          is-link
          :id="item.applicationId"
          @click="navToApplicationRecord"
        >
          <template #title>
            <span class="custom-title">{{ item.caseDescription }}</span>
            <div>
              <van-tag v-if="item.status == 1" type="primary" round
                >待审查
              </van-tag>
              <van-tag v-if="item.status == 0" type="primary" round
                >草稿
              </van-tag>
              <van-tag v-if="item.status == 0" round>草稿</van-tag>
              <van-tag v-if="item.status==1" type="primary" round
                >待审查</van-tag
              >
              <van-tag v-if="item.status==3" type="warning" round
                >审查退回</van-tag
              >
              <van-tag v-if="item.status==4" type="danger" round
                >审查不通过</van-tag
              >
              <!-- <van-tag v-if="item.status==5 && !isLawer" type="success" round>已立案</van-tag>
        <van-tag v-if="item.status==5 && isLawer && item.caseStatus==5 " type="warning" round>已立案, 待接收</van-tag>
        <van-tag v-if="item.status==5 && isLawer && item.caseStatus!=5 " type="success" round>已立案</van-tag> -->
              <van-tag v-if="item.status == 6" mark>已结案</van-tag>
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
import { getDataInfo, geListInfo } from "@/api/legalaid/legalaid";
export default {
  name: "ListInfo",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      applicationId: "",
    };
  },
  created() {
    console.log("传参", this.$route.params.applicationId);
    this.applicationId = this.$route.params.applicationId;
    this.init();
  },
  methods: {
    init() {
      geListInfo().then((res) => {
        if (null != res.content && res.content.length > 0) {
          this.list = res.content;
        }
        debugger;
        console.log(this.list);
      });
    },
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
    },
    //行列表
    navToApplicationRecord(event) {
      console.log(event.currentTarget.id);
      debugger;
      // applicationId- 案件信息
      this.$router.push({
        name: "Home",
        params: { applicationId: event.currentTarget.id },
      });
      debugger;
    },
  },
};
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
