<template>
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
</template>

<script>
import { mapActions, mapState } from "vuex";

const dealStore = "dealStore";
const memberStore = "memberStore";
const interestStore = "interestStore";

export default ({
    props: ['aptCode'],
    computed: {
        isInInterests(){
            let cnt = 0;
            this.interests.forEach(elem => {
                if (elem.aptCode === this.aptCode) cnt++;
            });
            return (cnt > 0);
        },
        ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
        ...mapState(dealStore, ["dealList"]),
        ...mapState(interestStore, ["interests"])
    },
    methods : {
        ...mapActions(interestStore, ["insert", "del", "getStatList", "getInterestDTOList"]),
        toggleInterest() {
            let isInInterests = this.isInInterests;
            if (isInInterests) this.del({aptCode : this.aptCode, userInfo : this.userInfo});
            else this.insert({aptCode : this.aptCode, userInfo : this.userInfo}); 
        }
    }
    
})
</script>
