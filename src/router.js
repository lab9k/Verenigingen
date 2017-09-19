import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import PublicLijst from './PublicLijst.vue'
import Lijst from './Lijst.vue'
import PublicNieuw from './PublicNieuw.vue'
import Nieuw from './Nieuw.vue'
import Contact from './Contact.vue'
import contract from './contract'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/lijst', component: PublicLijst, name: 'publiclijst' },
  { path: '/nieuw', component: PublicNieuw, name: 'publicnieuw' },
  { path: '/contact', component: Contact, name: 'contact' },
  { path: '/admin/lijst', component: Lijst, name: 'adminlijst', meta:{requireAdmin: true, redirect: '/lijst'}},
  { path: '/admin/nieuw', component: Nieuw, name: 'adminnieuw', meta:{requireAdmin: true, redirect: '/nieuw'}}]

const router = new VueRouter({
  routes: routes,
})

var isAdmin = false;
contract.checkIfAdmin(web3.eth.accounts[0], function(error, result){
  if(!error){
    isAdmin = result
  }
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAdmin){
    if(isAdmin){
      next()
    } else {
      next(to.meta.redirect)
    }
  }
  next()
})

export default router
