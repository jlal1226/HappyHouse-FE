<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-alert variant="secondary" show><h3>회원 정보 수정</h3></b-alert>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="user.name"
                required
                :placeholder="userInfo.name"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="아이디:" label-for="userid">
              <div class="d-flex justify-content-center">
                <b-input-group>
                  <b-form-input
                    id="userid"
                    v-model="userInfo.userId"
                    required
                  ></b-form-input>
                </b-input-group>
              </div>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="전화번호:" label-for="phone">
              <b-form-input
                id="phone"
                v-model="user.phone"
                required
                placeholder="전화번호 입력...."
              ></b-form-input>
            </b-form-group>
            <br />
            <b-button type="button" variant="success" @click="modify"
              >수정하기</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
const memberStore = "memberStore";

export default {
  name: "UserModify",
  data() {
    return {
      user: {
        name: null,
        userId: null,
        password: null,
        phone: null,
        address: null,
        email: null,
      },
      message: "",
      postcode: "",
      address: "",
      extraAddress: "",
      detailAddress: "",
    };
  },
  mounted() {
    this.user = { ...this.userInfo };
  },
  computed: {
    ...mapState(memberStore, ["userInfo", "isModified"]),
  },
  methods: {
    ...mapActions(memberStore, ["modifyUser"]),
    async modify() {
      console.log("수정 시도");
      await this.modifyUser(this.user);
      console.log("수정 완료");

      if (this.isModified) {
        this.$swal("회원정보 수정 완료");
        this.$router.push({name: "mypage"});
      } else {
        this.$swal("회원정보 수정 실패");
      }
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          console.log(data);
          if (this.extraAddress !== "") {
            this.extraAddress = "";
          }
          if (data.userSelectedType === "R") {
            this.address = data.roadAddress;
          } else {
            this.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              this.extraAddress += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.extraAddress +=
                this.extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.extraAddress !== "") {
              this.extraAddress = `(${this.extraAddress})`;
            }
          } else {
            this.extraAddress = "";
          }
          // 우편번호를 입력한다.
          this.postcode = data.zonecode;
        },
      }).open();
    },
  },
};
</script>
