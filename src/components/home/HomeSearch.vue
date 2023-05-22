<template>
  <div class="search">
    <h1 class="title">봐방방봐오바와봐</h1>
    <div class="container d-flex justify-content-center mt-5" style="padding-top: 300px;">
      <b-form-group>
        <b-input-group>
          <b-form-input type="text" placeholder="지역명을 입력해주세요" style="width: 600px;"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-success">검색</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch',
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
