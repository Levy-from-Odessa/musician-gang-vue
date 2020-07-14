<template>
  <div v-if="role==1">
    <div>
      <p>name</p>
      <input type="text" v-model="Author.name" />
      <p>email</p>
      <input type="text" v-model="Author.email" />
      <p>phone number</p>
      <input type="text" v-model="Author.phoneNumber" />
      <p>MediaId</p>
      <input type="text" v-model="Author.MediaId" />
      <button @click="sendData">send Data</button>
    </div>
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
      :items="allAuthors"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
      @click:row="editItem($event)"
    ></v-data-table>
  </div>
  <div v-else>
    <h1>Error </h1>
    <p>please come back to <router-link :to="{name: 'Index'}" >home page</router-link></p>
  </div>
</template>
<script>
import AuthorsServices from '../../services/AuthorsService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      Author: {
        name: '',
        phone_number: 0,
        email: '',
        MediaId: 0

      },
      allAuthors: [],
      headers: [
        { text: 'id', value: 'id' },
        { text: 'name', value: 'name' },
        { text: 'phoneNumber', value: 'phone_number' },
        { text: 'email', value: 'email' },
        { text: 'MediaId', value: 'MediaId' }
      ]
    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await AuthorsServices.editAuthor(this.Author)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await AuthorsServices.CreateAuthor(this.Author)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allAuthors = (await AuthorsServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await AuthorsServices.deleteAuthor({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.Author = item
      this.editNow = true
    }
  },
  async mounted () {
    this.index()
    if (this.$store.state.user) {
      this.role = this.$store.state.user.role
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 1px solid black;
  display: block;
  margin: 5px auto;
}
</style>
