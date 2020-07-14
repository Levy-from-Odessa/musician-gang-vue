<template>
  <div >
   <h1>Login</h1>
    <v-flex xs6 offset-xs3>
      <v-text-field label="email" v-model="email">
      </v-text-field>
      <v-text-field label="password" v-model="password">
      </v-text-field>
      <button @click="login" >Login</button>
      <div v-html="error"></div>
    </v-flex>
    <br>
    <br>

    <div v-for="user in users" :key="user.id">
      {{user.id}} -
      {{user.email}} -
      {{user.password}} -
      {{user.createdAt}} -
      {{user.updatedAt}} -
    </div>
  </div>
</template>

<script>
import AuthenticationService from '../../services/AuthenticationService'
import BookmarkService from '../../services/BookmarksService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      users: null,
      basket: 0
    }
  },
  async mounted () {
    try {
      this.users = (await AuthenticationService.index()).data
    } catch (error) {
      this.error = error.response.data.error
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log(response.data.user.role)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'Index' })
        const UserId = response.data.user.id
        this.basket = (await BookmarkService.userCountBookmark({id: UserId})).data.count
      } catch (error) {
        this.error = error.response.data.error
      }
      this.$store.dispatch('setBasket', this.basket)
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
