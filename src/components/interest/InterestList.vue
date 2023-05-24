<template>
    <div>
        <b-table
            id = "interestsList" 
            :items="interestList" 
            selectable
            select-mode="single"
            @row-selected = "selectApt"
            ref="interestsList"
            :fields="fields"    
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
        <search-table :aptCode="aptCode"> </search-table>
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
            aptCode : String
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
    methods : {
        ...mapActions(interestStore, ["getStatList", "getInterestDTOList"]),
        ...mapActions(dealStore, ["getList", "resetDealList"]),
        selectApt(items){
            if (items.length > 0) {
                this.selected = items;
                this.aptCode = this.selected[0].aptCode;
                this.getList(this.aptCode);
            }
            else this.aptCode = "";
        }
    }

}
</script>

<style>
#interestsList {
    max-width: 50%;
}
search-table {
    right : 0;


}

</style>