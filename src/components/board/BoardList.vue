<template>
    <div>
    <b-table hover :items="items" :fields="fields"> 
    </b-table>
    <button @click="moveleft"> (왼쪽) </button>
        <span v-for="index in totalpg" :key ="index">
            {{ index }}
        </span>
    <button @click="moveright"> (오른쪽) </button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            pg : Number,
            totalpg : Number,
            spp : Number,
            key: String,
            items : [],
            fields : [
                { key: "articleno", label: "글번호", tdClass: "tdClass" },
                { key: "subject", label: "제목", tdClass: "tdSubject" },
                { key: "userid", label: "작성자", tdClass: "tdClass" },
                { key: "regtime", label: "작성일", tdClass: "tdClass" },
                { key: "hit", label: "조회수", tdClass: "tdClass" },
            ]
        };
    },
    created() {
        this.pg = 1;
        this.totalpg = 10;
        this.spp = 20;
        this.items = [...this.items, 
            {
                articleno : 1,
                title : "sample",
                userid : "김샘플",
                hit : 0,
                regtime : "0000-00-00",
                content : "안녕하세요"
            },
            {
                articleno : 2,
                title : "sample2",
                userid : "박샘플",
                hit : 0,
                regtime : "0000-00-00",
                content : "하이"
            }
        ]
    },
    methods : {
        moveleft() {},
        moveright() {}
    }
}
</script>

<style>

</style>