<template>
  <div v-if="role==1">
    <div>
      <p>count</p>
      <input type="text" v-model="bookmark.count" />
      <p>price</p>
      <input type="text" v-model="bookmark.price" />
      <p>type</p>
      <input type="text" v-model="bookmark.type" />
      <p>UserId</p>
      <input type="text" v-model="bookmark.UserId" />
      <p>GoodId</p>
      <input type="text" v-model="bookmark.GoodId" />
      <p>ConcertId</p>
      <input type="text" v-model="bookmark.ConcertId" />
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
    :items="allBookmarks"
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
import BookmarksService from '../../services/BookmarksService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      bookmark: {
        count: 0,
        price: 0,
        type: '',
        UserId: '',
        GoodId: '',
        ConcertId: ''
      },
      allBookmarks: [],
      headers: [
        { text: 'id', value: 'id' },
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'count', value: 'count' },
        { text: 'price', value: 'price' },
        { text: 'type', value: 'type' },
        { text: 'UserId', value: 'UserId' },
        { text: 'GoodId', value: 'GoodId' },
        { text: 'ConcertId', value: 'ConcertId' }

      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await BookmarksService.editBookmark(this.bookmark)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await BookmarksService.createBookmark(this.bookmark)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allBookmarks = (await BookmarksService.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await BookmarksService.deleteBookmark({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.bookmark = item
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
