<template>
  <div id="lijst">
    <div class="content">
      <h2>{{ title }}</h2>
      <div class="min-height">
        <div class="search-wrapper">
          <input @input="updateLijst" type="text" v-model="search" placeholder="Search title.." />
          <button v-on:click='toonAlle'>
            Alle verenigingen
          </button>
        </div>
        <div class="list-wrapper">
          <div class="list_item" v-bind:class="{ open: (activeListItem == item.id), editing: (item.id == editingListItem)  }" v-on:click.self="toggleCollapse(item.id)" v-for="item in lijst" :key='parseInt(item.id)'>
            <div class="view">
              <div class="border-left" v-on:click.self="toggleCollapse(item.id)"></div>
              <div class="name" v-on:click.self="toggleCollapse(item.id)">
                <strong v-on:click.self="toggleCollapse(item.id)">{{ item.naam }}</strong>
              </div>
              <div class="ondernemingsnummer">
                Ondernemingsnummer:
                <span>{{ item.ondernemingsnummer }}</span>
              </div>
              <div>
                {{item.lastChange}}
              </div>
              <div class="description">{{ item.beschrijving }}</div>
              <div class="status">
                <img v-bind:src="'assets/' + item.status + '.svg'" alt="Accepted" title="Status">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>&copy Copyright - Lab9K</p>
      <p>
        <a href="">GitHub</a>
      </p>
      <div class="partners">
        <a href="https://lab9k.github.io/" target="_blank"><img src="assets/partners/partner-lab9k.svg" alt=""></a>
        <a href="https://stad.gent" target="_blank"><img src="assets/partners/partner-stadgent.svg" alt=""></a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'lijst',
  data() {
    return {
      title: 'Lijst',
      activeListItem: -1,
      lijst: []
    }
  },
  mounted: function() {
    this.lijst = Object.values(this.$root.verenigingList)
  },
  methods: {
    toggleCollapse: function(id) {
      if (this.activeListItem == id) {
        this.activeListItem = -1
      } else {
        this.activeListItem = id
      }
    },
    toonAlle: function() {
      this.lijst = Object.values(this.$root.verenigingList)
    },
    foldoutItemList: () => {
      var item = document.getElementById('item_list');
      item.classList.toggle('open');
    },
    updateLijst: function() {
      this.lijst = Object.values(this.$root.verenigingList).filter((post) => {
        return post.naam.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  }
}
</script>
