<template>
  <div>
    <v-toolbar>
      <v-menu transition="slide-x-transition" right :offset-y="true">
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in menu" :key="i">
            <v-list-item-title>
              <v-btn :to="item.link">{{item.name}}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title class="logo" @click="goTo({name:'Index'})">Diploma</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tab :to="{
          name: 'Basket'
        }">
        <v-badge color="green" :content="count" >
          <v-icon>{{'mdi-basket'}}</v-icon>
        </v-badge>
      </v-tab>
      <v-toolbar-items v-if="!$store.state.isUserLggedIn">
        <v-btn class="mr-3" :to="{
          name: 'Register'
        }">Sing Up</v-btn>
        <v-btn :to="{
          name: 'Login'
        }">Login</v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn @click="logout" :to="{
          name: 'Index'
        }">Log out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card v-if="role===1">
    <v-tabs
      center-active
      show-arrows
    >
    <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
      <v-tab v-for="(item, i) in adminMenu" :key="i" >
        <router-link :to="item.link">{{item.name}}</router-link>
      </v-tab>

    </v-tabs>
  </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      role: 0,
      menu: [
        {
          name: 'Store',
          link: { name: 'Store' }
        },
        {
          name: 'Events',
          link: { name: 'Events' }
        },
        {
          name: 'Tours',
          link: { name: 'Tours' }
        },
        {
          name: 'Products',
          link: { name: 'Products' }
        },
        {
          name: 'Media',
          link: { name: 'Media' }
        }
      ],
      state: 'hidden'
    }
  },
  methods: {
    goTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setBasket', 0)
    },
    openMenu () {
      this.state = this.state === 'visible' ? ' ' : 'visible'
    }
  },
  computed: {
    count () {
      return this.$store.state.basket
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  cursor: pointer;
}
</style>
