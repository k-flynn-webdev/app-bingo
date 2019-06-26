<template>
	
	<div class="players">

		<transition-group name="player-dots">

			<c-player-dot
				v-for="(player, index) in players" 
				v-bind:key="player.url"
				v-bind:isPlayer=check_isPlayer(player)
				v-bind:player=player>
			</c-player-dot>

		</transition-group>

	</div>
	
</template>

<script>

	import PlayerDot from '../components/c_player_dot.vue';

	export default {
		name: 'cPlayers',
		data(){
			return {
				attrs : {
				},
			}
		},

		computed : {
			player_url : function(){
				return this.$store.getters['player/get_url'];
			},
			players : function(){
				return this.$store.getters['instance/get_instance'].data.players;
			},
		},

		methods:{
			check_isPlayer : function( input ){
				if( this.player_url === input.url ){
					return true;
				}
				return false;
			},
		},
		mounted(){
		},
		beforeDestroy(){
		},
		components: {
			'c-player-dot' : PlayerDot,
		},
}
</script>

<style scoped>

	.players {
		position: absolute;
		top: 0;
		left: 0;
		/*width: 100%;*/
		/*height: 2rem;*/
		/*background-color: limegreen;*/
	}
	


</style>

<style>


	.player-dots {
		backface-visibility: hidden;
	}
	.player-dots-move .person{
		transform: scale(1.33);
	}

	/* appear at */
	.player-dots-enter{
	}
	.player-dots-move{
		transition: transform 1s ease !important;
	}	
	/* appearing */
	.player-dots-enter-active{
		animation: anim-person-enter var( --anim-time-3 ) backwards;
	}
	/* disappear to */
	.player-dots-leave-to{
	}
	/* disappearing */
	.player-dots-leave-active{
		animation: anim-person-enter var( --anim-time-3 ) reverse forwards;
	}
	@keyframes anim-person-enter {
		0% { 
			transform: scale(0.75) translateX(2rem);
			opacity: 0;
		}
		100% { 
			transform: scale(1) translateX(0); 
			opacity: 1;
		}
	}

</style>
