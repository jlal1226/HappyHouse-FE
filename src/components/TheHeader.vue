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
            <b-nav-item :to="{name : 'deal'}">실거래</b-nav-item>
            <b-nav-item href="#">매물</b-nav-item>
            <b-nav-item :to = "{name : 'interest'}"> 관심물건 </b-nav-item>
            <b-nav-item :to="{ name: 'board' }"> 게시판 </b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown left>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>사용자 ID</em>
            </template>
            <b-dropdown-item href="#">마이페이지</b-dropdown-item>
            <b-dropdown-item href="#">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
