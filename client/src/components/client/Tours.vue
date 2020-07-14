<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line v-for="tour in tours" :key="tour.name">
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{tour.name}}</v-list-item-title>
        <v-list-item-subtitle>there are {{tour.count}} cities in a tour</v-list-item-subtitle>
      </v-list-item-content>

      <v-card-actions>
      <v-btn text
             :to="{
                  name: 'Tour',
                  params: {
                    tour: tour.name
                  }
                }"
      >more information</v-btn>
    </v-card-actions>
    </v-list-item>

  </v-card>
</template>
<script>
import ToursService from '../../services/ToursService'
export default {
  data: () => ({
    tours: [],
    error: ''
  }),
  async mounted () {
    try {
      this.tours = (await ToursService.findDistTour()).data
    } catch (error) {
      this.error = error.response.data.error
    }

    console.log(this.tours)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-product{
  background-image:URL(https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flower-of-Life-small.svg/440px-Flower-of-Life-small.svg.png)
}
</style>
