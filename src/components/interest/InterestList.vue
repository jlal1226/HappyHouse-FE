<template>
    <div>
        <div style="font-size:64px"> 관심 물건 리스트</div>
        <b-container style="padding : 30px">
            <b-row align-v="stretch">
            <b-col cols="6">
                <b-table
                    id = "interestsList" 
                    :items="interestList" 
                    selectable
                    select-mode="single"
                    @row-selected = "selectApt"
                    ref="interestsList"
                    :fields="fields"    
                    sticky-header = "600px"
                    :key = "componentKey"
                >
                    <template #cell(selected)="{ rowSelected }">
                        <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                        </template>
                        <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                        </template>
                    </template>
                </b-table>
            </b-col>
            <b-col cols="6">
                <search-table :aptCode="aptCode" id="aside" imgSize="300px"> </search-table>
            </b-col>
        </b-row>
        </b-container>
    </div>
</template>

<script>
import SearchTable from "../map/SearchTable.vue";
import { mapState, mapActions } from 'vuex';

const dealStore = "dealStore";
const memberStore = "memberStore";
const interestStore = "interestStore";

export default {
    components : {
        SearchTable
    },
    data(){
        return {
            fields : [
                {
                    key: 'aptName',
                    label : '아파트 명'
                },
                {
                    key: 'avgDealAmount',
                    label : '평균 거래가'
                },
                {
                    key: 'address',
                    label : '주소'
                },
                {
                    key: 'avgArea',
                    label : '평균 면적'
                }
            ],
            selected: [],
            aptCode : String,
            componentKey : 0
        }
    },
    created() {
        this.aptCode = "";
        this.getStatList(this.userInfo);
        this.resetDealList();
    },
    computed :{
        ...mapState(interestStore, ["interestList"]),
        ...mapState(memberStore, ["userInfo"])
    },
    watch : {
        interestList : function (){
            this.componentKey += 1;
            console.log(this.componentKey);
        }
    },
    methods : {
        ...mapActions(interestStore, ["getStatList", "getInterestDTOList"]),
        ...mapActions(dealStore, ["getList", "resetDealList"]),
        ...mapActions(memberStore, ["checkUserInfo", "checkToken", "getUserInfo"]),
        selectApt(items){
            if (items.length > 0) {
                this.selected = items;
                this.aptCode = this.selected[0].aptCode;
                this.getList(this.aptCode);
            }
            else this.aptCode = "";
        },
        rerender(){
            this.componentKey += 1;
        }
    }
}
</script>

<style>
#interestsList {
    overflow: auto;
}

#aside{
    max-height : 600px;
    overflow : auto;
}

</style>