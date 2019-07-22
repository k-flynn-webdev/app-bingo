<template>
	
	<section>

		<c-panel>

			<h1 
				slot="header" 
				class="colour-fill-dark"> 
					Welcome to <wbr> BS-Bingo 
			</h1>

			<p class="text text-left"> BS-Bingo is a fun party game designed to be played during large events, that funny tv show or those boring office meetings. Enjoy. </p>

			<c-button-row>

				<template slot="label"> How to play </template>

				<p class="text text-left">
					When you hear a word or phrase that's in your board, select it. Once you have more than 6 you could be a winner depending on who else is playing!
				</p>

			</c-button-row>


			<c-button-row>

				<template slot="label"> What do you need </template>

				<p class="text text-left">
					Creating a board takes no time at all.
					All you need is a catchy name and at least 8 common words or phrases.

					<br>
					<br>

					To make it more fun it's reccomended to have far more as everyone who plays gets a random selection each time.

					<br>
					<br>

					Once you've created a board, you'll be sent to it's lobby from there you can play and share it with friends.

				</p>

			</c-button-row>

			<div class="br-small"></div>

			<div class="text-left buttons">

				<c-button
					v-bind:onClick=button_create>
					Create
				</c-button>

				<span class="text colour-fill-dark button-helper">
					 and play with friends!
				</span>

			</div>	

		</c-panel>


		<c-panel>

			<div style="width:100%;">
				
				<c-front-latest style="width:50%;display:inline-block;"></c-front-latest>
				
				<c-front-popular style="width:50%;display:inline-block;"></c-front-popular>

			</div>

			<c-front-server-stats slot="footer"></c-front-server-stats>

		</c-panel>

	</section>

</template>

<script>
// @ is an alias to /src

import Latest from '../components/c_front_latest.vue';
import Popular from '../components/c_front_popular.vue';
import ServerStats from '../components/c_front_server_stats.vue';

import Button from '../components/c_button.vue';

import ButtonRow from '../components/c_button_row.vue';


import Panel from '../components/c_panel.vue';


export default {
	name: 'home',
	mounted(){
		let self = this;
		setTimeout( function(){
			self.$root.$emit('page-title', '');	
		}, .1*1000);
	},	
	methods : {
		button_create : function(){
			this.$router.push('/board/create/');
		},
	},
	components: {
		'c-panel' : Panel,
		'c-button' : Button,
		'c-button-row' : ButtonRow,
		'c-front-latest' : Latest,
		'c-front-popular' : Popular,
		'c-front-server-stats' : ServerStats,
	}
}
</script>
