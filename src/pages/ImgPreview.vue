<!-- Add "scoped" attribute to limit less to this component only -->
<style lang="less" scoped>
</style>

<template>
  <div class="container">
    <mc-top-bar title="苏州园区智慧法律援助平台"></mc-top-bar>
    <div class="page_wrap">
      <div class="space">
        <van-image
          width="100"
          height="100"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </div>
    <div class="page_wrap">
      <div class="space">
        <mc-btn :block="true" @click="test"> 显示图片 </mc-btn>
      </div>
    </div>
  </div>
</template>

<script>
import MC from "../mc/index";

let imgList = [
  require("../assets/img/1.jpg"),
  require("../assets/img/2.jpg"),
  require("../assets/img/3.jpg"),
];

export default {
  name: "ImgPreview",
  components: {},
  data() {
    return {
      imgList,
    };
  },
  methods: {
    test() {
      MC.ImgPreview({ imgList: this.imgList });
    },
  },
};
</script>


