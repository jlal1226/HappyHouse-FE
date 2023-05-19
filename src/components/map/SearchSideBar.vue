<template>
    <div>
        <b-sidebar id="sidebar" :title="aptName" v-model="modalOn" right shadow>
            <div class="px-3 py-2">
                <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
                <div> 주소 </div>
                <div> 건축년도 </div>
                <table> 
                    <th>
                        <td>거래년월</td>
                        <td>거래가</td>
                        <td>면적</td>
                        <td>층</td>
                    </th>
                    <tr v-for="(deal, index) in dealList" :key = "index">
                        <td>{{ deal.dealYear }}.{{ deal.dealMonth }}</td>
                        <td>{{ deal.dealAmount}}</td>
                        <td>{{ deal.area }}</td>
                        <td>{{ deal.floor }}</td>
                    </tr>
                </table>
            </div>
        </b-sidebar>
    </div>
</template>

<script>
import Constant from '@/util/Constant';

export default {
    data(){
        return {
            modalOn : false,
        }
    },
    computed : {
        aptCode() {
            return this.$store.state.aptCode;
        },
        aptName() {
            console.log(this.$store.state.aptName);
            return this.$store.state.aptName;
        },
        dealList() {
            return this.$store.state.dealList;
        }
    },
    watch : {
        'aptCode' : 'init'
    },
    methods : {
        init() {
            this.modalOn = true; 
            this.$store.dispatch(Constant.SET_SIDEBAR, this.aptCode);
        }
    }
    
}
</script>

<style>
#sidebar-right{
    height : 100%;

}
</style>