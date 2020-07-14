<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="img in images"
              :key="img.id"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="innerItemImage(img)"
                  :lazy-src="innerItemImage(img)"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
      <v-btn @click="readFile()">
       some
      </v-btn>
  </v-row>
</template>
<script>
import MediasServices from '../../services/MediaService'
let fs = require('fs')
export default {
  data: () => ({
    images: [],
    media: []
  }),
  methods: {
    innerItemImage (URL) {
      return require(`../../../../media/${URL}`)
    }
  },
  async mounted () {
    try {
      this.media = (await MediasServices.index()).data
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
    var text = fs.readFileSync('../../../../media/11.txt')
    var string = text.toString('utf-8') // converting the Buffer into String

    var textByLine = string.split('\n')
    console.log(textByLine)
  }
}
</script>
