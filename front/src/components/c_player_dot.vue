<template>
		
	<div 
		class="hover-trigger-dot player-dot colour-bg-inv" 
		style="position:relative;"
		v-bind:class="{ 'is-player' : isPlayer, 'colour-bg-button' : isPlayer }">

		<div 
			class="hover-dot">

			<div style="position: relative;pointer-events:none;">
	
				<p class="anim-6 hover-message text colour-fill-bg">
					{{ player.data.name }}
				</p>

			</div>

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

/*	.player-dot.is-player {
		background-color: yellow;
	}*/

	.hover-dot {
		z-index: 10;
		margin: 0;
		padding: 0;
		position: relative;
	}
	.hover-message {
		position: absolute;
		right: -50%;
		margin: 0;
		opacity: 0;
		padding: 0 0.5rem;
		border-radius: .5rem;
		background-color: var(--colour-inv);
		pointer-events: none;
		transform: translateX(50%) translateY(0);
	}
	.hover-trigger-dot:hover .hover-message {
		opacity: 1;
		transform: translateX(50%) translateY(3rem);
	}

</style>

