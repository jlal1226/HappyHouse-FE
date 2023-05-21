<template>
    <div>
        <b-sidebar id="sidebar" :title="aptName" v-model="modalOn" right shadow>
            <div class="px-3 py-2">
                <div> 
                    <b-icon-heart-fill v-if="isInInterests" @click="toggleInterest"></b-icon-heart-fill>
                    <b-icon-heart v-else @click="toggleInterest"></b-icon-heart>
                </div>
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
        aptName()  {
            return this.$store.state.aptName;
        },
        dealList() {
            return this.$store.state.dealList;
        },
        interests() {
            return this.$store.state.interests;
        },
        isInInterests(){
            let cnt = 0;
            console.log("interest", this.interests);
            this.interests.forEach(elem => {
                console.log(elem.aptCode, this.aptCode);
                if (elem.aptCode === this.aptCode) cnt++;
            });
            return (cnt > 0);
        }
    },
    watch : {
        'aptCode' : 'init'
    },
    methods : {
        init() {
            this.modalOn = true; 
            this.$store.dispatch(Constant.SET_SIDEBAR, this.aptCode);
        },
        toggleInterest(){
            let isInInterests = this.isInInterests;
            if (isInInterests) this.$store.dispatch(Constant.DELETE_INTEREST, this.aptCode);
            else this.$store.dispatch(Constant.INSERT_INTEREST, this.aptCode); 
        }
    }
    
}
</script>

<style>
#sidebar-right{
    height : 100%;

}
</style>