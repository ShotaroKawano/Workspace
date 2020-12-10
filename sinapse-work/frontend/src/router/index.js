import Vue from 'vue'
import Router from 'vue-router'
import PlayScreen from '../../views/PlayScreen.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PlayScreen',
      component: PlayScreen
    }
  ]
})
