<template>
  <div>
    <v-carousel>
      <v-carousel-item
        v-for="(img,i) in images"
        :key="i"
        :src="innerItemImage(img)"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-card flat class="py-12">
      <v-card-text>
        <v-row justify="space-around">
          <v-btn class="btn-store" width="200" height="80" :to="{name:'Store'}">Store</v-btn>
          <v-btn width="200" height="80" color="#FFFF8D" :to="{name:'Events'}">Concerts</v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="author in authоrs" :key="author.id" cols="16" md="4">
            <v-card class="mx-auto" max-width="434" tile>
              <v-img
                height="100%"
               >
                <v-row align="end" class="fill-height">
                  <v-col v-if="author.Medium!=null" align-self="start" class="pa-0" cols="12">
                    <v-avatar class="profile" color="grey" size="164" tile>
                      <v-img
                        class="author-img"
                        :src="innerItemImage(author.Medium.URL)"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col class="py-0">
                    <v-list-item color="rgba(0, 0, 0, .4) " dark >
                      <v-list-item-content>
                        <v-list-item-title  class="title black--text">{{author.name}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-card class="d-inline-block mx-auto">
      <v-container>
        <v-row justify="space-around">
          <v-col>
            <!-- <v-img height="auto" width="auto" :src=""></v-img> -->
          </v-col>

          <v-col class="text-center pl-0">
            <v-row class="flex-column ma-0 fill-height" justify="center">
              <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum similique saepe hic, voluptate optio est in fugiat nisi repellendus aliquid quibusdam porro deserunt mollitia nobis corporis modi? Repellat, quisquam non!</v-card-text>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import MediaService from '../../services/MediaService'
import AuthorService from '../../services/AuthorsService'
export default {
  data () {
    return {
      images: [],
      media: null,
      authоrs: null,
      error: ''
    }
  },
  methods: {
    innerItemImage (URL) {
      return require(`../../../../media/${URL}`)
    }
  },
  async mounted () {
    try {
      this.media = (await MediaService.index()).data
      this.authоrs = (await AuthorService.index({id: [12, 10, 11]})).data
    } catch (error) {
      this.error = error.response.data.error
    }
    this.media.forEach(elem => {
      if (elem) {
        let postFix = elem.URL.split('.').pop()
        if (postFix === 'jpg' || postFix === 'png' || postFix === 'gif') {
          this.images.push(elem.URL)
        }
      }
    })
    console.log(this.authоrs)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-store {
  border: 10px solid #fee27e !important;
}

</style>
