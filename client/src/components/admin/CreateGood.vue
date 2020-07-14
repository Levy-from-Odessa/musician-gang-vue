<template>
 <div v-if="role==1">
    <div>
      <p>name</p>
      <input type="text" v-model="good.name" />
      <p>count</p>
      <input type="text" v-model="good.count" />
      <p>price</p>
      <input type="text" v-model="good.price" />
      <p>type</p>
      <input type="text" v-model="good.type" />
      <p>MediaId</p>
      <input type="text" v-model="good.MediaId" />
      <p>ConcertId</p>
      <input type="text" v-model="good.ConcertId" />
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
    :items="allGoods"
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
import GoodsServices from '../../services/GoodsServices'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      good: {
        name: '',
        count: 0,
        price: 0,
        type: '',
        MediaId: 0,
        ConcertId: 0
      },
      allGoods: [],
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
        { text: 'MediaId', value: 'MediaId' },
        { text: 'ConcerId', value: 'ConcerId' }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await GoodsServices.editGood(this.good)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await GoodsServices.createGood(this.good)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allGoods = (await GoodsServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await GoodsServices.deleteGood({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.good = item
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
