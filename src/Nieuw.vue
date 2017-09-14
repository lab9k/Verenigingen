<template>
    <div id="nieuw">
        <h2>{{ msg }}</h2>

        <form action="" class="add-vereniging-form">
            <label for="new-vereniging-naam">Naam</label>
            <input type="text" id="new-vereniging-naam">

            <label for="new-vereniging-beschrijving">Beschrijving</label>				
            <input type="text" id="new-vereniging-beschrijving">

            <label for="new-vereniging-ondernemingsnummer">Ondernemingsnummer</label>				
            <input type="text" id="new-vereniging-ondernemingsnummer">

            <button id="addVerenigingBtn" v-on:click="addVereniging">Voeg Toe!</button>
        </form>
    </div>
</template>

<script>
    const config = {
        dappInterface: [{ "constant": false, "inputs": [{ "name": "_admin", "type": "address" }], "name": "removeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "acceptRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "getVereniging", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint8" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newAdmin", "type": "address" }], "name": "addAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }], "name": "denyRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_naam", "type": "string" }, { "name": "_ondernemingsnummer", "type": "string" }, { "name": "_beschrijving", "type": "string" }], "name": "addVereniging", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numVerenigingen", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_addr", "type": "address" }], "name": "checkIfAdmin", "outputs": [{ "name": "admin", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "_naam", "type": "string" }, { "name": "_ondernemingsnummer", "type": "string" }, { "name": "_beschrijving", "type": "string" }], "name": "editVereniging", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "_naam", "type": "string" }, { "indexed": false, "name": "_ondernemingsnummer", "type": "string" }, { "indexed": false, "name": "_beschrijving", "type": "string" }, { "indexed": false, "name": "datetime", "type": "uint256" }], "name": "addVerenigingEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "_naam", "type": "string" }, { "indexed": false, "name": "_ondernemingsnummer", "type": "string" }, { "indexed": false, "name": "_beschrijving", "type": "string" }, { "indexed": false, "name": "datetime", "type": "uint256" }], "name": "editVerenigingEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "status", "type": "uint8" }, { "indexed": false, "name": "datetime", "type": "uint256" }], "name": "statuschangedEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_newAdmin", "type": "address" }, { "indexed": false, "name": "dateTime", "type": "uint256" }], "name": "addAdminEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_Admin", "type": "address" }, { "indexed": false, "name": "dateTime", "type": "uint256" }], "name": "removeAdminEvent", "type": "event" }],

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

    export default {
        name: 'nieuw',
        data() {
            return {
                msg: 'Voeg nieuwe vereniging toe'
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
            }
        }
    }
</script>