<template>
  <div v-if="role==1">
    <div>
      <p>MailingId</p>
      <input type="text" v-model="UserMailing.MailingId" />
      <p>UserId</p>
      <input type="text" v-model="UserMailing.UserId" />

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
    :items="allUserMailings"
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
import UserMailingsServices from '../../services/UserMailingService'
export default {
  data () {
    return {
      role: 0,
      editNow: false,
      idToDel: '',
      error: '',
      search: '',
      UserMailing: {
        MailingId: 0,
        UserId: 0
      },
      allUserMailings: [],
      headers: [
        { text: 'id', value: 'id' },
        { text: 'MailingId', value: 'MailingId' },
        { text: 'UserId', value: 'UserId' }
      ]

    }
  },
  methods: {
    async sendData () {
      if (this.editNow) {
        try {
          await UserMailingsServices.editUserMailing(this.UserMailing)
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        try {
          await UserMailingsServices.CreateUserMailing(this.UserMailing)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.editNow = false
      this.index()
    },
    async index () {
      try {
        this.allUserMailings = (await UserMailingsServices.index()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deleteItem () {
      try {
        await UserMailingsServices.deleteUserMailing({ id: this.idToDel })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.idToDel = ''
      this.index()
    },
    editItem (item) {
      this.UserMailing = item
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
