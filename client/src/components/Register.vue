<template>
  <div>
    <h1>regisrter</h1>
    <input type="text" v-model="email" >
    <input type="text" v-model="password">
    <button @click="sendData">register</button>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    sendData () {
      AuthenticationService.register({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
