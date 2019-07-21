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

				<template slot="label"> How to play? </template>

				<p class="text text-left">
					When you hear a word or phrase that's in your board, select it. Once you have more than 6 you could be a winner depending on who else is playing!
				</p>

			</c-button-row>

			<div>

				<router-link class="link-text colour-fill-dark" to="/board/create">Create</router-link>

				<span class="text">
					 a board to play with friends!
				</span>

			</div>

		</c-panel>


		<c-panel>

			<div style="width:100%;">
				
				<c-front-latest style="width:50%;display:inline-block;"></c-front-latest>
				
				<c-front-popular style="width:50%;display:inline-block;"></c-front-popular>

			</div>

			<c-front-server-stats></c-front-server-stats>

		</c-panel>

	</section>

</template>

<script>
// @ is an alias to /src

import Latest from '../components/c_front_latest.vue';
import Popular from '../components/c_front_popular.vue';
import ServerStats from '../components/c_front_server_stats.vue';

import ButtonRow from '../components/c_button_row.vue';


import Panel from '../components/c_panel.vue';


export default {
	name: 'home',
	mounted(){
		let self = this;
		setTimeout( function(){
			self.$root.$emit('page.title', '');	
		}, .1*1000);
	},	
	components: {
		'c-panel' : Panel,
		'c-button-row' : ButtonRow,
		'c-front-latest' : Latest,
		'c-front-popular' : Popular,
		'c-front-server-stats' : ServerStats,
	}
}
</script>
