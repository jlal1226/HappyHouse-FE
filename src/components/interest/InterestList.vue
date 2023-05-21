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
        <interest-detail aptCode="{aptCode}">
        </interest-detail>
    </div>
</template>

<script>
import Constant from '@/util/Constant';
import InterestDetail from './InterestDetail.vue';

export default {
    components : {
        InterestDetail
    },
    data(){
        return {
            fields : [
                'aptName', 'aptCode', 'avgDealAmount', 'address', 'avgarea'
            ],
            selected : [] 
        }
    },
    created(){
        this.$store.dispatch(Constant.GET_INTEREST_LIST);
    },
    computed :{
        interestList() {
            return this.$store.state.interestList;
        },
        aptCode() {
            if (this.selected.length > 0) {
                return this.selected[0].aptCode;
            }
            return null;
        }

    },
    methods : {
        selectApt(items){
            if (items.length > 0) {
                this.selected = items; 
                //this.$store.dispatch(Constant.SELECT_INTEREST_DETAIL, this.aptCode);
            }
        }
    }

}
</script>

<style>
#interestsList {
    max-width: 50%;



}

</style>