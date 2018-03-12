<template>
  <div>
    <v-flex xs12 class="employee__form">
      <v-text-field
        name="max-offer"
        label="Enter maximum salary offer in €"
        id="max-offer"
        :placeholder="(maxOffer && +maxOffer > 0) ? maxOffer.toString() : '0'"
        v-model="offer"
        :rules="[rules.required, rules.number, rules.underpay]" />
      <v-icon v-if="offerPlacedAndValid" class="employee__icon" color="green">check</v-icon>
    </v-flex>
    <v-btn block @click.native="submitOffer" color="primary">Place employer max offer&nbsp;<v-icon>check</v-icon></v-btn>
  </div>
</template>

<script>

export default {
  name: 'employer',
  data() {
    return {
      offer: null,
      rules: {
        required: (value) => !!value || 'Required.',
        number: (value) => {
          let val = +value;
          return (val && val > 0) || 'Offer is not a number.'
        },
        underpay: (value) => {
          let val = +value;
          return (val && val > 50000) || 'Do you really want to underpay your employee?'
        }
      }
    }
  },
  computed: {
    maxOffer(){
      return this.$store.getters['negotiation/getMaxOffer'];
    },
    offerPlacedAndValid(){
      return typeof this.rules.required(this.offer) !== 'string'
              && typeof this.rules.number(this.offer) !== 'string'
              && this.maxOffer && this.maxOffer > 0
    }
  },
  methods: {
    submitOffer(){
      /* set maxOffer */
      this.$store.dispatch('negotiation/setMaxOffer', { value: (this.offer) ? +this.offer : 0 })
    }
  }
}
</script>


<style lang="stylus">
  .employee
    &__form
      position relative
    &__icon
      position absolute
      right .5em
      top 1.4em
      color green

</style>
