<template>
    <div>
        <b-sidebar id="sidebar" :title="aptName" v-model="modalOn" right shadow>
           <search-table :aptCode="aptCode"></search-table> 
        </b-sidebar>
    </div>
</template>

<script>
import SearchTable from "./SearchTable.vue";
import { mapActions, mapState } from 'vuex';

const dealStore = "dealStore";

export default {
    components: {
        SearchTable
    },
    data(){
        return {
            modalOn : false,
        }
    },
    computed: {
        ...mapState(dealStore, ["aptName", "aptCode"]),
    },
    watch: {
        'aptCode' : 'init'
    },
    methods: {
        ...mapActions(dealStore, ["getList"]),
        init() {
            this.modalOn = true;
            this.getList(this.aptCode);
        },
    }
}
</script>

<style>
#sidebar-right{
    height : 100%;
}
</style>