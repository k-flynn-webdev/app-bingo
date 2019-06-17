<!-- <template>

	<div>
		<c-word
			v-for="(word, index) in board.words" 
			:key=word.key
			v-bind:wordData=word
			v-bind:state=state>
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


	import { submit } from '../mixins/h_submit.js';
	import Word from '../components/c_word.vue';


	export default {
		name: 'cBoard',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					words : {
						random : true,
						min_words_split : 22,
						count : 0,
					},
					server : {
						max_timeouts : 5,
						timing : 1000,
					},
					action : Object,
				},
				state : {
					timeouts : 0,
					ready : false,
					play : false,

					game :{
						won : false,
						lost : false,						
					},

				},
				board : {
					words : [],
				},
			}
		},	
		computed : {
		},
		methods : {
			init : function(){

				this.$root.$on('state_reset', this.reset );	
				this.$root.$on('state_play', this.play );
				this.$root.$on('game_finished', this.game_over );

				let board = this.$store.getters['game/get_instance'].data.board;
				if( board === ''){
					return;
				}

				let action = {
					url : ('/api/board/' + board),
					method : 'GET',
					JSON : false };

				this.attrs.action = action;

				let self = this;
				this.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);

			},

			board_success : function( input ){
				this.$store.dispatch('game/set_board', input.data);
				this.board_setup_words();
				this.ready( true );
			},
			board_error : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.ready( false );
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, null, null, self.board_success, self.board_error);
					}, self.attrs.server.timing );
				}

			},


			game_over : function( input ){
				if( input ){
					this.state.game.lost = false;
					this.state.game.won = true;
				} else {
					this.state.game.lost = true;
					this.state.game.won = false;
				}
			},
			create_word : function( word ){
				let tempWord = {
					word : word,
					selected : false,
					key : this.attrs.words.count,
				};
				this.attrs.words.count +=1;
				return tempWord;
			},
			board_setup_words : function(){			
				let board = this.$store.getters['game/get_board'];

				let random_array = array_randomize( board.data.words );

				let random_sorted = random_array.sort( array_sort );

				let clamped_array = array_clamp( random_sorted, board.data.game.display );

				for(let i=0;i<clamped_array.length;i++){
					let word = this.create_word(clamped_array[i]);
					this.$set(this.board.words, i, word);
				}
			},
			reset : function(){	
				console.log('game board: resetting.');
				this.board_setup_words();
			},
			ready : function( input ){
				if( this.state.ready !== input ){
					this.state.ready = input;
					console.log('board: ' + input );
					this.$root.$emit('state_board', input);					
				}
			},
			play : function( input ){
				this.state.play = input;
			},			
			exit : function(){
				this.$root.$off('init_board');
				this.$root.$off('state_reset');
				this.$root.$off('state_play');
				this.$root.$off('game_over');
				this.$root.$off('game_finished');
			},
			
		},
		mounted() {
			this.$root.$on('init_board', this.init );
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

</style>

 -->