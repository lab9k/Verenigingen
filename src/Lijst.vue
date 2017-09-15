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
          <div class="list_item" v-bind:class="{ open: (activeListItem == item.id) }" v-on:click.self="toggleCollapse(item.id)" v-for="item in lijst" :key='parseInt(item.id)'>
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
            <button v-on:click='$root.acceptRequest(item.id)'>
              goedkeuren
            </button>
            <button v-on:click='$root.denyRequest(item.id)'>
              afkeuren
            </button>
            <button v-on:click="changeToInput($event,item.id)">edit</button>
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
      lijst: [],
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
    changeToInput: function(event, id) {
      event.preventDefault();
      const self = this;
      let editBtn = event.target;
      let parent = editBtn.parentNode;
      let childNodes = parent.childNodes;
      let nameField, descriptionField, numberField;
      let oldName, oldDescription, oldNumber;
      for (let i = 0; i < childNodes.length; i++) {
        let node = childNodes[i];
        switch (node.className) {
          case "name":
            oldName = node;
            nameField = document.createElement("input");
            nameField.setAttribute("class", "name");
            nameField.setAttribute("value", node.childNodes[0].innerHTML);
            parent.replaceChild(nameField, node);
            break;
          case "description":
            oldDescription = node;
            descriptionField = document.createElement("input");
            descriptionField.setAttribute("class", "description");
            descriptionField.setAttribute("value", node.innerHTML);
            parent.replaceChild(descriptionField, node);
            break;
          case "ondernemingsnummer":
            oldNumber = node;
            numberField = document.createElement("input");
            numberField.setAttribute("class", "ondernemingsnummer");
            numberField.setAttribute("value", node.childNodes[1].innerHTML);
            parent.replaceChild(numberField, node);
            break;
          default:
            break;
        }
      }
      let applyBtn = document.createElement("button");
      applyBtn.innerHTML = "apply";
      parent.appendChild(applyBtn);

      let undoBtn = document.createElement("button");
      undoBtn.innerHTML = "undo";
      undoBtn.addEventListener("click", (event) => {
        parent.replaceChild(oldName, nameField);
        parent.replaceChild(oldDescription, descriptionField);
        parent.replaceChild(oldNumber, numberField);
        parent.replaceChild(editBtn, undoBtn);
        parent.removeChild(applyBtn)
      });
      parent.replaceChild(undoBtn, editBtn);
      applyBtn.addEventListener("click", (event) => {
        let naam = nameField.value;
        let ondernemingsnummer = numberField.value;
        let beschrijving = descriptionField.value;
        self.editVereniging(id, naam, ondernemingsnummer, beschrijving);
        parent.replaceChild(oldName, nameField);
        parent.replaceChild(oldDescription, descriptionField);
        parent.replaceChild(oldNumber, numberField);
        parent.replaceChild(editBtn, undoBtn);
        parent.removeChild(applyBtn);
      });
      //kill(myself);
      return false;
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
    editVereniging: function(id, naam, beschrijving, ondernemingsnummer) {
      this.$root.editVereniging(id, naam, ondernemingsnummer, beschrijving)
    },
  }
}
</script>
