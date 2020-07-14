<template>
  <div>
    <v-row>
      <v-col>
       <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="month"
            @click:event="showEvent"
          ></v-calendar>
        </v-sheet>
      </v-col>

      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              an amazing Event in {{selectedEvent.place}}
            </v-card-text>
            <v-card-text class="font-weight-black">
              only {{selectedEvent.ticketsCount}} tickets
            </v-card-text>
            <v-btn
              v-bind:event="event"
              dark
              class="cyan"
              :to="{
                  name: 'Event',
                  params: {
                    eventId: selectedEvent.id
                  }
                }"
            >more information</v-btn>
            <span v-html="selectedEvent.details"></span>

          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-row>
  </div>
</template>
<script>
import ConcertsServices from '../../services/ConcertsService'
export default {
  data: () => ({
    today: '',
    events: [],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  methods: {
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        console.log(event)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    }
  },
  async mounted () {
    var d = new Date()
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    this.today = year + '-' + month + '-' + day
    try {
      this.events = (await ConcertsServices.index()).data
    } catch (error) {
      this.error = error.response.data.error
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
