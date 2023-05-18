<template>
    <div id = "searchbar">
        <b-card style="max-width: 20rem;">
            <b-button-group>
                <b-button size = "lg" variant="primary" @click="disableKeywordSearch">동 검색</b-button>
                <b-button size = "lg" variant="primary" @click="enableKeywordSearch">키워드 검색</b-button>
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
                <b-form-input v-moduel="keyword" placeholder="키워드 검색"> </b-form-input>
            </b-form>
        </b-card>
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
        }
    }
}
</script>

<style scoped>
#searchBar{
    position: absolute;
    top : 50rem;
    

}
</style>