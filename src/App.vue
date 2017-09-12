<template>
  <div id="app">
    <img src="http://vuejs.org/images/logo.png">
    <h1>/{{ lijst }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/vueify" target="_blank">vueify</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
    <button v-on:click="fetchVereniging"/>
    <div class="add-vereniging-form">
      <label for="vereniging-naam">
        Naam:
        <input type="text" id="vereniging-naam">
      </label>
      <label for="vereniging-beschrijving">
        beschrijving:
        <input type="text" id="vereniging-beschrijving">
      </label>
      <label for="vereniging-ondernemingsnummer">
        Ondernemingsnummer:
        <input type="text" id="vereniging-ondernemingsnummer">
      </label>
      <button id="addVerenigingBtn" v-on:click="addVereniging">Voeg Toe!</button>
    </div>
  </div>
</template>

<script>
const config = {
  dappInterface:[{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"acceptRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getVereniging","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"denyRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_naam","type":"string"},{"name":"_ondernemingsnummer","type":"string"},{"name":"_beschrijving","type":"string"}],"name":"addVereniging","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"numVerenigingen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumVerenigingen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"checkIfAdmin","outputs":[{"name":"admin","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"_naam","type":"string"},{"name":"_ondernemingsnummer","type":"string"},{"name":"_beschrijving","type":"string"}],"name":"editVereniging","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],

  contractAddress: "0x94d7e46389d7d81a9ecdfbb2f0331f7f22c06edf",
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
      let naam = document.getElementById("vereniging-naam").value;
      let beschrijving = document.getElementById("vereniging-beschrijving").value;
      let ondernemingsnummer = document.getElementById("vereniging-ondernemingsnummer").value;
      console.log(naam, beschrijving, ondernemingsnummer);
      contract.addVereniging(naam, ondernemingsnummer, beschrijving, (error, value) => {
        if (error) {
          console.log(error);
        } else {
          console.log(value);
        }
      });
    },
    fetchVereniging: () => {
      verenigingList.splice(0,verenigingList.length)
      contract.getNumVerenigingen(function(err, res){
        for (var i = 0; i < res.c[0]; i++) {
          contract.getVereniging(i, (err, res) => {
            verenigingList.push(res);
          })
        }
      });
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
