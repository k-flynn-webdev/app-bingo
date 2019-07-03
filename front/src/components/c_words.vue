<template>

	<div 
		ref="wrds_holder"
		class="words-holder anim-6"
		v-bind:class="{ 'words-lock' : !is_ready, 'words-ready' : is_ready, }">

		<div ref="wrds_holder_inner">
			
			<transition-group name="anim-word" tag="div">

				<c-word
					v-for="(word, index) in words_list" 
					v-bind:key="word.id"
					v-bind:style=get_style_task(index)
					v-bind:input=word>

				</c-word>

			</transition-group>

		</div>

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
				timing : {
					delay_render : 1.66,
					delay_each_item : 250,
				},
				rendered : false,
			}
		},
		computed : {
			words_list : function(){
				return this.$store.getters['game/get_words'];
			},
			is_ready : function(){
				let gameMode = this.$store.getters['game/get_game'];
				if( gameMode.mode === 'playing' ){
					return true;
				} else {
					return false;
				}
			},
		},
		methods : {
			setup : function(){

				let words = []
				let display = this.$store.getters['instance/get_instance'].data.game.display;

				let tempWords = array_randomize( this.$store.getters['board/get_words'] );

				for( let i = 0; i < display; i++){
					let newWord = {
						word : tempWords[i],
						waiting : false,
						selected : false,
						id : word_hash( tempWords[i] ),
					};
					words.push( newWord );	
				}

				// now sort into smallest > largest
				words.sort( function(a,b){
					return b.word.length - a.word.length;	
				});

				let self = this;
				function delayStart( index, items ){
					setTimeout( function(){
						let tempArray = [];
						for( let a = 0; a < index; a++){
							tempArray.push( items[a] );
						}
						self.$store.dispatch('game/set_words', tempArray );

						// array of words finished .. set game ready!
						if( tempArray.length === display){
							self.$store.dispatch('game/set_game', {} );
						}

					}, index * self.timing.delay_each_item );
				}

				// delay dispatch
				let tDelay = self.timing.delay_render;

				if(!this.rendered){
					tDelay = 0;
					this.rendered = true;
				} else {
					this.$store.dispatch('game/set_words', [] );
				}

				setTimeout( function(){
					for( let a = 0; a <= words.length; a++){	
						delayStart(a, words);
					}
				}, tDelay * 1000);

			},

			get_style_task : function( index ){
				let inv = this.words_list.length - index;
				return { '--i' : index + 1, '--inv-i' : inv - 1 };
			},

			exit : function(){
				this.$store.dispatch('game/set_words', [] );
				this.$root.$off('player.words.reset', this.setup );
			},
		},
		mounted(){
			this.$root.$on('player.words.reset', this.setup );
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

.words-holder {
	display: block;
	flex: none;
	position: relative;
	min-height: 15rem;
	width: 100%;
}

.words-lock {
}
.words-ready {
}

.words-lock, .words-lock .button {
	pointer-events: none !important;
}	

.anim-word-enter {
	opacity: 0;
	transform: translateY(-1rem);
}
.anim-word-enter .label {
	opacity: 0;
	transform: translateX(-2rem);
}

.anim-word-leave, .anim-word-leave-to {
	animation: remove-task 1s ease calc( .1s * var(--inv-i) );
}
.anim-word-leave-to .label {
	opacity: 0;
	transition-delay: calc( .1s * var(--inv-i));
	transition-duration: .66s;
	transform: translateX(1rem);
}


.anim-word-move {
	transition: transform 1s ease !important;
}

@keyframes add-task {
	0% {
		opacity: 0;
		transform: translateY(-2rem);
	}		
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes remove-task {
	0% {
		opacity: 1;
		transform:  translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(2rem);
	}
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


</style>

