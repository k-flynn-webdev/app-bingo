<template>
		
	<div 
		class="hover-trigger player-dot colour-bg-inv"
		v-bind:class="{ 'is-player' : isPlayer, 'colour-bg-button' : isPlayer }">

			<div class="anim-6 hover-message text">
				<p class="text colour-fill-bg">
					{{ player.data.name }}
				</p>
			</div>

	</div>

</template>

<script>

	export default {
		name: 'cPlayerDot',
		data(){
			return {
			}
		},	
		props: {
			player : Object,
			isPlayer : Boolean,
		},
		computed : {	
			name_short : function(){
				let short = this.player.data.name.substring(0,2)
				return short;
			},				
		},
		methods : {
		},
		mounted(){
		},
		components: {
		},
}

</script>

<style>

	.player-dot {
		display: inline-block;
		margin-right: 0.5rem;
		width: 1rem;
		height: 2.5rem;
		border-radius: .4rem
	}

</style>

