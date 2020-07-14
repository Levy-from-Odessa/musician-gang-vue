<template>
  <div id="app">
    <v-app>
      <page-header />
      <page-header-admin v-if="role==1"/>
        <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
      <page-footer />
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from './components/client/Header'
import PageFooter from './components/client/Footer'
import PageHeaderAdmin from './components/admin/HeaderAdmin'
export default {
  data () {
    return {
      role: 0
    }
  },
  computed: {
    ...mapState({user: 'user'})
  },
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
    PageHeaderAdmin
  },
  watch: {
    user: function () {
      if (this.user) {
        this.role = this.user.role
        console.log(this.role)
      } else {
        this.role = 0
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRaD98GnzSpQPp-Ux_IuLQSota2txUnMOKcZOLbhMxDOyvoAF1q&usqp=CAU) top right no-repeat ;
  background-size:cover; */
}
</style>
