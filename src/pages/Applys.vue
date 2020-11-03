<template>
  <div class="container">
    <mc-top-bar title="苏州园区智慧法律援助平台"></mc-top-bar>

    <div class="container-box">
      <div class="userinfo-card">
        <div class="userinfo">
          <van-image
            class="userinfo-avatar"
            round
            :src="userInfor.imgUrl"
          />
          <span class="userinfo-nickname">{{userInfor.nickname}}</span>
        </div>
      </div>

      <div class="button-list-item" @click="navToApplication">
        <div class="button-list-item-icon">
          <van-icon
            class="item-icon"
            name="column"
            size="0.5rem"
            color="#e4c561"
          />
        </div>
        <div class="button-list-item-text">
          <div class="button-list-item-text-main">网上预申请</div>
          <div class="button-list-item-text-sub">Online Application</div>
        </div>
        <div class="button-list-item-desc">援助预申请入口</div>
      </div>

      <div class="button-list-item" @click="navToApplicationRecord">
        <div class="button-list-item-icon">
          <van-icon
            class="item-icon"
            name="column"
            size="0.5rem"
            color="#e4c561"
          />
        </div>
        <div class="button-list-item-text">
          <div class="button-list-item-text-main">申请记录</div>
          <div class="button-list-item-text-sub">Application Records</div>
        </div>
        <div class="button-list-item-desc">申请历史记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
 getInfos,
} from "@/api/legalaid/legalaid";
export default {
  name: "Applys",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      applicationId:'',
      userInfor:{
          imgUrl:'https://img.yzcdn.cn/vant/cat.jpeg',
          nickname:'钱钱某',
      },
    };
  },
  created() {
    //    getInfos().then((res) => {
    //        debugger
    //    });
      //获取用户信息
      //得到本系统信息
    //   this.applicationId ="1323532514526105600";
      console.log('获取到用户的信息 token',localStorage.getItem('token'));
      let token = localStorage.getItem('token')
      this.init(token)//根据token 获取用户个人信息
    //    this.applicationId = localStorage.getItem('applicationId')
      console.log('获取到用户的信息',this.applicationId);
  },
  methods: {
      init(token){
            //赋值给头像 单点登录
            // this.userInfor
      },
    //网上申请
    navToApplication() {
      this.$router.push({ name: 'Home',params:{applicationId:this.applicationId} });
      console.log('applicationId',this.applicationId);
    },
    //记录
    navToApplicationRecord() {
      this.$router.push({ name: 'ListInfo',params:{applicationId:this.applicationId} });
      console.log('applicationId',this.applicationId);
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
    .userinfo-card {
      margin: 0.25rem 0.25rem 0.5rem;
      height: 2rem;
      border: 1px solid #f0f0f0;
      border-radius: 10rpx;
      box-shadow: 0 4px 8px 0 rgba(71, 168, 108, 0.2),
        0 6px 20px 0 rgba(71, 168, 108, 0.2);
      .userinfo {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 0 0 0;
        margin: 0;
        .userinfo-avatar {
          width: 0.6rem;
          height: 0.6rem;
          margin: 0.2rem auto 0.1rem;
          border-radius: 50%;
        }
        .userinfo-nickname {
          color: #aaa;
          margin: 0.1rem auto;
          font-size: 0.15rem;
        }
      }
    }
    .button-list-item {
      // margin: 20rpx 40rpx;
      margin: 0.25rem 0.25rem 0.2rem;
      height: 0.6rem;
      border: 1px solid #f0f0f0;
      border-radius: 0.05rem;
      box-shadow: 0 4px 8px 0 rgba(126, 126, 126, 0.2),
        0 3px 10px 0 rgba(126, 126, 126, 0.2);
      display: flex;
      flex-direction: row;
      //
      .item-icon {
        padding-left: 0.03rem;
      }
      .button-list-item-text {
        padding: 0.1rem 0.2rem 0.1rem 0.4rem;
      }
      .button-list-item-text-main {
        margin: auto auto;
        color: #b4b4b4;
        font-size: 0.18rem;
        font-weight: bold;
      }
      .button-list-item-text-sub {
        margin: auto auto;
        color: #e4e4e4;
        font-size: 0.05rem;
        font-weight: bold;
      }
      .button-list-item-desc {
        margin: auto auto;
        color: #e4e4e4;
        font-size: 0.1rem;
      }
    }
  }
  .custom-title {
    font-size: 16px;
  }
}
</style>
