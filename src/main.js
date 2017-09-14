import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Lijst from './Lijst.vue'
import Nieuw from './Nieuw.vue'
import Contact from './Contact.vue'
import Detail from './Detail.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


const routes = [
  { path: '/', component: Home },
  { path: '/lijst', component: Lijst },
  { path: '/nieuw', component: Nieuw },
  { path: '/contact', component: Contact },
  { path: '/detail', component: Detail },
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
const config = {
    dappInterface: [{ "constant": false, "inputs": [{ "name": "_admin", "type": "address" }], "name": "removeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "acceptRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getVereniging", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint8" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newAdmin", "type": "address" }], "name": "addAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "denyRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_naam", "type": "string" }, { "name": "_ondernemingsnummer", "type": "string" }, { "name": "_beschrijving", "type": "string" }], "name": "addVereniging", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numVerenigingen", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "checkIfAdmin", "outputs": [{ "name": "admin", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "_naam", "type": "string" }, { "name": "_ondernemingsnummer", "type": "string" }, { "name": "_beschrijving", "type": "string" }], "name": "editVereniging", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "_naam", "type": "string" }, { "indexed": false, "name": "_ondernemingsnummer", "type": "string" }, { "indexed": false, "name": "_beschrijving", "type": "string" }, { "indexed": false, "name": "datetime", "type": "uint256" }], "name": "addVerenigingEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "_naam", "type": "string" }, { "indexed": false, "name": "_ondernemingsnummer", "type": "string" }, { "indexed": false, "name": "_beschrijving", "type": "string" }, { "indexed": false, "name": "datetime", "type": "uint256" }], "name": "editVerenigingEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "status", "type": "uint8" }, { "indexed": false, "name": "datetime", "type": "uint256" }], "name": "statuschangedEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_newAdmin", "type": "address" }, { "indexed": false, "name": "dateTime", "type": "uint256" }], "name": "addAdminEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_Admin", "type": "address" }, { "indexed": false, "name": "dateTime", "type": "uint256" }], "name": "removeAdminEvent", "type": "event" }],

    contractAddress: "0x91bc4e5851b9cf25dac9a39f567fb94236c6dce0",
}
if (typeof web3 !== "undefined") {
    // Use MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
}
const contract = web3.eth.contract(config.dappInterface).at(config.contractAddress);

new Vue({
  el: '#page',
  data () {
    return {
      verenigingList: {},
    }
  },
  created: function() {
    this.fetchVerenigingenLijst();
    var self = this;
    var event = contract.statuschangedEvent(function(error, result) {
      if (!error){
        self.verenigingList[result.args.id].status = result.args.status
      }
    });
    var event = contract.editVerenigingEvent(function(error, result) {
      if (!error){
        self.verenigingList[result.args.id] = {'naam': result.args._naam, 'ondernemingsnummer': result.args._ondernemingsnummer, 'beschrijving': result.args._beschrijving, 'status': 2};
      }
    });
    var event = contract.addVerenigingEvent(function(error, result) {
      if (!error){
        self.verenigingList[result.args.id] = {'naam': result.args._naam, 'ondernemingsnummer': result.args._ondernemingsnummer, 'beschrijving': result.args._beschrijving, 'status': 2};
      }
    });
  },
  methods: {
    fetchVerenigingenLijst: function(){
      this.getNumVereniging().then( (num) => this.fetchVereniging(num)).then( (result) => {this.verenigingList = result});
    },
    getNumVereniging: function() {
      return new Promise((resolve, reject) => contract.numVerenigingen.call(function(error, result) {
        if(error){
          reject()
        } else {
          console.log(result);
          resolve(result)
        }
      }))
    },
    fetchVereniging: async function(index) {
      var dict = {}
      for (var i = 0; i < index; i++) {
        contract.getVereniging(i, function(err, res){
          dict[res[4]] = {'naam': res[0], 'ondernemingsnummer': res[1], 'beschrijving': res[2], 'status': res[3]};
        })
      }
      return dict;
    },
  },
  render: h => h(App),
  router: router,
})
