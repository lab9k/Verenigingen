<template>
	<div id="app">
		<div class="nav-bg">
				<a href="/"><img class="logo-white" src="assets/logo-verenigingen-white.svg" alt=""></a>
				<img class="triangle" src="assets/triangle-white.svg" alt="etecatcher">
		</div>
		<nav>
				<ul>
					<router-link to="/admin/lijst">Lijst</router-link>
					<router-link to="/admin/nieuw">Voeg toe</router-link>
					<router-link to="/contact">Contact</router-link>
				</ul>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	#app {
		text-align: center;
		position: relative;
	}
</style>
