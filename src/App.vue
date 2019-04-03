<template>
  <v-app>
      <toolbar></toolbar>

      <v-content>
        <router-view></router-view>
      </v-content>

  </v-app>
</template>

<script>
import Toolbar from '@/Components/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar,


  },
  data () {
    return {
      //
    }
  }
}
</script>
