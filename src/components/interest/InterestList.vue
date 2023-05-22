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
import Constant from "@/util/Constant";

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
        this.$store.dispatch(Constant.REMOVE_DEALLIST);
    },
    computed :{
        interestList() {
            return this.$store.state.interestList;
        },
    },
    methods : {
        selectApt(items){
            if (items.length > 0) {
                this.selected = items;
                this.aptCode = this.selected[0].aptCode;
                this.$store.dispatch(Constant.GET_DEALLIST, this.aptCode);
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