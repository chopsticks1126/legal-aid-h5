<style lang="less">
@import '../style/fn';

.container {
  width: 100%;
  height: 100vh;
  background: #fff;
  .container-box {
    padding: -0.1rem 0.15rem 0 0.15rem;
  }
  .van-field__control {
    border: 1px solid #ccc !important;
  }
  .van-field__label {
    color: #303030 !important;
  }
  .van-cell--required::before {
    position: unset;
  }
  .van-cell-group__title {
    padding: 0.7rem 0.16rem 0.08rem;
  }
  .textarea-min150 textarea {
    min-height: 1.5rem;
  }
  .upload-item2 {
    width: 100%;
    height: 35px;
    margin-bottom: 15px;
  }
}
</style>

<template>
  <div class="container">
    <mc-top-bar title="苏州园区智慧法律援助平台"></mc-top-bar>

    <div
      class="container-box"
      v-if="
        addForm.status != null && (addForm.status == 1 || addForm.status >= 4)
      "
    >
      <van-cell-group title="个人信息" class="group-container">
        <van-cell
          title="区域"
          readonly="true"
          :value="addForm.applicantAreaId"
        />
        <van-cell
          :value="applicantIdTypeStr"
          title="证件类型"
          readonly="true"
        />
        <van-cell
          title="证件号码"
          v-model="addForm.applicantIdNo"
          :readonly="true"
        ></van-cell>
        <van-cell
          title="姓名"
          v-model="addForm.applicantFullName"
          :readonly="true"
        ></van-cell>
        <van-cell
          title="年龄"
          v-model="addForm.applicantAge"
          :readonly="true"
        ></van-cell>
        <van-cell title="性別" :value="applicantSexStr" readonly="true" />

        <van-cell
          title="民族"
          v-model="addForm.applicantNation"
          :readonly="true"
        ></van-cell>
        <van-cell
          title="联系地址"
          v-model="addForm.applicantAddress"
          :readonly="true"
        ></van-cell>
        <van-cell
          title="手机号码"
          v-model="addForm.applicantPhone"
          :readonly="true"
        ></van-cell>
        <van-cell title="已仲裁或起诉">
          <van-switch
            v-model="applicantSuedChecked"
            size="24px"
            :disabled="true"
          />
        </van-cell>
        <van-cell :value="caseTypeStr" title="案件类型" readonly="true" />
        <van-field
          label="案件简介"
          v-model="addForm.caseDescription"
          class="textarea-min150"
          type="textarea"
          placeholder="案件简介"
        />
        <div class="">
          <div class="space">
            <div class="upload-item2 van-cell-text">
              <span style="padding: 12rpx 10rpx"> 证件照片</span>
            </div>
            <div class="upload-item">
              <van-uploader
                v-model="applicantIdCardFileList"
                multiple
                :disabled="true"
                max-count="2"
                :deletable="false"
              />
            </div>
          </div>

          <div class="space">
            <div class="upload-item2 van-cell-text">
              <span style="padding: 12rpx 10rpx">经济困难证明材料</span>
            </div>
            <div class="upload-item">
              <van-uploader
                v-model="applicantEcoProofDoc"
                max-count="10"
                :disabled="true"
                :deletable="false"
              />
            </div>
          </div>
          <div class="space">
            <div class="upload-item2 van-cell-text">
              <span style="padding: 12rpx 10rpx">证据材料</span>
            </div>
            <div class="upload-item">
              <van-uploader
                v-model="applicantOtherProofDoc"
                max-count="10"
                :disabled="true"
                :deletable="false"
              />
            </div>
          </div>
        </div>
        <div style="background: #fff; padding: 0 0.15rem">
          <i style="font-size: 0.12rem"
            >注意:如果有疑问请咨询园区智慧法律援助中心66683798</i
          >
        </div>
      </van-cell-group>
    </div>
    <div class="container-box" v-else>
      <van-cell-group title="个人信息" class="group-container">
        <van-cell title="区域" readonly="true" :value="addForm.applicantAreaId" />
        <van-cell required is-link :value="applicantIdTypeStr" title="证件类型" @click="idTypeShow = true" />
        <van-action-sheet v-model="idTypeShow" :actions="idTypeColumns" @select="idTypeOnChange" />
        <mc-input required label="证件号码" v-model="addForm.applicantIdNo" placeholder="请输入证件号码"></mc-input>
        <mc-input required label="姓名" v-model="addForm.applicantFullName" placeholder="请输入姓名"></mc-input>
        <mc-input required label="年龄" v-model="addForm.applicantAge" placeholder="请输入年龄"></mc-input>
        <van-cell required is-link title="性別" :value="applicantSexStr" @click="modalSexShow = true" />
        <van-action-sheet v-model="modalSexShow" :actions="sexColumns" @select="sexOnChange" />
        <mc-input required label="民族" v-model="addForm.applicantNation" placeholder="请输入民族"></mc-input>
        <mc-input required label="联系地址" v-model="addForm.applicantAddress" placeholder="请输入联系地址"></mc-input>
        <mc-input required label="手机号码" v-model="addForm.applicantPhone" placeholder="请输入手机号码"></mc-input>
        <van-cell required title="已仲裁或起诉">
          <van-switch v-model="applicantSuedCheck" size="24px" @change="onChangeApplicantSued" />
        </van-cell>
        <van-cell required is-link :value="caseTypeStr" title="案件类型" @click="caseTypeShow = true" />
        <van-action-sheet v-model="caseTypeShow" :actions="caseTypeColumns" @select="caseTypeOnChange" />
        <van-field required label="案件简介" v-model="addForm.caseDescription" class="textarea-min150" type="textarea" right-icon="warning-o" placeholder="案件简介" @click-right-icon="onClickCaseDescIcon" />

        <div style="background: #fff; padding: 0 0.15rem">
          <p style="font-size: 0.13rem; padding-bottom: 0.3rem">
            请描述案件发生时间，地点及简介
          </p>
          <i style="font-size: 0.12rem">注意:如果有疑问请咨询园区智慧法律援助中心66683798</i>
        </div>

        <div style="background: #fff">
          <div style="display: flex; padding: 0.15rem 0.15rem">
            <mc-btn style="flex: 1; margin-right: 1rem" type="warning" @click="saveDraftApplicationInfo">
              暂存草稿</mc-btn>
            <mc-btn style="flex: 1" type="success" @click="navToApplicationUpload">下一步</mc-btn>
          </div>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {
  getDataInfo,
  submitFirstApplication,
  getFile,
} from "@/api/legalaid/legalaid";
import { SEX } from "../data/constant";
import f from "../mc/img-preview";
import { Toast } from "vant";
import { Notify } from "vant";
export default {
  name: "Home",
  data() {
    return {
      applicantSuedCheck: false,
      applicantIdTypeStr: "大陆居民身份证",
      applicantSexStr: "男", //性别
      caseTypeStr: "民事案件", //案件类型
      addForm: {
        id: "",
        applicantAreaId: "园区",
        // applicantIdTypeStr: "大陆居民身份证", //证件类型
        applicantIdType: 1, //证件类型
        applicantIdNo: "", //证件号码
        applicantFullName: "", //姓名
        applicantAge: "", //年龄
        // applicantSexStr: "男", //性别
        applicantSex: 1, //性別
        applicantNation: "", //民族
        applicantAddress: "", //聯係地址
        applicantPhone: "", //手机号码
        applicantSued: 0, //是否已仲裁
        // caseTypeStr: "民事案件", //案件类型
        caseType: 0, //案件類型
        caseDescription: "", //案件简介
        // paperstype:'',//证件类型
        // papersnumber:'',//证件号码
        // name:'',//姓名
        // age:'',//年龄
        // sex:'',//性别
        // nation:'',//民族
        // address:'',//地址（不确定是否为联系地址）
        // mobile:'',//手机号码
      },
      applicantOtherProofDoc: [],
      applicantEcoProofDoc: [],
      applicantIdCardFileList: [],
      show: false,
      SEX,
      sex: "",
      name: "",
      emailstatus: "",
      reason: "",
      reason2: "",
      area: "园区",
      sexColumns: [
        { name: "男", value: 1 },
        { name: "女", value: 2 },
      ],
      caseTypeColumns: [
        { name: "民事案件", value: 1 },
        { name: "刑事案件", value: 2 },
        { name: "行政诉讼", value: 3 },
      ],
      idTypeColumns: [
        { name: "大陆居民身份证", value: 1 },
        { name: "军人身份证件", value: 2 },
        { name: "护照", value: 3 },
        { name: "港澳台通行证", value: 4 },
      ],
      startMonth: "2018-03",
      reasonDetail: "",
      modalSexShow: false, //性别
      idTypeShow: false, //身份证
      caseTypeShow: false, //案件类型
      show2: false,
      applicationId: "", //用户id
      applicantSuedChecked: false,
    };
  },
  created() {
    console.log("传参", this.$route.params.applicationId);
    this.applicationId = this.$route.params.applicationId;
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      //   let applicationId = "/1322069861731536896";
      if (null != this.applicationId && "" != this.applicationId) {
        getDataInfo(this.applicationId).then((res) => {
          debugger;
          if (null != res) {
            console.log(res.id);
            if (res.status != null && (res.status == 1 || res.status >= 4)) {
              this.applicantSuedChecked = res.applicantSued == 1 ? true : false;
              this.addForm = res;
              console.log(this.addForm.status);
              // 初始化  回传上传图片信息
              this.getfile(1);
              this.getfile(2);
              this.getfile(3);
            }
          }
        });
      }
    },
    //参数校验
    saveValidation() {
      let flag = true;
      var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (
        null == this.addForm.applicantIdNo &&
        "" == this.addForm.applicantIdNo
      ) {
        Toast("请输入证件号码");
        flag = false;
      } else if (
        this.addForm.applicantIdType === 1 &&
        regIdNo.test(this.addForm.applicantIdNo) === false
      ) {
        Toast("请输入正确的身份证号码");
        flag = false;
      }
      if (
        null == this.addForm.applicantFullName &&
        "" == this.addForm.applicantFullName
      ) {
        Toast("请输入姓名");
        flag = false;
      }
      if (
        null == this.addForm.applicantAge &&
        "" == this.addForm.applicantAge
      ) {
        Toast("请输入年龄");
        flag = false;
      } else if (parseInt(this.addForm.applicantAge) > 200) {
        Toast("请输入正确年龄");
        flag = false;
      }
      if (
        null == this.addForm.applicantAddress &&
        "" == this.addForm.applicantAddress
      ) {
        Toast("请输入联系地址");
        flag = false;
      }
      var regPhone = /(^\d{11}$)/;
      if (
        null == this.addForm.applicantPhone &&
        "" == this.addForm.applicantPhone
      ) {
        Toast("请输入手机号码");
        flag = false;
      } else if (regPhone.test(this.addForm.applicantPhone) === false) {
        Toast("请输入正确的手机号码");
        flag = false;
      }
      console.log(this.addForm.caseDescription);
      if (
        null == this.addForm.caseDescription &&
        "" == this.addForm.caseDescription
      ) {
        Toast("请输入案件简介");
        flag = false;
      }
      return flag;
    },
    //下一步
    navToApplicationUpload() {
      console.log(this.addForm);
      if (this.saveValidation()) {
        submitFirstApplication(this.addForm).then((res) => {
          debugger;
          console.log(res);
          if (null != res) {
            this.applicationId = res.id;
            this.$router.push({
              name: "Upload",
              params: { applicationId: this.applicationId },
            });
          } else {
            Toast("提交失败");
          }
        });
      }
    },
    //暂保存草稿
    saveDraftApplicationInfo() {
      if (this.saveValidation()) {
        submitFirstApplication(this.addForm).then((res) => {
          console.log(res);
          if (null != res) {
            this.applicationId = res.id;
            Toast("提交成功！");
          } else {
            Toast("提交失败！");
          }
        });
      }
    },
    onChangeApplicantSued(e) {
      if (e) {
        this.addForm.applicantSued = 1;
      } else {
        this.addForm.applicantSued = 0;
      }
      debugger;
    },
    //性别选择器
    sexOnChange(item) {
      this.modalSexShow = false;
      this.addForm.applicantSex = item.value;
      this.applicantSexStr = item.name;
    },
    //案件类型
    caseTypeOnChange(item) {
      this.caseTypeShow = false;
      this.addForm.caseType = item.value;
      this.caseTypeStr = item.name;
    },
    //证件类型
    idTypeOnChange(item) {
      this.idTypeShow = false;
      this.applicantIdTypeStr = item.name;
      this.addForm.applicantIdType = item.value;
    },
    //图片回传
    getfile(useType) {
      let _this = this;
      let param = {};
      param.useType = useType;
      param.referenceId = this.applicationId;
      getFile(param).then((res) => {
        let fileList = [];
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
    //问号？ 详情
    onClickCaseDescIcon() {
      Notify({
        message:
          "申请示范：本人于**年**月进入某公司，从事某岗位，月薪**元，劳动合同期限为**年。自**年**月以来，公司一直拖欠工资不发，**月**日，公司单方面发布解除劳动合同通知书，我认为这属于违法解除劳动合同，要求公司支付拖欠的工资，以及违法解除的经济补偿金。我要求劳动仲裁维护自身合法权益，故来申请法律援助。",
        color: "#ffffff",
        background: "#ffae51",
      });
    },
  },
};
</script>

