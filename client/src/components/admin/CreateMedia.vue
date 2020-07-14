<template>
  <div v-if="role==1">
    <v-row>
      <v-col>

        <p>URL</p>
        <input type="text" v-model="Media.URL" />
        <button @click="sendData">send Data</button>
      </v-col>

    </v-row>
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
    :items="allMedias"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
    @click:row="editItem($event)"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    v-on:item-expanded='selectImage($event)'
  >
    <template v-slot:top>
    </template>
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
        <img height="300" :src='innerItemImage' >
      </td>
    </template>
  </v-data-table>
  </div>
  <div v-else>
    <h1>Error </h1>
    <p>please come back to <a >home page</a></p>
  </div>
</template>
<script>
import MediasServices from '../../services/MediaService'
export default {
  data () {
    return {
      role: 0,
      innerImg: '',
      expanded: [],
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      Media: {
        URL: ''
      },
      allMedias: [],
      headers: [
        { text: 'id', value: 'id' },
        {
          text: 'URL',
          align: 'start',
          sortable: false,
          value: 'URL'
        }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await MediasServices.editMedia(this.Media)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await MediasServices.createMedia(this.Media)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allMedias = (await MediasServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await MediasServices.deleteMedia({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.Media = item
      this.editNow = true
    },
    selectImage (e) {
      this.innerImg = e.item.URL
    }

  },
  computed: {
    innerItemImage () {
      if (!this.innerImg) {
        return
      }
      console.log(this.innerImg)
      return require(`../../../../media/${this.innerImg}`)
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
