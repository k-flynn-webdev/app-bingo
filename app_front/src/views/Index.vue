<template>
	
	<div class="center-auto-h width-90">

		<c-front-latest></c-front-latest>
		
		<c-front-popular></c-front-popular>

		<c-front-wins-plays></c-front-wins-plays>
		<c-front-players></c-front-players>
		<c-front-games></c-front-games>

		
<!-- 		<div>
			<p>Players playing right now:</p>
			<span>xx</span>
		</div> -->




	<!-- 	<h1 class="heading">Basic Vue site (client and server).</h1>

		<p class="title">A simple vue package with the goal of being secure via JsonWebTokens.</p>

		<br>

		<b class="text text-bold">Frameworks:</b>

		<ul class="text text-small" style="margin-left: 2rem;">	
			<li>Vuejs and VueX store.</li>
			<li>Node and Express for the server.</li>
			<li>Mongodb for the database.</li>
		</ul>

		<b class="text text-bold">Front Features:</b>

		<ul class="text text-small" style="margin-left: 2rem;">	
			<li>User login/register/logout page.</li>
			<li>User acount/edit/remove page.</li>

			<li>Admin request form.</li>
			<li>Admin dashboard.</li>

			<li>View last 30 days of user acccount activities.</li>
			<li>View/edit/remove all users.</li>
			<li>Review/reset all database items/collections.</li>
			<li>User secure token handled via VueX locally.</li>
		</ul>

		<b class="text text-bold">Server Features:</b>

		<ul class="text text-small" style="margin-left: 2rem;">	
			<li>Input validation on all form data.</li>
			<li>Request rate limiting.</li>
			<li>User/Admin validation on all routes via secure header/token.</li>
			<li>Token blacklisting.</li>
			<li>Unit test for all user interactions.</li>
		</ul>

		<p></p> -->



	<!-- 	How to get started: instructions:

		what does this solve/do? Whats it all about for me for the person using it?

		how do you upgrade?

		how is it secured/overall?
			(using middleware approach for passwards etc)
 -->



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
