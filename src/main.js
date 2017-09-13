import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Detail from './Detail.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


const routes = [
  { path: '/', component: Home },
  { path: '/detail', component: Detail }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: routes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
/*new Vue({
  router
}).$mount('#app')*/

new Vue({
  el: '#page',
  render: h => h(App),
  router: router
})