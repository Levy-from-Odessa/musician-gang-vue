<template>
  <div >
   <h1>Register</h1>
    <v-flex xs6 offset-xs3>
      <v-text-field label="email" v-model="email">
      </v-text-field>
      <v-text-field label="password" v-model="password" type='password'>
      </v-text-field>
      <button @click="Register" >Register</button>
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
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      users: null
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
    async Register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          role: '0'
        })
        console.log(response.data)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'Index' })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
