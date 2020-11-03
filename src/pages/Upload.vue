<style lang="less" scoped>
.upload-item {
  width: 100%;
  height: 100%;
}
.upload-item2 {
  width: 100%;
  height: 0.4rem;
  margin-bottom: 0.1rem;
}
.van-cell-text {
  padding: 0.1rem 0.1rem;
  color: #969696;
  font-size: 0.15rem;
  background: #efeff0;
}
.star {
  color: red;
}
@import "../style/fn";
.container {
  width: 100%;
  height: 100vh;
  background: #fff;
  .container-box {
    padding: -0.1rem 0.15rem 0 0.15rem;
    background: #fff;
  }
}
</style>

<template>
  <div class="container">
    <mc-top-bar title="苏州园区智慧法律援助平台"></mc-top-bar>
    <div class="container-box">
      <div class="page_wrap">
        <div class="space">
          <div class="upload-item2 van-cell-text">
            <span style="padding: 0.1rem 0"
              ><span class="star">*</span> 证件照片</span
            >
          </div>
          <div class="upload-item">
            <van-uploader
              :disabled="isFilesReadonly"
              :deletable="!isFilesReadonly"
              v-model="applicantIdCardFileList"
              multiple
              :after-read="afterReadIdCard"
              max-count="2"
            />
          </div>
        </div>

        <div class="space">
          <div class="upload-item2 van-cell-text">
            <span style="padding: 0.1rem 0">经济困难证明材料</span>
          </div>
          <div class="upload-item">
            <van-uploader
              :disabled="isFilesReadonly"
              :deletable="!isFilesReadonly"
              v-model="applicantEcoProofDoc"
              :after-read="afterReadEcoProofCard"
              max-count="10"
            />
          </div>
        </div>
        <div class="space">
          <div class="upload-item2 van-cell-text">
            <span style="padding: 0.1rem 0"
              ><span class="star">*</span> 证据材料</span
            >
          </div>
          <div class="upload-item">
            <van-uploader
              :disabled="isFilesReadonly"
              :deletable="!isFilesReadonly"
              v-model="applicantOtherProofDoc"
              :after-read="afterReadOtherProof"
              max-count="10"
            />
          </div>
        </div>
        <div class="space">
          <div style="background: #fff">
            <div style="display: flex; padding: 0.15rem 0.15rem">
              <mc-btn
                style="flex: 1; margin-right: 1rem"
                type="warning"
                @click="navToApplicationInfo"
                >上一步</mc-btn
              >
              <mc-btn
                style="flex: 1"
                type="success"
                @click="submitApplicationFiles"
                >提交申请</mc-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  uploadFile,
  getFile,
  submitApplicationFiles,
  getDataInfo,
} from "@/api/legalaid/legalaid";
import { UploadImg } from "@/api/common";
import testimg from "../assets/img/1.jpg";
import { Toast } from "vant";
import { Notify } from "vant";

export default {
  name: "Upload",
  components: {},
  data() {
    return {
      visible: false,
      visible2: false,
      UploadImg: UploadImg,
      imgUrl: "",
      imgUrl2: testimg,
      applicantOtherProofDoc: [],
      applicantEcoProofDoc: [],
      applicantIdCardFileList: [],
      applicationId: "",
      isFilesReadonly: false,
    };
  },
  computed: {
    imglist() {
      return [this.imgUrl];
    },
    imglist2() {
      return [this.imgUrl2];
    },
  },
  created() {
    console.log("传参", this.$route.params.applicationId);
    this.applicationId = this.$route.params.applicationId;
  },
  methods: {
    init() {
      if (null != this.applicationId && "" != this.applicationId) {
        getDataInfo(this.applicationId).then((res) => {
          debugger;
          if (null != res) {
            console.log(res.id);
            if (res.status >= 1 && res.data != 3) {
              this.isFilesReadonly = true;
            } else {
              this.isFilesReadonly = false;
            }
            // 初始化  回传上传图片信息
            this.getfile(1);
            this.getfile(2);
            this.getfile(3);
          }
        });
      }
    },
    //上传证件
    afterReadIdCard(file) {
      let parameter = {};
      parameter.file = file;
      parameter.useType = 1;
      parameter.fileName = Date.parse(new Date());
      uploadFile(parameter).then((res) => {
        console.log(res);
        this.getfile(1);
      });
    },
    //贫困照片
    afterReadEcoProofCard(file) {
      let parameter = {};
      parameter.file = file;
      parameter.useType = 2;
      parameter.fileName = Date.parse(new Date());
      uploadFile(parameter).then((res) => {
        console.log(res);

        this.getfile(2);
        debugger;
      });
    },
    //证据照片
    afterReadOtherProof(file) {
      let parameter = {};
      parameter.file = file;
      parameter.useType = 3;
      parameter.fileName = Date.parse(new Date());
      uploadFile(parameter).then((res) => {
        console.log(res);
        this.getfile(3);
        debugger;
      });
      console.log(file);
    },
    //图片回传
    getfile(useType) {
      let _this = this;
      let param = {};
      param.useType = useType;
      param.referenceId = this.applicationId; //用户id
      getFile(param).then((res) => {
        let fileList = [];
        debugger;
        if (res && res.length > 0) {
          res.forEach(function (element) {
            element.url = _this.processPreviewFile(element);
            let ele = { id: element.id, url: element.url, name: element.name };
            fileList.push(ele);
          });
        }
        console.log(fileList);
        if (useType == 1) {
          //身份证回传
          _this.applicantIdCardFileList = fileList;
          console.log("身份证回传", fileList);
        } else if (useType == 2) {
          //贫困材料
          _this.applicantEcoProofDoc = fileList;
          console.log("贫困材料", fileList);
        } else if (useType == 3) {
          //证据材料
          _this.applicantOtherProofDoc = fileList;
          console.log("证据材料", fileList);
        }
      });
    },
    //回传url
    processPreviewFile(file) {
      if (file) {
        console.log(
          "http://localhost:8081/file/" + file.type + "/" + file.realName
        );
        return "http://localhost:8081/file/" + file.type + "/" + file.realName;
      }
    },
    //返回上一步
    navToApplicationInfo() {
      if (!this.isFilesReadonly) {
        Toast('保存成功');
      }
      //返回上一步
    // this.$router.push({
    //         name: "Home",
    //         params: { applicationId: this.applicationId },
    //       });
    window.history.go(-1);
    },
    //提交申请
    submitApplicationFiles() {
    //   validation
      if (!this.applicantIdCardFileList || this.applicantIdCardFileList.length<=0) {
          Toast('请上传身份证件')
        return
      }
      if (!this.applicantOtherProofDoc || this.applicantOtherProofDoc.length<=0) {
          Toast('请上传其他证明材料')
        return
      }
      let form = { id: 10001 };
      submitApplicationFiles(form).then((res) => {
           this.$router.push({
            name: "Applys",
            params: { applicationId: this.applicationId },
          });
    //       if (res.statusCode && res.statusCode>=200 && res.statusCode<=299) {
    //         Notify({ type: 'success', message: '提交成功' });
    //         setTimeout(function () {
    //          //提交成功页面
    //           this.$router.push({ path: "/applys" });//
    //         }, 1000);
    //       } else {
    //         Notify({ type: 'danger', message: '提交失败' });
    //       }
    //     }, (err) => {
    //       console.log(err.errMsg)
    //       Notify({ type: 'danger', message: '提交失败' });
      });
    },
  },
};
</script>


