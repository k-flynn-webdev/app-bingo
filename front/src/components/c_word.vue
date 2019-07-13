<template>
		
		<c-button
			ref="word_btn"
			class="word-button colour-bg-pop"
			v-bind:class="{ 'word-selected button-action' : selected, '' : waiting }"
			v-bind:onClick=toggle>

				{{ input.word }}

		</c-button>

</template>

<script>

	import Button from '../components/c_button.vue';

	export default {
		name: 'cWord',
		data(){
			return {
				state : {
					init : false,
				},
			}
		},	
		props: {
			input : Object,
		},
		computed : {
			waiting : function(){
				if( this.input.waiting ){
					if( this.state.init ){
						this.$refs.word_btn.$emit('state', 'waiting');
					}
					return true;
				} else {
					return false;
				}
			},
			selected : function(){
				if( this.input.selected ){
					if( this.state.init ){
						this.$refs.word_btn.$emit('state', 'success');
					}
					return true;
				} else {
					return false;
				}
			},
		},
		methods : {
			reset : function(){
				let self = this;
				setTimeout( function(){
					self.state.init = true;
					if( self.$refs.word_btn !== undefined ){
						self.$refs.word_btn.$emit('state', 'reset');	
					}
				}, 1);
			},

			toggle : function(){

				let toSend = {
					player : {
						url : '',
						word : {},
					},
				};

				if( !this.input.selected ){
					toSend.player.word = {
						add : this.input.word,
					}
				} else {
					toSend.player.word = {
						remove : this.input.word,
					}
				}

				this.$root.$emit('player.word', this.input, toSend );

			},

			exit : function(){
				this.$root.$off('player.words.reset', this.reset );
			}
		},
		mounted(){
			this.reset();
			this.$root.$on('player.words.reset', this.reset );
		},
		beforeDestroy(){
			this.exit();
		},
		components: {
			'c-button' : Button,
		},
}

</script>

<style>

	.word-selected {
		pointer-events: none;
	}

	.word-button{
		flex: none !important;
		height: unset !important;
		display: block;
		width: 100%;
		margin: .4rem 0;
	}

	.word-button p{
		margin: 0.2rem 1rem;
		color: var(--colour-dark);
		letter-spacing: unset !important;
		word-spacing: unset !important;
		text-transform: unset !important;
	}


	.word-button .strobe {
		background-color: lightgrey !important;
	}


	
/*
@media only screen and (max-width: 320px) {
	.word-button {
		width: calc(100% - 1rem);
	}
}


@media only screen and (max-width: 400px) {

}


@media only screen and (min-width: 600px) {
	.word-button {	
	}
}
*/


</style>

