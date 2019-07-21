<template>

	<div class="text">

		<br>

		<p v-if=stats.games.length class="title"> Games </p>

		<router-link 
			v-for="(game, index) in stats.games"
			v-bind:to="game_url(game)"
			class="link-text colour-fill-dark instance">{{ game }}</router-link>

		<hr>

		<span class="small">Players {{ stats.players }},</span>

		<div class="div-split"></div>

		<span class="small">games {{ stats.games.length }},</span>

		<div class="div-split"></div>

		<span class="small">played {{ stats.games_played }},</span>
		
		<div class="div-split"></div>

		<span class="small">won {{ stats.games_won }}.</span>


	</div>		

</template>

<script>

	import { submit } from '../mixins/h_submit.js';

	let counter = null;

	export default {
		name: 'cFrontServerStats',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					max_timeouts : 5,
					action : Object,
					timing : 5000,
				},
				state : {
					timeouts : 0,
				},
				stats : { 
					games_played : Number,
					games_won : Number,
					games : Array,
					players : Number,
				},
			}
		},

		methods : {

			game_url : function( input ){
				return '/instance/' + input;
			},

			init : function(){
				let action = {
					url : ('/meta/server/stats'),
					method : 'GET',
					JSON : false,
					body : '' };

				this.attrs.action = action;

				let self = this;
				this.onSubmit( self.attrs.action, self, null, null, self.success, self.error);
			},

			success : function( input ){
				this.stats = input.data;
			},
			error : function( input ){
				// todo this properly?
			},
		},
		mounted(){
			this.init();
		},	
}
</script>

<style scoped>

.instance {
	margin: .33rem;
}

.link-text {
	font-weight: 100;
}
	

</style>

