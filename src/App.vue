<template>
  <div id="app">
    <v-app id="inspire" lighten>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
        </v-toolbar-items>

      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex shrink>

              <router-view/>

            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed>
        <span>{{ appName }} &copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        appName: 'Negotiation App'
      }
    },
    props: {

    },
    mounted(){
      document.title = this.appName;
    }
  }
</script>

<style lang="stylus">
  #app
    font-family Arial, 'Avenir', Helvetica, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    .app__navigation-link
      text-decoration none

    .page
      width 90%
      padding 0 auto
      /*margin 5em auto*/
      margin auto
      height auto
      min-height 98vh
      box-shadow 0 0 1em 3px lightgrey


</style>
