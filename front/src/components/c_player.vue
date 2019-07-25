<template>


	<div 
		class="hover-trigger player-holder"
		v-bind:class="{ 'hover-force' : state.display }">

			<div 
				class="anim-6 title hover-message-left colour-bg-pop" 
				style="top:45%;">
					<p class="text-bold colour-fill-dark">
						{{ player_name }}
					</p>
			</div>

			<button 
				ref="btnPlayer"
				v-on:click=clicked
				class="button icon shadow colour-bg-pop border-round border-white"
				style="width:2.8rem;height:2.6rem;overflow:hidden;">

					<svg
						class="colour-fill-dark"
						height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" 
						style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
							<path d="M4.436,172.579l62.363,-23.596l-15.606,-20.474l-11.002,-28.915l13.389,-56.973l36.424,-14.683l48.755,11.309l15.538,37.685l-6.367,48.426l-13.447,23.031l56.502,21.922l9.015,29.689l-200,0l4.436,-27.421Z"/>
					</svg>

			</button>

			<div class="player-score">
				<p class="poster colour-fill-pop text-right">
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
				this.$root.$emit('player-show');
			},

			trigger : function(){
				this.state.display = true;
				let self = this;
				setTimeout( function(){
					self.state.display = false;
				}, 2000 );
			},

			exit : function(){
				this.$root.$off('player-closed', this.trigger );
			},
		},
		mounted(){
			this.$root.$on('player-closed', this.trigger );
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

	.player-holder {
		position: absolute;
		right: 0;
	}

	.player-score {
		position: absolute;
		top: -.1rem;
		right: calc(100% + .5rem);
	}

</style>

<style>

</style>
