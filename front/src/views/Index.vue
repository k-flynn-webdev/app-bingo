<template>
	
	<c-panel>
		<template slot="header">
			Bullshit Bingo
		</template>

		<c-front-latest></c-front-latest>
		
		<c-front-popular></c-front-popular>

		<c-front-wins-plays></c-front-wins-plays>
		<c-front-players></c-front-players>
		<c-front-games></c-front-games>


		<div class="admin-only">
			<br>
			<span class="text colour-fill-bg-inv">Cron Jobs:</span>
			<router-link 
				class="link title colour-on-focus colour-bg colour-fill-bg-inv" 
				to="/cron/instance/">
					clean
			</router-link>
		</div>


		<template slot="footer">
		</template>

	</c-panel>
	
</template>

<script>
// @ is an alias to /src

import Latest from '../components/c_front_latest.vue';
import Popular from '../components/c_front_popular.vue';
import WinsPlays from '../components/c_front_wins_plays.vue';
import Players from '../components/c_front_players.vue';
import Games from '../components/c_front_games.vue';

import Panel from '../components/c_panel.vue';


export default {
	name: 'home',
	components: {
		'c-panel' : Panel,
		'c-front-latest' : Latest,
		'c-front-popular' : Popular,
		'c-front-players' : Players,
		'c-front-games' : Games,
		'c-front-wins-plays' : WinsPlays,
	}
}
</script>
