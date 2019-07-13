<template>
		
	<div 
		class="hover-trigger player colour-fill-pop">

			<div 
				class="diamond" 
				v-bind:class="{ 'colour-bg-pop' : isPlayer }"></div>

			<div class="anim-6 title hover-message colour-bg-pop">
				<p class="text-bold colour-fill-dark">
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

	.player {
		display: inline-block;
		margin: 0;
		padding: 0;		
		margin-right: var(--margin);
		backface-visibility: hidden;
	}

	.diamond {
		margin: 0;
		padding: 0;
		transform: rotateZ(45deg);
		width: 1rem;
		height: 1rem;
		border: 3px solid var(--colour-pop);
		box-sizing: border-box;	
	}

</style>

