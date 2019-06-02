<template>

	<div>

		<c-word
			v-for="(word, index) in words_list" 
			:key="word.id"
			v-bind:input=word>

<!-- 			<p class="title colour-fill-bg-inv">
				{{ word.word }}	
			</p> -->

		</c-word>

	</div>

</template>

<script>



let array_sort = function( a, b ){
	return b.length - a.length;
}
let array_clamp = function( input, clamp ){
	let new_array = [];
	let tempMax = Math.min( clamp, input.length );

	for( let count = 0; count < tempMax; count++){
		new_array.push(input[count]);
	}
	return new_array;
}
let array_randomize = function( input ){
	let new_array = [];
	for( let count = 0; count < input.length; count++){
		new_array.push(input[count]);
	}

	for( let count = new_array.length-1; count >= 0; count--){
		let random = Math.floor(Math.random() * (count + 1));
		let temp = new_array[count]
		new_array[count] = new_array[random];
		new_array[random] = temp;
	}

	return new_array;
}

let word_hash = function (str){
	let hash = 0;
	if (str.length == 0) return hash;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}


	import Word from '../components/c_word.vue';

	export default {
		name: 'cWords',
		data(){
			return {
			}
		},
		computed : {
			words_list : function(){
				return this.$store.getters['game/get_words'];
			},
		},
		methods : {
			setup : function(){

				console.log('setting up words');

				let words = []

				let display = this.$store.getters['board/get_display'];
				let tempWords = array_randomize(this.$store.getters['board/get_words']);

				for( let i = 0; i < display; i++){
					let newWord = {
						word : tempWords[i],
						waiting : false,
						selected : false,
						id : word_hash( tempWords[i] ),
					};
					words.push( newWord );	
				}

				this.$store.dispatch('game/set_words', words );
			},

			exit : function(){
				this.$store.dispatch('game/reset');
			},
		},
		mounted(){
			this.$root.$on('setup.words', this.setup );
		},
		beforeDestroy(){
			this.exit();
		},
		components: {
			'c-word' : Word,
		},
}

</script>

<style>
/*
	.word-block {
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




	.word-enter-active {
		animation: word-anim-in-out 0.5s both;
	}
	.word-leave-active {
		animation: word-anim-in-out 0.5s reverse both;
	}
	@keyframes word-anim-in-out {
		0% {
			transform: scale(0.3);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.words {
		margin: 1rem 0.1rem;
		text-align: left;
	}
	.word {
		text-align: center;
		/*position: relative;*/
		/*width: 50%;*/
		/*opacity: 1;*/
		/*display: inline-block;*/
		background-color: hsl(200,33%,90%);
		/*border-radius: 0;*/
		margin: 0.2rem;
		/*padding: 0 0.1rem;*/
		border: none;
		height: unset;
		/*transform: scale(0.3);*/
		/*opacity: 0.1;*/
	}
	.word.is-waiting{
		/*background-color: red;*/
		animation: word-anim-waiting 2s 1s infinite both;
	}
	@keyframes word-anim-waiting {
		0% {
			opacity: 1;
			/*background-color: hsla(100,30%,40%,1)*/
			/*transform: scale(0.3);*/
			/*opacity: 0;*/
		}
		50% {
			opacity: .1;
			/*background-color: red;*/
			/*transform: scale(0.3);*/
			/*opacity: 0;*/
		}		
		100% {
			opacity: 1;
			/*background-color: hsla(100,30%,40%,1)*/
			/*transform: scale(1);*/
			/*opacity: 1;*/
		}
	}

	.word.is-selected{
		background-color: hsl(100,60%,70%);
	}

</style>

