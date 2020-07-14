<template>
  <div>
    <v-card class="mx-auto" flat>
      <v-container class="pa-1">
        <v-item-group multiple>
          <v-row>
            <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
              <v-item class="item-product">
                <v-card class="text-right pa-2" @click="delProduct(item)">
                  <v-btn icon>
                    <v-icon>{{'mdi-close'}}</v-icon>
                  </v-btn>

                  <v-card-title class="display-2 font-weight-black">{{item.name}}</v-card-title>
                  <v-img height="200" :src="innerItemImage(item.Medium.URL)"></v-img>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
          <div>

            <v-btn class="primary" width="300px">order</v-btn>
          </div>
        </v-item-group>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import BookmarksService from '../../services/BookmarksService'
export default {
  data: () => ({
    items: [],
    delivery: 'sa'
  }),
  methods: {
    async findBookmark () {
      try {
        const UserId = this.$store.state.user.id
        this.items = (await BookmarksService.userBookmark({ id: UserId })).data // search by userid
      } catch (error) {
        this.error = error.response.data.error
      }
    },

    async delProduct (item) {
      this.$store.dispatch('delBasket')
      try {
        await BookmarksService.deleteBookmark({ id: item.id })
      } catch (error) {
        this.error = error.response.data.error
      }
      this.findBookmark()
    },
    innerItemImage (URL) {
      return require(`../../../../media/${URL}`)
    }
  },
  async mounted () {
    this.findBookmark()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-product{
  background-image:URL(https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flower-of-Life-small.svg/440px-Flower-of-Life-small.svg.png)
}
</style>
