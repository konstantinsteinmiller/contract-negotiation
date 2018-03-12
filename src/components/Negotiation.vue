<template>
  <div>
    <v-layout row>
      <v-flex sm12 sm12>
        <v-alert v-if="alert && (nagotiationResult && nagotiationFinished)"
                 :type="alert.type"
                 dismissible
                 v-model="alert.show">
          <h1>{{ alert.text }}</h1><br>
          <h3>{{ alert.max }}</h3><br>
          <h3>{{ alert.min }}</h3>
        </v-alert>
        <v-card>

          <div class="negotiation__tabs"dark
               slider-color="yellow">
            <div class="negotiation__tab"
                 :class="{'negotiation__tab--active' : activeTab === index + 1}"
                 v-for="(tab, index)  in tabs"
                 :key="tab.name + '_' + index"
                  @click="selectTab(index)">
              {{ tab.name }}
            </div>

          </div>
          <v-list two-line>
            <v-container grid-list-xl >
              <v-form ref="form" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs12>
                    <div>
                      <v-card flat>
                        <v-card-text>
                          <div class="text-xs-center mt-3">
                            <router-view></router-view>
                          </div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-flex>

                </v-layout>
              </v-form>
            </v-container>

          </v-list>
        </v-card>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
  name: 'negotiation',
  data() {
    return {
      title: 'Page name',
      subTitle: 'Subtitle for page',
      alert: { type: 'warning', text: 'blub' }/*null*/,
      activeTab: 0,
      tabs: [{ name: 'Employer' }, { name: 'Employee' }]
    }
  },
  computed: {
    isEmployer(){
      /* quick and dirty */
      return (this.$route.path.indexOf('employer') > -1)
    },
    maxOffer(){
      return this.$store.getters['negotiation/getMaxOffer'];
    },
    minExpectation(){
      return this.$store.getters['negotiation/getMinExpectation'];
    },
    nagotiationFinished(){
      console.log('this.maxOffer', this.maxOffer, this.minExpectation)
      let isFinished = (this.maxOffer && +this.maxOffer > 0 && this.minExpectation && +this.minExpectation > 0 );
      return isFinished;
    },
    nagotiationResult(){
      let isSuccessful = !!(this.nagotiationFinished && +this.maxOffer >= +this.minExpectation) ;

      // console.log('isSuccessful ', isSuccessful)
      if(isSuccessful){
        this.alert = { show: true,
                       type: 'success',
                       text: `The negotiation was successful`,
                       max: `Maximum offer was: ${this.maxOffer}`,
                       min: `Minimum expected salary was: ${this.minExpectation}`
        }
      }else {
        this.alert = { show: true,
                       type: 'error',
                       text: `The negotiation failed`,
                       max: `Maximum offer was: ${this.maxOffer}`,
                       min: `Minimum expected salary was: ${this.minExpectation}`
        }
      }
      return true;
    }
  },
  created() {},
  mounted() {
    this.onInit();
  },
  methods: {
    onInit(){
      this.activeTab = (this.isEmployer) ? 1 : 2;
    },
    selectTab(index){
      /* manually select the tab clicked and route to the according child component */
      this.activeTab = index + 1;
      this.$router.push({ name: this.tabs[index].name })
    }
  }
}
</script>


<style lang="stylus">
  .negotiation
    &__tabs
      display flex
      flex-direction row
      justify-content center

    &__tab
      flex 1 1 50%
      background lightgrey
      font-size 1.5em
      font-weight bold
      padding 1em
      &--active
        background black
        color white
</style>
