<template>

	<transition 
		name="word" 
		mode="out-in">
		
		<c-button
			ref="word_btn"
			v-bind:class="{ 'is-success-colour' : input.selected, 'is-waiting' : input.waiting }"
			v-bind:onClick=toggle>

				{{ input.word }}

		</c-button>

	</transition>

</template>

<script>

	import Button from '../components/c_button.vue';

	export default {
		name: 'cWord',
		data(){
			return {
				// attrs : {
				// 	wait : 100,
				// },
				// waiting : false,
			}
		},	
		props: {
			// state : Object,
			input : Object,
		},
		computed : {
			// waiting : function(){
				// if( this.input.waiting ){
				// 	this.$refs.word_btn.$emit('state', 'waiting');
				// } else {
				// 	this.$refs.word_btn.$emit('state', '');
				// }
				// return this.input.waiting;
			// },
			// word : function(){

				// if( this.state.game.won ){
				// 	return 'Won';
				// }
				// if( this.state.game.lost ){
				// 	return 'Lost';
				// }

				// return this.input.word;
			// },
		},
		methods : {
			reset : function(){
				if( this.$refs.word_btn !== undefined ){
					this.$refs.word_btn.$emit('state', '');	
				}
			},
			// init : function(){
			// 	this.$root.$on('state_reset', this.reset );
			// },
			// reset : function(){
			// 	this.wordData.selected = false;
			// },

			add : function(){
				// let toSend = {
				// 	player : {
				// 		url : '',
				// 		word : {
				// 			add : this.wordData.word,
				// 		},
				// 	},
				// };
				// this.submit(toSend, 'add');
			},
			remove : function(){
				// let toSend = {
				// 	player : {
				// 		url : '',
				// 		word : {
				// 			remove : this.wordData.word,
				// 		},
				// 	},
				// };
				// this.submit(toSend, 'remove');
			},



			// submit : function( toSend, type ){
			// 	this.waiting = true;

			// 	let player = this.$store.getters['game/get_player'];
			// 	toSend.player.url = player.url;

			// 	if( type === 'add' ){
			// 		this.$root.$emit('state_player_submit',
			// 			toSend, 
			// 			this.send_success, 
			// 			this.send_fail );
			// 	} 
			// 	if( type === 'remove' ){
			// 		this.$root.$emit('state_player_submit',
			// 			toSend, 
			// 			this.send_success, 
			// 			this.send_fail );
			// 	} 

			// },		
			// send_success : function( input ){
			// 	this.waiting = false;

			// 	if( input.data.word !== undefined 
			// 		&& input.data.word.add !== undefined ){

			// 			this.wordData.selected = true;
			// 			this.$store.dispatch('game/word_add', input.data );
			// 	}

			// 	if( input.data.word !== undefined 
			// 		&& input.data.word.remove !== undefined ){

			// 			this.wordData.selected = false;
			// 			this.$store.dispatch('game/word_remove', input.data );
			// 	}				

			// },

			// send_fail : function( input ){

			// 	if(	input.status == 401 
			// 		&& input.message == 'Game has been won.'
			// 		&& input.win !== undefined 
			// 		&& input.win ){
					
			// 			// alert game is over to game state?
			// 			this.$root.$emit('instance_update');
			// 			// force an immediate update to get winner and state of game!
			// 	}
			// 	this.waiting = false;			
			// },

			toggle : function(){

				// emit a submit request?

				// wait on result and it should cascade down?
				
				// this.input.waiting = true;
				// this.$refs.word_btn.$emit('state', 'waiting');

				let toSend = {
					player : {
						url : '111',
						word : {},
					},
				};


				if( !this.input.waiting ){
					this.$refs.word_btn.$emit('state', 'waiting');
				}

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
				
				

				// this.input.selected = !this.input.selected;
				// if( this.state.play ){
					// if( this.input.selected ){
						// this.input.selected = false;
						// this.remove();
					// } else {
						// this.add();
					// }
				// }
			},

			// exit : function(){
				// this.$root.$off('state_reset');
			// },
		},
		mounted(){
			this.$root.$on('reset', this.reset );
		},
		beforeDestroy(){
			// this.exit();
		},
		components: {
			'c-button' : Button,
		},
}

</script>

<style>

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

