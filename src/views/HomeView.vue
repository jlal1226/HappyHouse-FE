<template>
  <div>
    <home-search></home-search>
    <div class="container">
      <br /><br /><br />
      <div>
        <h1>오늘의 추천 매물</h1>
      </div>
      <br /><br />
      <b-card-group deck>
        <b-card
          :title="title1.gugun + ` ` + title1.dong"
          :img-src="require('@/assets/img/home1.jpg')"
          img-alt="Image"
          img-top
          img-height="200"
          img-width="200"
          class="card"
          @click="onClickHouseSale(title1.dong)"
        >
          <br />
          <b-card-text>면적 : 38평</b-card-text>
          <b-card-text>매매가 : 22억</b-card-text>
          <b-card-text>건축년도 : 2004년</b-card-text>
        </b-card>

        <b-card
          :title="title2.gugun + ` ` + title2.dong"
          :img-src="require('@/assets/img/home2.jpg')"
          img-alt="Image"
          img-top
          img-height="200"
          img-width="200"
          class="card"
          @click="onClickHouseSale(title2.dong)"
        >
          <br />
          <b-card-text>면적 : 42평</b-card-text>
          <b-card-text>매매가 : 30억</b-card-text>
          <b-card-text>건축년도 : 2002년</b-card-text>
        </b-card>

        <b-card
          :title="title3.gugun + ` ` + title3.dong"
          :img-src="require('@/assets/img/home3.jpg')"
          img-alt="Image"
          img-top
          img-height="200"
          img-width="200"
          class="card"
          @click="onClickHouseSale(title3.dong)"
        >
          <br />
          <b-card-text>면적 : 32평</b-card-text>
          <b-card-text>매매가 : 25억</b-card-text>
          <b-card-text>건축년도 : 2006년</b-card-text>
        </b-card>
      </b-card-group>
      <br />
      <br />
      <br />
    </div>
    <the-footer-vue></the-footer-vue>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeSearch from "@/components/home/HomeSearch.vue";
import TheFooterVue from "@/components/TheFooter.vue";

const dealStore = "dealStore";

export default {
  components: {
    HomeSearch,
    TheFooterVue,
  },
  data() {
    return {
      title1: {
        gugun: "동대문구",
        dong: "회기동",
      },
      title2: {
        gugun: "송파구",
        dong: "문정동",
      },
      title3: {
        gugun: "관악구",
        dong: "봉천동",
      },
    };
  },
  methods: {
    ...mapActions(dealStore, ["search"]),

    onClickHouseSale(keyword) {
      console.log(keyword);
      this.search({ sidoName: "", gugunName: "", dongName: keyword, keyword: ""})
      this.$router.push("/deal");
    },
  },
};
</script>

<style scoped>
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>
