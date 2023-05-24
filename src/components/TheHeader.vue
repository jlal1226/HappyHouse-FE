<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand :to="{ name: 'home' }">VaBang</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">실거래</b-nav-item>
          <b-nav-item href="#">매물</b-nav-item>
          <b-nav-item :to="{ name: 'board' }"> 게시판 </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'deal' }">실거래</b-nav-item>
            <b-nav-item href="#">매물</b-nav-item>
            <b-nav-item :to="{ name: 'interest' }"> 관심물건 </b-nav-item>
            <b-nav-item :to="{ name: 'board' }"> 게시판 </b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown left v-if="userInfo">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              {{ userInfo.userId }}님 환영합니다!
            </template>
            <b-dropdown-item href="#">마이페이지</b-dropdown-item>
            <b-dropdown-item
              class="align-self-center link"
              @click.prevent="onClickLogout"
              >로그아웃</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <!-- before login -->
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-icon icon="people" font-scale="2"></b-icon>
              </template>
              <b-dropdown-item href="#">
                <router-link :to="{ name: 'join' }" class="link">
                  <b-icon icon="person-circle"></b-icon> 회원가입
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link :to="{ name: 'login' }" class="link">
                  <b-icon icon="key"></b-icon> 로그인
                </router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.userid);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>
