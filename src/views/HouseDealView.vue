<template>
    <div id="housedealview">
        <kakao-map></kakao-map>
        <search-bar></search-bar>
        <search-side-bar></search-side-bar>
    </div>
</template>

<script>
import SearchBar from '@/components/map/SearchBar.vue'
import KakaoMap from '@/components/map/KakaoMap.vue'
import SearchSideBar from '@/components/map/SearchSideBar.vue'

export default {
name: "HouseDealView",
    components: {
        SearchBar,
        KakaoMap,
        SearchSideBar
    }
}
</script>

<style>
#housedealview{
    position : relative;
}
</style>