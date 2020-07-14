<template>
  <div v-if="role==1">
    <div>
      <p>TourId</p>
      <input type="text" v-model="Mailing.TourId" />
      <p>ConcertId</p>
      <input type="text" v-model="Mailing.ConcertId" />
      <p>MediaId</p>
      <input type="text" v-model="Mailing.MediaId" />
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
    :items="allMailings"
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
import MailingsServices from '../../services/MailingService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      Mailing: {
        TourId: 0,
        ConcertId: 0,
        MediaId: 0
      },
      allMailings: [],
      headers: [
        { text: 'id', value: 'id' },
        {
          text: 'TourId',
          align: 'start',
          sortable: false,
          value: 'TourId'
        },
        { text: 'ConcertId', value: 'ConcertId' },
        { text: 'MediaId', value: 'MediaId' }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await MailingsServices.editMailing(this.Mailing)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await MailingsServices.createMailing(this.Mailing)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allMailings = (await MailingsServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await MailingsServices.deleteMailing({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.Mailing = item
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
