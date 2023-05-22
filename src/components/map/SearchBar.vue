<template>
    <div id = "searchbar">
            <b-button-group>
                <b-button size = "sg" variant="primary" @click="disableKeywordSearch">동 검색</b-button>
                <b-button size = "sg" variant="primary" @click="enableKeywordSearch">키워드 검색</b-button>
            </b-button-group>
            <b-form v-if="`${this.mode}` === 'searchRegion'" inline>
                    <b-form-input list="sidoname" placeholder="시/도명" v-model="sido" @change="getGugunList" autocomplete="on"></b-form-input>
                    <datalist id = "sidoname">
                        <option v-for="sidoopt in sidos" :key ="sidoopt"> {{ sidoopt }}</option>
                    </datalist>
                    <b-form-input list="gugunname" placeholder="구/군명" v-model="gugun" @change="getDongList"></b-form-input>
                    <datalist id = "gugunname">
                        <option v-for="gugunopt in guguns" :key ="gugunopt"> {{ gugunopt }}</option>
                    </datalist>
                    <b-form-input list="dongname" placeholder="동명" v-model="dong"></b-form-input>
                    <datalist id = "dongname">
                        <option v-for="dongopt in dongs" :key ="dongopt"> {{ dongopt }}</option>
                    </datalist>
            </b-form>
            <b-form v-else>
                <b-form-input v-model="keyword" placeholder="키워드 검색"> </b-form-input>
            </b-form>
            <b-button size = "sg" variant="primary" @click="search">검색</b-button>
    </div>
</template>

<script>
import Constant from '@/util/Constant';

export default {
    data(){
        return {
            sidos : [],
            guguns : [],
            dongs : [],
            mode : String,
            sido : String,
            gugun : String,
            dong : String,
            keyword : String
        }
    },
    created(){
        this.mode = "searchRegion";
        this.sido = "";
        this.gugun = "";
        this.dong = "";
        this.keyword = "";
        this.getRegions();
    },
    computed : {
        regions() {
            return this.$store.state.regions;
        }
    },
    methods : {
        disableKeywordSearch() {
            this.mode = "searchRegion";
        },
        enableKeywordSearch() {
            this.mode = "searchKeyword";
        },
        getRegions() {
            this.$store.dispatch(Constant.ALL_REGION);
            this.regions.forEach((element) => {
                if (!this.sidos.includes(element.sidoName)) {
                    this.sidos.push(element.sidoName);
                }
            })
        },
        getGugunList(){
            this.gugun = "";
            if (this.sido === "") this.guguns = [];
            else {
                this.guguns = [];
                let tmp = this.regions.filter(region => region.sidoName === this.sido);
                tmp.forEach((elem) => {
                    if (!this.guguns.includes(elem.gugunName)) this.guguns.push(elem.gugunName);
                });
            }
        },
        getDongList(){
            this.dong = "";
            if (this.gugun === "") this.dongs= [];
            else {
                this.dongs= [];
                let tmp = this.regions.filter(region => (region.sidoName === this.sido && region.gugunName === this.gugun));
                tmp.forEach((elem) => {
                    if (!this.dongs.includes(elem.dongName)) this.dongs.push(elem.dongName);
                });
            }
        },
        search(){
            if (this.mode === "searchRegion"){
                console.log(this.sido);
                this.$store.dispatch(Constant.SEARCH_REGION, {sidoName: this.sido, gugunName: this.gugun, dongName: this.dong});
            }
            else {
                this.$store.dispatch(Constant.SEARCH_KEYWORD, this.keyword);
            }
        }
    }
}
</script>

<style scoped>

#searchbar{
    max-width: 20rem;
    background-color: white;
    top : 5rem;
    left : 5rem;
    height : 15rem;
    width : 20rem;
    opacity: 80%;
    border : 1px black;
}
</style>