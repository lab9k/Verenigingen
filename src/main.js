import Vue from 'vue'
import App from './App.vue'
import router from './router'
import contract from './contract'


new Vue({
  el: '#app',
  data () {
    return {
      verenigingList: {},
      isAdmin: false
    }
  },
  created: function() {
    this.fetchVerenigingenLijst();
    var self = this;
    contract.checkIfAdmin(web3.eth.accounts[0], function(error, result){
      if(!error){
        self.checkIfAdmin = result
      }
    })
    var event = contract.statuschangedEvent(function(error, result) {
      if (!error){
        self.verenigingList[result.args.id].status = result.args.status
        self.verenigingList[result.args.id].lastChange = new Date(result.args.datetime * 1000)
      }
    });
    var event = contract.editVerenigingEvent(function(error, result) {
      if (!error){
        self.verenigingList[result.args.id] = {'naam': result.args._naam, 'ondernemingsnummer': result.args._ondernemingsnummer, 'beschrijving': result.args._beschrijving, 'status': 2, 'lastChange' : new Date(result.args.datetime * 1000), 'id' : result.args.id};
      }
    });
    var event = contract.addVerenigingEvent(function(error, result) {
      if (!error){
        self.verenigingList[result.args.id] = {'naam': result.args._naam, 'ondernemingsnummer': result.args._ondernemingsnummer, 'beschrijving': result.args._beschrijving, 'status': 2, 'lastChange' : new Date(result.args.datetime * 1000), 'id' : result.args.id};
      }
    });
  },
  methods: {
    addVereniging: function(naam, ondernemingsnummer, beschrijving){
      contract.addVereniging(naam, ondernemingsnummer, beschrijving, (error, value) => {
        console.log(error);
      });
    },
    editVereniging: function(id, naam, ondernemingsnummer, beschrijving) {
      contract.editVereniging(id, naam, ondernemingsnummer, beschrijving, (error, value) => {
        console.log(error);
      });
    },
    fetchVerenigingenLijst: function(){
      this.getNumVereniging().then( (num) => this.fetchVereniging(num)).then( (result) => {this.verenigingList = result});
    },
    getNumVereniging: function() {
      return new Promise((resolve, reject) => contract.numVerenigingen.call(function(error, result) {
        if(error){
          reject()
        } else {
          resolve(result)
        }
      }))
    },
    fetchVereniging: function(index) {
      var dict = {}
      for (var i = 0; i < index; i++) {
        contract.getVereniging(i, function(err, res){
          dict[res[5]] = {'naam': res[0], 'ondernemingsnummer': res[1], 'beschrijving': res[2], 'status': res[3], 'lastChange' : new Date(res[4] * 1000), 'id' : res[5]};
        })
      }
      return dict;
    },
    acceptRequest: function(id) {
      contract.acceptRequest(id, (error, value) => {
        console.log(error);
      })
    },
    denyRequest: function(id) {
      contract.denyRequest(id, (error, value) => {
        console.log(error);
      })
    }
  },
  render: h => h(App),
  router: router,
})
