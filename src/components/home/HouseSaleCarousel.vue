<template>
  <div style="margin-top: 100px">
    <b-carousel
      :per-page="3"
      :total-rows="Math.ceil(cards.length / 3)"
      controls
      indicators
    >
      <b-carousel-slide v-for="(group, index) in cardGroups" :key="index">
        <div class="row">
          <div class="col" v-for="(card, i) in group" :key="i">
            <b-card>
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.content }}</p>
              <b-card-text>sdfsdfsdf</b-card-text>
            </b-card>
          </div>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'HouseSaleCarousel',
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cardGroups: [],
    };
  },
  created() {
    this.splitIntoGroups();
  },
  methods: {
    splitIntoGroups() {
      const groupSize = 3;
      for (let i = 0; i < this.cards.length; i += groupSize) {
        this.cardGroups.push(this.cards.slice(i, i + groupSize));
      }
    },
  },
};
</script>
