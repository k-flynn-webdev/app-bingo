<template>
	
	<div class="hover-trigger" style="position:relative;">
		
		<c-button
			class="is-player"
			ref="btnPlayer"
			v-bind:onClick=clicked>

				<svg class="icon colour-fill-bg" height="100%" viewBox="0 0 286 301" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;margin:0;padding:0;">
					<path class="icon-path" d="M0.983,215.25l0,-1.555c0,-34.514 40.305,-63.859 96.27,-74.403c-18.879,-14.012 -31.122,-36.469 -31.122,-61.763c0,-42.426 34.444,-76.87 76.869,-76.87c42.425,0 76.869,34.444 76.869,76.87c0,25.294 -12.243,47.751 -31.122,61.763c55.965,10.544 96.27,39.889 96.27,74.403l0,1.555c-27.006,50.823 -80.498,85.463 -142.017,85.463c-61.519,0 -115.011,-34.64 -142.017,-85.463Z"/>
				</svg>

		</c-button>

		<div 
			class="hover"
			v-bind:class="{ 'trigger' : state.display }">

			<div style="position: relative;pointer-events:none;">
	
				<p class="anim-6 hover-message text colour-fill-bg">
					{{ player_name }}
				</p>

			</div>

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
				return this.$store.getters['player/get_player'].data.name;
			},
		},

		methods:{
			clicked : function(){
				this.$root.$emit('player.show');
			},

			trigger : function(){
				console.log('player hide triggered');
				this.state.display = true;
				let self = this;
				setTimeout( function(){
					self.state.display = false;
				}, 2000 );
			},

			exit : function(){
				this.$root.$off('player.closed', this.trigger );
			// 	this.$root.$off('player.hide', this.window_hide );
			// 	this.$root.$off('player.message', this.message );
			},
		},
		mounted(){
			this.$root.$on('player.closed', this.trigger );
			// this.$root.$on('player.hide', this.window_hide );
			// this.$root.$on('player.message', this.message );
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
		margin-right: 1.5rem !important;
		box-sizing: border-box;
	}

	.is-player, .icon {
		width: 2.5rem !important;
		height: 2.5rem !important;
		margin: 0;
		padding: 0;
	}

	.icon-path {
		transform-origin: center top;
		transform: scale(1.2);
	}

	.hover {
		position: absolute;
		right: calc(2rem);
		top: 1rem;
		z-index: 10;
		margin: 0;
		padding: 0;
	}
	.hover-message {
		position: absolute;
		right: 0;
		margin: 0;
		opacity: 0;
		padding: 0 0.5rem;
		border-radius: .5rem;
		background-color: var(--colour-inv);
		pointer-events: none;
	}
	.hover-trigger:hover .hover-message, .trigger .hover-message{
		opacity: 1;
		transform: translateX(-1.75rem) translateY(1.75rem);
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
