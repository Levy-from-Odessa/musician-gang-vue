<template>
  <v-card
    class="mx-auto"
    max-width="80%"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="innerItemImage(event.Medium.URL)"
    >
      <v-card-title></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0 display-4">{{event.name}}</v-card-subtitle>
      <v-card-title clss="text--primary">{{event.place}}</v-card-title>

      <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quaerat doloribus quidem facere ut nemo. Nihil debitis molestias distinctio ducimus neque? Blanditiis veritatis reiciendis optio quidem impedit quos obcaecati maiores.</v-card-text>
  <v-card-text >
    only {{event.ticketsCount}} to that event in {{event.start}}
  </v-card-text>
    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Buy a ticket
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import ConcertsService from '../../services/ConcertsService'
export default {
  data () {
    return {
      event: {}
    }
  },
  computed: {
    ...mapState(['route'])
  },
  async mounted () {
    const eventId = this.route.params.eventId
    console.log(eventId)
    try {
      this.event = (await ConcertsService.findConcert({eventId})).data
    } catch (error) {
      this.error = error.response.data.error
    }
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
