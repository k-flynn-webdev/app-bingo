<template>
	
	<div class="center-auto-h width-90">


		<H1 
			class="header text-funky custom" style="margin-top:4.5rem;">
				Bullshit Bingo
		</H1>

		<c-front-latest></c-front-latest>
		
		<c-front-popular></c-front-popular>

		<c-front-wins-plays></c-front-wins-plays>
		<c-front-players></c-front-players>
		<c-front-games></c-front-games>

	</div>
	
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Latest from '../components/c_front_latest.vue';
import Popular from '../components/c_front_popular.vue';
import WinsPlays from '../components/c_front_wins_plays.vue';
import Players from '../components/c_front_players.vue';
import Games from '../components/c_front_games.vue';

export default {
	name: 'home',
	components: {
		'c-front-latest' : Latest,
		'c-front-popular' : Popular,
		'c-front-players' : Players,
		'c-front-games' : Games,
		'c-front-wins-plays' : WinsPlays,
	}
}
</script>
