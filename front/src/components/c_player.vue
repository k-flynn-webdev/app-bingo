<template>


	<div 
		class="hover-trigger"
		v-bind:class="{ 'hover-force' : state.display }">

			<div class="anim-6 hover-message-left text button-shadow">
				<p class="text colour-fill-bg">
					{{ player_name }}
				</p>
			</div>

			<c-button
				class="is-player"
				ref="btnPlayer"
				v-bind:onClick=clicked>

					<svg class="icon colour-fill-bg" height="100%" viewBox="0 0 286 301" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;margin:0;padding:0;">
						<path class="icon-path" d="M0.983,215.25l0,-1.555c0,-34.514 40.305,-63.859 96.27,-74.403c-18.879,-14.012 -31.122,-36.469 -31.122,-61.763c0,-42.426 34.444,-76.87 76.869,-76.87c42.425,0 76.869,34.444 76.869,76.87c0,25.294 -12.243,47.751 -31.122,61.763c55.965,10.544 96.27,39.889 96.27,74.403l0,1.555c-27.006,50.823 -80.498,85.463 -142.017,85.463c-61.519,0 -115.011,-34.64 -142.017,-85.463Z"/>
					</svg>

			</c-button>

			<div class="player-score">
				<p class="title colour-fill-bg-inv text-shadow">
					{{ player_Score }}
				</p>	
			</div>

	</div>
	
</template>

<script>

	import Button from '../components/c_button.vue';

	export default {
		name: 'cPlayer',
		data(){
			return {
				attrs : {
				},
				state : {
					display : false,
				},
			}
		},

		computed : {
			player_name : function(){
				return this.$store.getters['player/get_name'];
			},
			player_Score : function(){
				return this.$store.getters['player/get_score'];
			},
		},

		methods:{
			clicked : function(){
				this.$root.$emit('player.show');
			},

			trigger : function(){
				this.state.display = true;
				let self = this;
				setTimeout( function(){
					self.state.display = false;
				}, 2000 );
			},

			exit : function(){
				this.$root.$off('player.closed', this.trigger );
			},
		},
		mounted(){
			this.$root.$on('player.closed', this.trigger );
		},
		beforeDestroy(){
			this.exit();
		},
		components: {
			'c-button' : Button,
		},
}
</script>

<style scoped>

	.button.is-player {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

/*		box-shadow: 1px 3px 0 ;
		-webkit-box-shadow: 1px 3px 0 ;
		-moz-box-shadow: 1px 3px 0 ;*/

	}

	.is-player, .icon {
		width: 2.5rem !important;
		height: 2.5rem !important;
		margin: 0;
		padding: 0;
	}


	.player-score {
		position: absolute;
		top: .1rem;
		right: 3.25rem;
	}
	.player-score .title {
		transform: scale(1.4);
	}

	.icon-path {
		transform-origin: center top;
		transform: scale(1.2);
	}

</style>

<style>

	.is-player, .is-player .label {
		min-width: unset !important;
		min-height: unset !important;
	}

	.is-player .label {
		margin: 0;
	}

</style>
