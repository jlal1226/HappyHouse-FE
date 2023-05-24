<template>
    <div id="searchbar">
            <b-form inline @submit.prevent @keypress="() =>keyevent(this)">
                <b-input-group>
                    <b-form-input class="input_field" placeholder="키워드" v-model="keyword" id="keyword"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="outline-success" @click="searchKeyword" style="height:27px">검색</b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-form-select :options="sidos" placeholder="시/도명" list="sidoname" v-model="sido" @change="getGugunList" autocomplete="on" id="sido"></b-form-select>
                <b-form-select :options="guguns" placeholder="구/군명" list="gugunname" v-model="gugun" @change="getDongList" id ="gugun"></b-form-select>
                <b-form-select :options="dongs" placeholder="동명" list="dongname" v-model="dong" id="dong"></b-form-select>
            </b-form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const dealStore = "dealStore";

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
        this.sido = "";
        this.gugun = "";
        this.dong = "";
        this.keyword = "";
        this.getSidos();
    },
    computed : {
        ...mapState(dealStore, ["regions"])
    },
    methods : {
        ...mapActions(dealStore, ["getRegionInfos", "search"]),
        getSidos() {
            this.getRegionInfos();
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
                let tmp = this.regions.filter(region => region.sidoName.includes(this.sido));
                tmp.forEach((elem) => {
                    if (!this.guguns.includes(elem.gugunName)) this.guguns.push(elem.gugunName);
                });
            }
        },
        getDongList(){
            this.dong = "";
            if (this.gugun === "") this.dongs = [];
            else {
                this.dongs= [];
                let tmp = this.regions.filter(region => (region.sidoName.includes(this.sido) && (region.gugunName.includes(this.gugun))));
                tmp.forEach((elem) => {
                    if (!this.dongs.includes(elem.dongName)) this.dongs.push(elem.dongName);
                });
            }
        },
        searchKeyword(){
            this.search({ sidoName: this.sido, gugunName: this.gugun, dongName: this.dong, keyword : this.keyword});
        },
        keyevent() {
            let keycode = event.keyCode;
            if (keycode === 13) this.search();
        },
        resetForm(){
            this.sido = "";
            this.gugun= "";
            this.dong= "";
            this.keyword= "";
        }
    }
}
</script>

<style scoped>

#searchbar{
    position: absolute;
    background-color: white;
    top : 20px;
    left : 20px;
    height : 300px;
    width : 300px;
    border-radius: 0 0 3% 3%;
    opacity : 100%;
    padding: 10px;
}

#keyword{
    height : 27px;
    width : 80%;
    font-size : 13px;
}

</style>