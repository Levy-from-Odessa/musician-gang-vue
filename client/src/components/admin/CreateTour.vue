<template>
  <div v-if="role==1">
    <div>
      <p>name</p>
      <input type="text" v-model="Tour.name" />
      <p>ConcertId</p>
      <input type="text" v-model="Tour.ConcertId" />
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
    :items="allTours"
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
import ToursServices from '../../services/ToursService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      Tour: {
        name: '',
        ConcertId: 0
      },
      allTours: [],
      headers: [
        { text: 'id', value: 'id' },
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'ConcertId', value: 'ConcertId' }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await ToursServices.editTour(this.Tour)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await ToursServices.createTour(this.Tour)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allTours = (await ToursServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await ToursServices.deleteTour({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.Tour = item
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
