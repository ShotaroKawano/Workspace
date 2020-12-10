<template>
  <v-app id="app">
    <div id="app">
      <img src="./assets/logo.png">
      <router-view/>
      <!-- 追加 -->
      <v-btn large color="primary">まてりあるでざいんぼたん</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
