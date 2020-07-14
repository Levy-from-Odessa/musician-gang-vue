/* eslint-disable no-tabs */
<template>
  <div>
    <h1>Products</h1>
    <v-container class="pa-1">
      <v-item-group
        v-model="selected"
        multiple
      >

        <v-row>

          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            md="6"

          >

            <v-item  class="item-product" >
              <v-card>
              <v-card
                class="text-right pa-2"
                @click="addProduct(i)"
              >

              <v-btn icon>
                <v-icon>
                  {{active[i]}}
                </v-icon>
              </v-btn>
              </v-card>
                <v-card  color="transparent" flat class="d-flex justify-space-between text-center" width='100%'>
                <v-img height="200" :src="innerItemImage(item.Medium.URL)" >
                </v-img>
      </v-card>
      <v-card class="text-left">
        <v-card-title>{{item.name}}</v-card-title>
        <v-card-text>{{item.price}}$</v-card-text>
      </v-card>
      </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

<h1>Concerts</h1>
    <v-container class="pa-1">
      <v-item-group
        v-model="selected"
        multiple
      >
        <v-row>
          <v-col
            v-for="(event, i) in events"
            :key="i"
            cols="12"
            md="3"

          >
            <v-item  class="item-product" >
              <v-card
                 class="text-right pa-2"
                 :to="{
                  name: 'Event',
                  params: {
                    eventId: event.id
                  }
                }"
                >
                <v-img width="200"></v-img>
                  <v-card-title>Top 10 Australian beaches</v-card-title>

              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>

  </div>
</template>
<script>
import BookmarksService from '../../services/BookmarksService'
import GoodsService from '../../services/GoodsServices'
import ConcertsService from '../../services/ConcertsService'
export default {
  data: () => ({
    error: '',
    items: null,
    events: [],
    selected: [],
    active: [],
    basket: [],
    userId: ''
  }),
  methods: {
    async writeBookmark (i) {
      try {
        await BookmarksService.createBookmark({UserId: this.userId, GoodId: this.items[i].id})
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async addProduct (i) {
      if (this.$store.state.user) {
        this.userId = this.$store.state.user.id
        if (this.active[i] === 'mdi-heart-outline') {
          this.$set(this.active, i, 'mdi-heart')
          console.log(this.items[i])
          console.log(this.active[i])
          this.$store.dispatch('addBasket')
        } else {
          this.$set(this.active, i, 'mdi-heart-outline')
          this.$store.dispatch('delBasket')
        }
        this.writeBookmark(i)
      }
    },
    innerItemImage (URL) {
      return require(`../../../../media/${URL}`)
    }
  },
  async mounted () {
    try {
      this.items = (await GoodsService.index()).data
      this.events = (await ConcertsService.index()).data
    } catch (error) {
      this.error = error.response.data.error
    }
    console.log(this.items)
    this.basket = this.$store.state.basket
    for (let i = 0; i < this.items.length; i++) {
      if (this.basket[i]) {
        this.active[i] = 'mdi-heart'
      } else {
        this.active[i] = 'mdi-heart-outline'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-product{

  background-image:URL(https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flower-of-Life-small.svg/440px-Flower-of-Life-small.svg.png)
}
</style>
