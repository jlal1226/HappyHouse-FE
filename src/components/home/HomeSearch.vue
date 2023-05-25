<template>
  <div class="search">
    <div class="container d-flex justify-content-center mt-5" style="padding-top: 300px;">
      <b-form-group>
        <b-input-group>
          <b-form-input list="searchedResults" placeholder="지역명을 입력해주세요" style="width: 600px;" v-model="keyword" autocomplete="on"></b-form-input>
          <datalist id = "searchedResults">
            <option v-for="(result, index) in searched" :key ="index"> {{ result.apartmentName }} </option>
          </datalist>
          <b-input-group-append>
            <b-button variant="outline-success" @click="searchdeal">검색</b-button>
          </b-input-group-append>
        </b-input-group>
        
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const dealStore = "dealStore";

export default {
  name: 'HomeSearch',
  data() {
    return {
      keyword : "" 
    }
  },
  computed: {
    ...mapState(dealStore, ["searched"]),
  },
  watch: {
    'keyword' : 'autocomplete' 
  },
  methods: {
    ...mapActions(dealStore, ["search"]),
    autocomplete() {
      this.search({ sidoName: "", gugunName: "", dongName: "", keyword: this.keyword });
    },
    searchdeal() {
      this.$router.push("/deal");
    }
  }

};
</script>

<style scoped>
.search {
  background-image: url("@/assets/img/main1.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}

.title {
  padding-top: 100px;
  font-size: 8rem;
}
</style>
