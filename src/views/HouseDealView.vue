<template>
    <div>
        <search-bar></search-bar>
        <kakao-map></kakao-map>
    </div>
</template>

<script>
import SearchBar from '@/components/map/SearchBar.vue'
import KakaoMap from '@/components/map/KakaoMap.vue'

export default {
name: "HouseDealView",
    components: {
        SearchBar,
        KakaoMap
    }
}
</script>

<style>

</style>