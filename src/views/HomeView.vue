<template>
  <div>
    <home-search></home-search>
    <house-sale-carousel :cards="cards"></house-sale-carousel>
  </div>
</template>

<script>
import HomeSearch from '@/components/home/HomeSearch.vue';
import HouseSaleCarousel from '@/components/home/HouseSaleCarousel.vue';

export default {
  components: {
    HomeSearch,
    HouseSaleCarousel,
  },
  data() {
    return {
      cards: [
        { id: 1, title: "Card 1", content: "Card 1 Content" },
        { id: 2, title: "Card 2", content: "Card 2 Content" },
        { id: 3, title: "Card 3", content: "Card 3 Content" },
        { id: 4, title: "Card 4", content: "Card 4 Content" },
        { id: 5, title: "Card 5", content: "Card 5 Content" },
        { id: 6, title: "Card 6", content: "Card 6 Content" },
      ],
    };
  },
};
</script>
