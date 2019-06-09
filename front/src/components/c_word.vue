<template>
		
		<c-button
			ref="word_btn"
			class="word-button"
			v-bind:class="{ 'word-selected' : selected, 'word-waiting' : waiting }"
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

				this.$root.$emit('word', this.input, toSend );

			},

			exit : function(){
				this.$root.$off('words.reset', this.reset );
			}
		},
		mounted(){
			this.reset();
			this.$root.$on('words.reset', this.reset );
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

	.word-button{
		flex: none !important;
		height: unset !important;
		background-color: var(--colour-inv);
		background-color: hsla(35,50%,75%,1);;
	}
	.word-button p{
		color: var(--colour);
	}
/*	.button.is-selected{
		background-color: green !important;
	}*/


/*	.word-block {
		display: inline-block;
		position: relative;
		min-width: 3rem;
	}

	.word-content {
		transition: 1s ease;
		text-align: center;
		padding: 0.5rem 0.75rem;
		font-size: 0.8rem;
	}
	.word-block:hover .word-content {
		transform: scale(1.075);
	}


@media only screen and (max-width: 400px) {	

}

@media only screen and (max-width: 320px) {
	.word-block {
		display: block;
		min-width: 80%;
	}
	.word-content {
		font-size: 1rem;
	}
}

@media only screen and (min-width: 600px) {

}
*/





	/*.word-square:after {*/
		/*content: "";*/
		/*display: block;*/
		/*padding-bottom: 5rem;*/
		/*padding-bottom: 100%;*/
	/*}*/




	/*.word-enter-active {*/
		/*animation: word-anim-in-out 0.5s both;*/
	/*}*/
	/*.word-leave-active {*/
		/*animation: word-anim-in-out 0.5s reverse both;*/
	/*}*/
	/*@keyframes word-anim-in-out {*/
		/*0% {*/
			/*transform: scale(0.3);*/
			/*opacity: 0;*/
		/*}*/
		/*100% {*/
			/*transform: scale(1);*/
			/*opacity: 1;*/
		/*}*/
	/*}*/

	/*.words {*/
		/*margin: 1rem 0.1rem;*/
		/*text-align: left;*/
	/*}*/
	/*.word {*/
		/*text-align: center;*/
		/*position: relative;*/
		/*width: 50%;*/
		/*opacity: 1;*/
		/*display: inline-block;*/
		/*background-color: hsl(200,33%,90%);*/
		/*border-radius: 0;*/
		/*margin: 0.2rem;*/
		/*padding: 0 0.1rem;*/
		/*border: none;*/
		/*height: unset;*/
		/*transform: scale(0.3);*/
		/*opacity: 0.1;*/
	/*}*/
	/*.word.is-waiting{*/
		/*background-color: red;*/
		/*animation: word-anim-waiting 2s 1s infinite both;*/
	/*}*/
	/*@keyframes word-anim-waiting {*/
		/*0% {*/
			/*opacity: 1;*/
			/*background-color: hsla(100,30%,40%,1)*/
			/*transform: scale(0.3);*/
			/*opacity: 0;*/
		/*}*/
		/*50% {*/
			/*opacity: .1;*/
			/*background-color: red;*/
			/*transform: scale(0.3);*/
			/*opacity: 0;*/
		/*}		*/
		/*100% {*/
			/*opacity: 1;*/
			/*background-color: hsla(100,30%,40%,1)*/
			/*transform: scale(1);*/
			/*opacity: 1;*/
		/*}*/
	/*}*/

/*	.word.is-selected{
		background-color: hsl(100,60%,70%);
	}
*/
</style>

