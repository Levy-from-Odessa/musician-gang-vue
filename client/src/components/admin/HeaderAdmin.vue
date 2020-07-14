<template>
  <div>
    <v-card>
    <v-tabs
      center-active
      show-arrows
    >
    <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
      <v-tab v-for="(item, i) in adminMenu" :key="i" >
        <router-link :to="item.link">{{item.name}}</router-link>
      </v-tab>

    </v-tabs>
  </v-card></div>
</template>
<script>
export default {
  data () {
    return {
      role: 0,
      adminMenu: [
        {
          name: 'Create Author',
          link: { name: 'CreateAuthor' }
        },
        {
          name: 'Create Bookmark',
          link: { name: 'CreateBookmark' }
        },
        {
          name: 'Create Concert',
          link: { name: 'CreateConcert' }
        },
        {
          name: 'Create Gang',
          link: { name: 'CreateGang' }
        },
        {
          name: 'Create Good',
          link: { name: 'CreateGood' }
        },
        {
          name: 'Create Mailing',
          link: { name: 'CreateMailing' }
        },
        {
          name: 'Create Media',
          link: { name: 'CreateMedia' }
        },
        {
          name: 'create MusicProg',
          link: { name: 'createMusicProg' }
        },
        {
          name: 'Create Tour',
          link: { name: 'CreateTour' }
        },
        {
          name: 'create User',
          link: { name: 'CreateUser' }
        },
        {
          name: 'Create UserMailing',
          link: { name: 'CreateUserMailing' }
        }
      ]

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
