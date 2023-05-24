<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
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
                placeholder="이름 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="아이디:" label-for="userid">
              <div class="d-flex justify-content-center">
                <b-input-group>
                  <b-form-input
                    id="userid"
                    v-model="user.userId"
                    required
                    placeholder="아이디 입력...."
                  ></b-form-input>
                  <b-button
                    type="button"
                    variant="primary"
                    class="m-1"
                    @click="checkId"
                    >중복체크</b-button
                  >
                </b-input-group>
              </div>
              <span :class="[isValidId ? 'validId' : 'invalidId']">{{
                message
              }}</span>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.password"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
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
            <b-form-group>주소</b-form-group>
            <b-button @click="execDaumPostcode()">주소찾기</b-button>
            <b-input type="text" v-model="postcode" placeholder="우편번호" />
            <b-input type="text" v-model="address" placeholder="주소" />
            <b-input
              type="text"
              v-model="detailAddress"
              placeholder="상세주소"
            />
            <br />
            <b-button type="button" variant="success" @click="join"
              >회원가입</b-button
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
  name: "UserJoin",
  data() {
    return {
      user: {
        name: null,
        userId: null,
        password: null,
        address: null,
        phone: null,
        email: null,
      },
      message: "",
      postcode: "",
      address: "",
      extraAddress: "",
      detailAddress: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["isValidId", "isJoin", "isJoinError"]),
  },
  methods: {
    ...mapActions(memberStore, ["idCheck", "userJoin"]),
    async checkId() {
      console.log("아이디 체크 메소드 실행");
      await this.idCheck(this.user.userId);
      console.log("사용가능? : " + this.isValidId);
      if (this.isValidId == true) {
        this.message = "사용할 수 있는 아이디 입니다.";
      } else if (this.isValidId == false) {
        this.message = "사용할 수 없는 아이디 입니다.";
      }
    },
    async join() {
      this.user.address = this.address + " " + this.detailAddress;
      await this.userJoin(this.user);

      if (this.isJoin) {
        alert("환영합니다");
        this.$router.push({name: "login"});
      }

      if (this.isJoinError) {
        alert("회원가입 error");
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

<style>
.validId {
  color: green;
}

.invalidId {
  color: red;
}
</style>
