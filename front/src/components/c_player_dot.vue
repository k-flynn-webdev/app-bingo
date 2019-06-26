<template>
		
	<div class="player-dot">
		{{ player.data.name }}
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
		},
		computed : {			
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
}

</style>

