<template>
  <div v-if="activeRole==1">
    <v-flex xs6 offset-xs3>
      <v-text-field label="email" v-model="email" autocomplete="off"></v-text-field>
      <v-text-field label="password" v-model="password" type="password"></v-text-field>
        <v-text-field label="role" v-model="role" type="role"></v-text-field>
      <button @click="register">create user</button>
      <div v-html="error" class="red--text"></div>
    </v-flex>
    <br />
    <br />
    <v-flex row>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-text-field label="delete" v-model="idToDel" @keyup.enter="deleteItem()"></v-text-field>
    </v-flex>

    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
      @click:row="editItem($event)"
    ></v-data-table>
  </div>
  <div v-else>
    <h1>Error </h1>
    <p>please come back to <a >home page</a></p>
  </div>
</template>
<script>
import AuthenticationService from '../../services/AuthenticationService'

export default {
  data () {
    return {
      activeRole: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      id: '',
      email: '',
      password: '',
      role: '',
      users: [],
      headers: [
        { text: 'id', value: 'id' },
        { text: 'email', value: 'email' },
        { text: 'password', value: 'password' },
        { text: 'role', value: 'role' }
      ]
    }
  },

  async mounted () {
    this.index()
    if (this.$store.state.user) {
      this.activeRole = this.$store.state.user.role
    }
  },
  methods: {
    async index () {
      try {
        this.users = (await AuthenticationService.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },

    editItem (item) {
      this.id = item.id
      this.email = item.email
      this.password = item.password
      this.role = item.role
      this.editNow = true
    },
    async deleteItem () {
      try {
        await AuthenticationService.delete({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },

    async register () {
      if (this.editNow) {
        // edit
        try {
          await AuthenticationService.edit({
            id: this.id,
            email: this.email,
            password: this.password,
            role: this.role
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        // make
        try {
          await AuthenticationService.register({
            email: this.email,
            password: this.password,
            role: this.role
          })
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
