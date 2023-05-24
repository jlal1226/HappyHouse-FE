<template>
  <div class="search">
    <h1 class="title">봐방방봐오바와봐</h1>
    <div class="container d-flex justify-content-center mt-5" style="padding-top: 300px;">
      <b-form-group>
        <b-input-group>
          <b-form-input list="searchedResults" placeholder="지역명을 입력해주세요" style="width: 600px;" v-model="keyword" autocomplete="on"></b-form-input>
          <datalist id = "searchedResults">
            <option v-for="(result, index) in searched" :key ="index"> {{ result.apartmentName }} </option>
          </datalist>
          <b-input-group-append>
            <b-button variant="outline-success" @click="search">검색</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const dealStore = "dealStore";

export default {
  name: 'HomeSearch',
  data() {
    return {
      keyword : "" 
    }
  },
  computed: {
    searched() {
      return this.$store.state.searched;
    }
  },
  watch: {
    'keyword' : 'autocomplete' 
  },
  methods: {
    ...mapActions(dealStore, ["search"]),
    autocomplete() {
      this.search({ sidoName: "", gugunName: "", dongName: "", keyword: this.keyword });
    },
    search() {
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
