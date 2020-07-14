<template>
  <v-container>
    <h1>{{tourName}}</h1>
    <v-row dense>
      <v-col v-for="(concert, i) in concerts" :key="i" cols="5">
        <v-card >
          <div class="d-flex  justify-space-around">
            <div>
              <v-card-title class="headline" v-text="concert.Concert.name"></v-card-title>

              <v-card-subtitle v-text="concert.Concert.place"></v-card-subtitle>
              <v-card-text> There are only {{concert.Concert.ticketsCount}} tickets</v-card-text>
              <v-card-text> We are looking for you {{concert.Concert.start}}</v-card-text>

            </div>
             <v-avatar class="ma-3" size="125" tile>
              <v-img :src="innerItemImage(concert.Concert.Medium.URL)"></v-img>
            </v-avatar>
          </div>
          <v-btn
          :to="{
                  name: 'Event',
                  params: {
                    eventId: concert.Concert.id
                  }
                }">order</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import ToursService from '../../services/ToursService'
export default {
  data () {
    return {
      concerts: {},
      tourName: ''
    }
  },
  computed: {
    ...mapState(['route'])
  },
  async mounted () {
    this.tourName = this.route.params.tour
    const name = this.tourName
    try {
      this.concerts = (await ToursService.findTour({ name })).data.tour
    } catch (error) {
      this.error = error.response.data.error
    }
    console.log(this.concerts)
  },
  methods: {
    innerItemImage (URL) {
      return require(`../../../../media/${URL}`)
    }
  }
}
</script>

<style scoped>
</style>
