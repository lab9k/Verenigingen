<template>
    <div id="lijst">
      <h2>{{ title }}</h2>
      <div class="search-wrapper">
        <input  @input="updateLijst" type="text" v-model="search" placeholder="Zoek naam.."/>
        <label>Search title:</label>
        <button v-on:click='toonAlle'>
          Alle verenigingen
        </button>
      </div>
      <div class="wrapper">
        <div class="lijst_item"
              v-bind:class="{ open: isActiveListItem }"
              v-on:click="isActiveListItem = !isActiveListItem"
              v-for="(item, index) in lijst"
              :key="index">
                <div class="name">
                    <label>Naam: </label>
                    {{ item.naam }}
                </div>
                <div class="ondernemingsnummer">
                    Ondernemingsnummer:
                    {{ item.ondernemingsnummer }}
                </div>
                <div class="description">
                    {{ item.beschrijving }}
                </div>
                <div class="status">
                    Status:
                    <div v-if="item.status == 1">{{ item.status }}</div>
                </div>
          </h1>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'lijst',
        data() {
            return {
                title: 'Lijst',
                isActiveListItem: false,
                lijst: []
            }
        },
        mounted: function(){
          this.lijst = Object.values(this.$root.verenigingList)
        },
        methods: {
          toonAlle: function(){
            this.lijst = Object.values(this.$root.verenigingList)
          },
          foldoutItemList: () => {
            var item = document.getElementById('item_list');
            item.classList.toggle('open');
          },
          updateLijst: function() {
            this.lijst = Object.values(this.$root.verenigingList).filter( (post) =>  {
              console.log(this);
              return post.naam.toLowerCase().includes(this.search.toLowerCase())
            })
          },
          editVereniging: function(id) {
            let naam = document.getElementById("edit-vereniging-naam").value;
            let beschrijving = document.getElementById("edit-vereniging-beschrijving").value;
            let ondernemingsnummer = document.getElementById("edit-vereniging-ondernemingsnummer").value;
            this.$root.editVereniging(id, naam, ondernemingsnummer, beschrijving)
          },
      }
    }
</script>
