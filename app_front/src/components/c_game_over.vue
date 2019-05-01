<template>
	
	<c-popup class="game-over"
		v-if=game_state.over 
		v-bind:onClick=window_exit>

		<i slot="options"
			v-on:click=window_exit
			class="fas fa-window-close"></i>

		<div>

			<p class="game-over-text text-bold header text-small"> {{ game_state.winner }} </p>

		</div>


		<div slot="footer">
		</div>

	</c-popup>

</template>

<script>

	import Button from '../components/c_buttonNew.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';

	export default {
		name: 'cGameOver',
		data(){
			return {
			}
		},	
		props: {
			game_state : Object,
		},
		methods : {
			window_exit : function(){
				this.game_state.over  = false;
				this.$root.$emit('state_exit');
			},			
		},		
		mounted(){
		},
		components: {
			'c-button' : Button,
			'c-popup' : PopUp,			
			'c-message' : Message,
		},					
}

</script>

<style>
	
	.game-over {

	}
	.game-over header{
		border: none;
	}

	.game-over-text {
		/*font-size: 2rem;*/
	}

	.fa-window-close {
		font-size: 2.5rem;
		margin-right: .1rem;
	}

</style>

