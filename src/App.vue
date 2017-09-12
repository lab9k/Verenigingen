<template>
  <div id="app">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ lijst }}</h1>
    <h2>Essential Links</h2>

    <input type="text" id="inputveld"/>
    <button v-on:click="search">
      zoek:
    </button>
    <button v-on:click="fetchVereniging" >
      Maar dan kunt ge er iets inzetten
    </button>
    <div class="add-vereniging-form">
      <label for="new-vereniging-naam">
        Naam:
        <input type="text" id="new-vereniging-naam">
      </label>
      <label for="new-vereniging-beschrijving">
        beschrijving:
        <input type="text" id="new-vereniging-beschrijving">
      </label>
      <label for="new-vereniging-ondernemingsnummer">
        Ondernemingsnummer:
        <input type="text" id="new-vereniging-ondernemingsnummer">
      </label>
      <button id="addVerenigingBtn" v-on:click="addVereniging">Voeg Toe!</button>
    </div>
    <div class="edit-vereniging-form">
      <label for="edit-vereniging-naam">
        Naam:
        <input type="text" id="edit-vereniging-naam">
      </label>
      <label for="edit-vereniging-beschrijving">
        beschrijving:
        <input type="text" id="edit-vereniging-beschrijving">
      </label>
      <label for="edit-vereniging-ondernemingsnummer">
        Ondernemingsnummer:
        <input type="text" id="edit-vereniging-ondernemingsnummer">
      </label>
      <button id="editVerenigingBtn" v-on:click="addVereniging">Voeg Toe!</button>
    </div>
    <div class="accept-deny">
      <label for="Vereniging-id">Id:</label>
      <input type="text" id="Vereniging-id" placeholder="10"></input>
      <button id="acceptRequestBTN" v-on:click="acceptRequest">Accept!</button>
      <button id="denyRequestBTN" v-on:click="denyRequest">Deny!</button>
    </div>
  </div>
</template>

<script>

const config = {
  dappInterface:[{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"acceptRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getVereniging","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"denyRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_naam","type":"string"},{"name":"_ondernemingsnummer","type":"string"},{"name":"_beschrijving","type":"string"}],"name":"addVereniging","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numVerenigingen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"checkIfAdmin","outputs":[{"name":"admin","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"_naam","type":"string"},{"name":"_ondernemingsnummer","type":"string"},{"name":"_beschrijving","type":"string"}],"name":"editVereniging","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"_naam","type":"string"},{"indexed":false,"name":"_ondernemingsnummer","type":"string"},{"indexed":false,"name":"_beschrijving","type":"string"},{"indexed":false,"name":"datetime","type":"uint256"}],"name":"addVerenigingEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"_naam","type":"string"},{"indexed":false,"name":"_ondernemingsnummer","type":"string"},{"indexed":false,"name":"_beschrijving","type":"string"},{"indexed":false,"name":"datetime","type":"uint256"}],"name":"editVerenigingEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"status","type":"uint8"},{"indexed":false,"name":"datetime","type":"uint256"}],"name":"statuschangedEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newAdmin","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"addAdminEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_Admin","type":"address"},{"indexed":false,"name":"dateTime","type":"uint256"}],"name":"removeAdminEvent","type":"event"}],

  contractAddress: "0x91bc4e5851b9cf25dac9a39f567fb94236c6dce0",
}
if (typeof web3 !== "undefined") {
  // Use MetaMask's provider
  window.web3 = new Web3(web3.currentProvider);
} else {
  alert("No web3? You should consider trying MetaMask!");
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
}
const contract = web3.eth.contract(config.dappInterface).at(config.contractAddress);
const verenigingList = []

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      lijst: verenigingList
    }
  },
  methods: {
    addVereniging: () => {
      let naam = document.getElementById("new-vereniging-naam").value;
      let beschrijving = document.getElementById("new-vereniging-beschrijving").value;
      let ondernemingsnummer = document.getElementById("new-vereniging-ondernemingsnummer").value;
      console.log(naam, beschrijving, ondernemingsnummer);
      contract.addVereniging(naam, ondernemingsnummer, beschrijving, (error, value) => {
        if (error) {
          console.log(error);
        } else {
          console.log(value);
        }
      });
    },
  editVereniging: () => {
      let naam = document.getElementById("edit-vereniging-naam").value;
      let beschrijving = document.getElementById("edit-vereniging-beschrijving").value;
      let ondernemingsnummer = document.getElementById("edit-vereniging-ondernemingsnummer").value;
      let id = document.getElementById("edit-vereniging-id").value;
      contract.editVereniging(id, naam, ondernemingsnummer, beschrijving, (error, value) => {
        if (error)
          console.log("error: ", error);
        else
          console.log("value: ", value);
      });
    },
    fetchVereniging: () => {
      verenigingList.splice(0,verenigingList.length)
      contract.numVerenigingen.call(function(err, res){
        for (var i = 0; i < res.c[0]; i++) {
          contract.getVereniging(i, (err, res) => {
            verenigingList.push(res);
          })
        }

      });
    },
    searchVereniging: function(keyword, list) {
        var results = []
        var rx = new RegExp('.*' + keyword + '.*');
        for (var woord of list){
          if (rx.test(woord[0])){
            results.push(woord)
          }
        }
      return results;
    },
    search: function() {
      console.log(this.searchVereniging(document.getElementById("inputveld").value, verenigingList))
    },
    acceptRequest: () => {
      let id = document.getElementById("Vereniging-id").value;
      console.log("Accept", id);
      contract.acceptRequest(id, (error, value) => {
        if (error) {
          console.log(error);
        } else {
          console.log(value);
        }
      })
    },
    denyRequest: () => {
      let id = document.getElementById("Vereniging-id").value;
      console.log("Deny", id);
      contract.denyRequest(id, (error, value) => {
        if (error) {
          console.log(error);
        } else {
          console.log(value);
        }
      })
    }
  }

}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
  height: 200px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
