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
            <div class="border-left"></div>
            <div class="name" v-on:click.self="toggleCollapse(item.id)">
              <strong>{{ item.naam }}</strong>
            </div>
            <div class="ondernemingsnummer">
              Ondernemingsnummer:
              <span>{{ item.ondernemingsnummer }}</span>
            </div>
            <div class="description">{{ item.beschrijving }}</div>
            <button v-on:click='$root.acceptRequest(item.id)'>
              goedkeuren
            </button>
            <button v-on:click='$root.denyRequest(item.id)'>
              afkeuren
            </button>
            <button v-on:click="changeToInput">edit</button>
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
    changeToInput: (event) => {
      event.preventDefault();
      let editBtn = event.target;
      let parent = editBtn.parentNode;
      let childNodes = parent.childNodes;
      let nameField, descriptionField, numberField;
      let oldName, oldDescription, oldNumber;
      for (let i = 0; i < childNodes.length; i++) {
        let node = childNodes[i];
        if (node.className == "name") {
          oldName = node;
          nameField = document.createElement("input");
          nameField.setAttribute("class", "name");
          nameField.setAttribute("value", node.childNodes[0].innerHTML);
          parent.replaceChild(nameField, node);
        }
        if (node.className == "description") {
          oldDescription = node;
          descriptionField = document.createElement("input");
          descriptionField.setAttribute("class", "description");
          descriptionField.setAttribute("value", node.innerHTML);
          parent.replaceChild(descriptionField, node);
        }
        if (node.className == "ondernemingsnummer") {
          oldNumber = node;
          numberField = document.createElement("input");
          numberField.setAttribute("class", "ondernemingsnummer");
          numberField.setAttribute("value", node.childNodes[1].innerHTML);
          parent.replaceChild(numberField, node);
        }
      }
      let applyBtn = document.createElement("button");
      applyBtn.innerHTML = "apply";
      applyBtn.addEventListener("click", (event) => {
        console.log("TODO: call editVereniging!");
      });
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
    editVereniging: function(id) {
      let naam = document.getElementById("edit-vereniging-naam").value;
      let beschrijving = document.getElementById("edit-vereniging-beschrijving").value;
      let ondernemingsnummer = document.getElementById("edit-vereniging-ondernemingsnummer").value;
      this.$root.editVereniging(id, naam, ondernemingsnummer, beschrijving)
    },
  }
}
</script>
