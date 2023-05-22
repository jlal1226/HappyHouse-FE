<template>
    <div>
        <b-sidebar id="sidebar" :title="aptName" v-model="modalOn" right shadow>
           <search-table :aptCode="aptCode"></search-table> 
        </b-sidebar>
    </div>
</template>

<script>
import SearchTable from "./SearchTable.vue";
import Constant from "@/util/Constant";

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
        aptName() {
            return this.$store.state.aptName;
        },
        aptCode() {
            return this.$store.state.aptCode;
        }
    },
    watch: {
        'aptCode' : 'init'
    },
    methods: {
        init() {
            this.modalOn = true;
            this.$store.dispatch(Constant.GET_DEALLIST, this.aptCode);
        },
    }
}
</script>

<style>
#sidebar-right{
    height : 100%;

}
</style>