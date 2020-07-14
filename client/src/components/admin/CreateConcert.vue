/* eslint-disable no-undef */
<template>
   <div v-if="role==1">
    <div>
      <p>name</p>
      <input type="text" v-model="Concert.name" />
      <p>place</p>
      <input type="text" v-model="Concert.place" />
      <p>ticketsCount</p>
      <input type="text" v-model="Concert.ticketsCount" />
      <p>date</p>
      <input type="text" v-model="Concert.start" />
       <p>MediaId</p>
      <input type="text" v-model="Concert.MediaId" />
      <button @click="sendData">send Data</button>
    </div>
    <v-flex>
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
    :items="allConcerts"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
  ></v-data-table>
  </div>
  <div v-else>
    <h1>Error </h1>
    <p>please come back to <a >home page</a></p>
  </div>
</template>
<script>
import ConcertsServices from '../../services/ConcertsService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      Concert: {
        name: '',
        place: '',
        ticketsCount: 0,
        start: 0,
        MediaId: ''
      },
      allConcerts: [],
      headers: [
        { text: 'id', value: 'id' },
        { text: 'name', value: 'name' },
        {
          text: 'place',
          align: 'start',
          sortable: false,
          value: 'place'
        },
        { text: 'ticketsCount', value: 'ticketsCount' },
        { text: 'start', value: 'start' },
        { text: 'MediaId', value: 'MediaId' }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await ConcertsServices.editConcert(this.Concert)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await ConcertsServices.createConcert(this.Concert)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allConcerts = (await ConcertsServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await ConcertsServices.deleteConcert({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.Concert = item
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
