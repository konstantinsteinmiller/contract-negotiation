<template>
  <div>
    <v-flex xs12 class="employer__form">
      <v-text-field
        name="min-expected-salary"
        label="Minimum expected salary offer in €"
        :placeholder="(minExpectation && minExpectation > 0) ? minExpectation.toString() : '0'"
        id="min-expected-salary"
        v-model="expectedSalary"
        :rules="[rules.required, rules.number, rules.toomuch]"/>
      <v-icon v-if="offerPlacedAndValid" class="employer__icon" color="green">check</v-icon>
    </v-flex>
    <v-btn block @click="submitExpectation" color="primary">Place employees minimum expected salary&nbsp;<v-icon>check</v-icon></v-btn>
  </div>
</template>

<script>

export default {
  name: 'employee',
  data() {
    return {
      expectedSalary: null,
      /* rules to validate field input. force a number and a value higher then 0*/
      rules: {
        required: (value) => !!value || 'Required.',
        number: (value) => {
          let val = +value;
          return (val && val > 0) || 'Offer is not a number.'
        },
        toomuch: (value) => {
          let val = +value;
          return (val && val <= 80000) || 'Do you really want to rip off your employer?'
        }
      }
    }
  },
  computed: {
    minExpectation(){
      let expected = this.$store.getters['negotiation/getMinExpectation'];
      return expected;
    },
    offerPlacedAndValid(){
      return typeof this.rules.required(this.expectedSalary) !== 'string'
              && typeof this.rules.number(this.expectedSalary) !== 'string'
              && this.minExpectation && this.minExpectation > 0
    }
  },
  methods: {
    submitExpectation(){
      /* set setMinExpectation */
      this.$store.dispatch('negotiation/setMinExpectation', { value: (this.expectedSalary) ? +this.expectedSalary : 0 })
    }
  }
}
</script>


<style lang="stylus">
  .employer
    &__form
      position relative
    &__icon
      position absolute
      right .5em
      top 1.4em
      color green

</style>
