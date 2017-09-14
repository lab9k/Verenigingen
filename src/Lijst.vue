<template>
    <div id="lijst">
        <div class="content">
            <h2>{{ title }}</h2>
            <div class="min-height">
                <div class="search-wrapper">
                    <input @input="updateLijst" type="text" v-model="search" placeholder="Search title.."/>
                </div>
                <div class="list-wrapper">
                    <div class="list_item"
                        v-bind:class="{ open: isActiveListItem }"
                        v-on:click="isActiveListItem = !isActiveListItem"
                        v-for="(item, index) in lijst"
                        :key="index">
                        <div class="border-left"></div>
                        <div class="name">
                            <strong>{{ item.naam }}</strong>
                        </div>
                        <div class="ondernemingsnummer">
                            Ondernemingsnummer:
                            {{ item.ondernemingsnummer }}
                        </div>
                        <div class="description">
                            {{ item.beschrijving }}
                        </div>
                        <div class="status">
                            <div>{{ item.status }}</div>
                            <img v-bind:src="'assets/' + item.status + '.svg'" alt="Accepted" title="Status">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <p>&copy Copyright - Lab9K</p>
            <p><a href="">GitHub</a></p>
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
                isActiveListItem: false,
                lijst: []
            }
        },
        methods: {
            foldoutItemList: () => {
                var item = document.getElementById('item_list');
                item.classList.toggle('open');
            },
            updateLijst: function() {
                this.lijst = Object.values(this.$root.verenigingList).filter( (post) =>  {
                    return post.naam.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        }
    }
</script>
