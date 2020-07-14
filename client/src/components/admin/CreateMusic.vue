<template>
  <div v-if="role==1">
    <div>
      <p>name</p>
      <input type="text" v-model="Music.name" />
      <p>AuthorId</p>
      <input type="text" v-model="Music.AuthorId" />
      <p>MediaId</p>
      <input type="text" v-model="Music.MediaId" />
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
    :items="allMusics"
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
import MusicsServices from '../../services/MusicService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      Music: {
        name: '',
        AuthorId: 0,
        MediaId: 0
      },
      allMusics: [],
      headers: [
        { text: 'id', value: 'id' },
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'AuthorId', value: 'AuthorId' },
        { text: 'MediaId', value: 'MediaId' }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await MusicsServices.editAuthor(this.Music)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await MusicsServices.CreateAuthor(this.Music)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allMusics = (await MusicsServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await MusicsServices.deleteAuthor({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.Music = item
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
