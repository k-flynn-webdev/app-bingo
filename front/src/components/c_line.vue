<template>
		
	<c-button
		ref="btn_line"
		class="line-button colour-bg-pop"
		v-bind:class="{ 'line-selected button-action' : selected, '' : waiting, 'is-half-line' : !input.is_large }"
		v-bind:onClick=toggle>

			{{ input.line }}

	</c-button>

</template>

<script>

	import Button from '../components/c_button.vue';

	export default {
		name: 'cLine',
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
						this.$refs.btn_line.$emit('state', 'waiting');
					}
					return true;
				} else {
					return false;
				}
			},
			selected : function(){
				if( this.input.selected ){
					if( this.state.init ){
						this.$refs.btn_line.$emit('state', 'success');
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
					if( self.$refs.btn_line !== undefined ){
						self.$refs.btn_line.$emit('state', 'reset');	
					}
				}, 1);
			},

			toggle : function(){

				let toSend = {
					player : {
						url : '',
						line : {},
					},
				};

				if( !this.input.selected ){
					toSend.player.line = {
						add : this.input.line,
					}
				} else {
					toSend.player.line = {
						remove : this.input.line,
					}
				}

				this.$root.$emit('player-line', this.input, toSend );

			},

			exit : function(){
				this.$root.$off('player-lines-reset', this.reset );
			}
		},
		mounted(){
			this.reset();
			this.$root.$on('player-lines-reset', this.reset );
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

	.line-selected {
		pointer-events: none;
	}

	.line-button {
		flex: none;
		height: unset;
		display: block;
		width: 100%;
		margin: .4rem 0;
	}

	.line-button.is-last-full-line {
		margin-bottom: 0.2rem !important;
	}


	.line-button.is-half-line {
		width: calc(50% - .25rem);
		margin: .2rem .05rem;
		padding: 0;
		display: inline-block;
	}



	.is-even .line-button.is-half-line:nth-of-type(2n) {
		margin-left: .3rem !important;
	}

	.is-odd .line-button.is-half-line:nth-of-type(2n) {
		margin-right: .3rem !important;
	}

	.line-button p {
		margin: 0.2rem 1rem;
		color: var(--colour-dark);
		letter-spacing: unset !important;
		word-spacing: unset !important;
		text-transform: unset !important;
	}


	.line-button .strobe {
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

