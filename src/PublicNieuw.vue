<template>
    <div id="nieuw">
        <h2>{{ msg }}</h2>

        <form action="" class="add-vereniging-form">
            <label for="new-vereniging-naam">Naam vereniging</label>
            <input type="text" id="new-vereniging-naam">

            <label for="new-vereniging-beschrijving">Beschrijving</label>
            <input type="text" id="new-vereniging-beschrijving">

            <label for="new-vereniging-ondernemingsnummer">Ondernemingsnummer</label>
            <input type="text" id="new-vereniging-ondernemingsnummer">

            <label for="contactperson-name">Naam Contactpersoon</label>
            <input type="text" id="contactperson-name">

            <label for="contactperson-email">Emailadres</label>
            <input type="text" id="contactperson-email">

            <label for="contactperson-number">Telefoonnummer</label>
            <input type="text" id="contactperson-number">

            <button id="addVerenigingBtn" v-on:click="addVereniging">Voeg Toe!</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'nieuw',
    data() {
        return {
            msg: 'Voeg nieuwe vereniging toe'
        }
    },
    methods: {
        addVereniging: function() {
            let naam = document.getElementById("new-vereniging-naam").value;
            let ondernemingsnummer = document.getElementById("new-vereniging-ondernemingsnummer").value;
            let beschrijving = document.getElementById("new-vereniging-beschrijving").value;
            let contactNaam = document.getElementById("contactperson-name").value;
            let contactEmail = document.getElementById("contactperson-email").value;
            let contactNumber = document.getElementById("contactperson-number").value;
            let contactGegevens = `${contactNaam}|${contactEmail}|${contactNumber}`;
            this.$root.addVereniging(naam, ondernemingsnummer, beschrijving, contactGegevens);
        }
    }
}
</script>
