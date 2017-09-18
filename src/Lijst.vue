	<template>
	<div id="lijst">
		<div class="content">
		<h2>{{ title }}</h2>
		<div class="min-height">
			<div class="search-wrapper">
			<input @input="updateLijst" type="text" v-model="search" placeholder="Search title.." />
			<a class="alleV"v-on:click='toonAlle'>
				Toon alle verenigingen
			</a>
			</div>
			<div class="list-wrapper">
			<div class="list_item" v-bind:class="{ open: (activeListItem == item.id), editing: (item.id == editingListItem)  }" v-on:click.self="toggleCollapse(item.id)" v-for="item in lijst" :key='parseInt(item.id)'>
				<div class="view">
					<div class="border-left" v-on:click.self="toggleCollapse(item.id)"></div>
					
					<div class="name" v-on:click.self="toggleCollapse(item.id)">
						<h3 v-on:click.self="toggleCollapse(item.id)">{{ item.naam }}</h3>
					</div>

					<div class="lastchanged">
						<span>Laatst geüpdatet:</span>
						<em>{{ timeAgo(item.lastChange) }}</em>
					</div>

					<div class="description">
						<em>{{ item.beschrijving }}</em>
						<div class="ondernemingsnummer">
							<span>ON:</span>
							<em>{{ item.ondernemingsnummer }}</em>
						</div>
					</div>

					<div class="status">
						<img v-bind:src="'assets/' + item.status + '.svg'" alt="Accepted" title="Status">
					</div>
					<div class="actions">
						<button class="y" v-on:click='$root.acceptRequest(item.id)'>
							Goedkeuren
						</button>

						<button class="n" v-on:click='$root.denyRequest(item.id)'>
							Afkeuren
						</button>

						<button class="e" v-on:click="editItem(item)">edit</button>
						
					</div>

				</div>
				<form class="edit">
					<div class="border-left" v-on:click.self="toggleCollapse(item.id)"></div>
					<div class="name" >
						<label>Naam</label>
						<input v-model="unsubmitted.naam"/>
					</div>
					<div class="ondernemingsnummerr">
						<label>Ondernemingsnummer</label>
						<input v-model="unsubmitted.ondernemingsnummer"/>
					</div>
					<div class="descriptionn">
						<label>Beschrijving</label>
						<textarea v-model="unsubmitted.beschrijving" rows="5"/>
					</div>
					<div class="status">
						<img v-bind:src="'assets/' + item.status + '.svg'" alt="Accepted" title="Status">
					</div>
					<div class="actions">
						<button class="y" v-on:click="editVereniging(item)">
							Opslaan
						</button>
						<button class="n" v-on:click='editItem(item)'>
							Ongedaan maken
						</button>
					</div>
				</form>
			</div>
			<em>ON: Ondernemingsnummer</em>
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
		editingListItem: -1,
		unsubmitted: {},
		lijst: []
		}
	},
	mounted: function() {
		this.lijst = Object.values(this.$root.verenigingList)
	},
	methods: {
		timeAgo: function(date) {
			var seconds = Math.floor((new Date() - date) / 1000);

			var interval = Math.floor(seconds / 31536000);

			if (interval > 1) {
				return interval + " jaren";
			}
			interval = Math.floor(seconds / 2592000);
			if (interval > 1) {
				return interval + " maanden";
			}
			interval = Math.floor(seconds / 86400);
			if (interval > 1) {
				return interval + " dagen";
			}
			interval = Math.floor(seconds / 3600);
			if (interval > 1) {
				return interval + " uren";
			}
			interval = Math.floor(seconds / 60);
			if (interval > 1) {
				return interval + " minuten";
			}
			return Math.floor(seconds) + " seconds";
		},
		editItem: function(item) {
			if (this.editingListItem == item.id) {
				this.editingListItem = -1,
				this.unsubmitted = {}
			} else {
				this.editingListItem = item.id,
				this.unsubmitted = Object.assign({}, item);
			}
		},
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
		editVereniging: function(item) {
			this.$root.editVereniging(item.id, this.unsubmitted.naam, this.unsubmitted.ondernemingsnummer, this.unsubmitted.beschrijving)
			this.editItem(item)
		},
	}
	}
	</script>
