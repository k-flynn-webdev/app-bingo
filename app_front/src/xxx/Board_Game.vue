<template>

	<c-panel>

		<template slot="header">
			<p v-if=!state.ready class="title"> Play Bingo! </p>
			<p v-else class="title"> {{ board_name }} {{ player_name }} </p>
		</template>


		<c-win-player-join></c-win-player-join>

		<c-game-state></c-game-state>
		<c-game-poll></c-game-poll>




















<!-- 		<div slot="options">
			<p class="score text text-light"> 
				{{ board_score }}
			</p>			

			<p class="timer text text-light"> 
				{{ board_time }}
			</p>
		</div> -->

<!-- 		<div 
			slot=no-margin 
			class="bingo-board"
			v-bind:class="{ 'is-won' : state.game.won, 'is-almost' : state.game.almost, 'is-lost' : state.game.lost }">

			<c-message ref="messageSrv"></c-message>

			<transition 
				name="load" 
				mode="out-in">

				<div 
					v-if=state.board.loading
					class="load-icon">
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
					<p class="load-icon-el delay-2"></p>
				</div>

			</transition>	 -->				

			<!-- <div	 -->
				<!-- v-if=state.board.ready> -->





















				<c-word
					v-for="(word, index) in board_words" :key=word.count
					v-bind:onClick=set_word_click(index)
					v-bind:class="{ 'is-selected' : word.selected }">

						<p > {{ word.word }} </p>
	
				</c-word>











			<!-- </div> -->

		<!-- </div>	 -->
			










			
			
		<div slot="footer">

			<c-button
				v-if=state.ready
				ref="resetBtn" 
				v-bind:onClick=reset>
					Try Again?
			</c-button>

			<c-button
				v-if=state.ready
				ref="avatarBtn" 
				v-bind:onClick=change_player>
					Player
			</c-button>

		</div>

	</c-panel>

</template>

<script>

	import Button from '../components/c_buttonNew.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';
	import Word from '../components/c_word.vue';

	import PlayerJoin from '../components/c_window_player_join.vue';
	
	import GamePoll from '../components/c_game_poll.vue';
	import GameState from '../components/c_game_state.vue';

	import { submit } from '../mixins/h_submit.js';

	let counter = null;

	export default {
		name: 'BoardGame',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					random : true,
					max_timeouts : 5,
					max_tiles : 20,
				},
				state : {
					timeouts : 0,
					init : false,
					loading : false,
					playerSetup : false,
					playerJoined : false,
					ready : false,
				},
				game : {
					almost : false,
					won : false,
					lost : false,
				},
				// board : {
				// 	words : [],
				// }

				
				// dataCopy : Object,
				// random : true,
				// show : 0.77,
				// max : 20,
				// almost : 0.5,
				// win : 0.6,
				// state : {
				// 	board : {
				// 		loading : false,
				// 		ready : false,	
				// 	},
								
				// },

				// board : {
				// 	name : '',
				// 	owner : '',
				// 	date : {
				// 		created : new Date(),
				// 	},
				// 	words : [],
				// 	url : '',
				// 	size : 0,
				// 	progress : {
				// 		start : new Date(),
				// 		playing : false,
				// 		time : 0,
				// 		time_display : '0',
				// 	},	
				// 	score : {
				// 		current : 0,
				// 		almost : 0,
				// 		win : 0,
				// 	},
				// },	
			}
		},	
		computed : {
			// board_time : function(){
			// 	return this.board.progress.time_display;
			// },
			// board_score : function(){
			// 	return this.board.score.current + '/' + this.board.score.win;
			// },
			player_name : function(){
				return this.$store.getters['game/get_player'].name;
			},			
			board_name : function(){
				return this.$store.getters['game/get_board'].name;
			},	
			board_words : function(){
				let tempWords = this.$store.getters['game/get_board'].words;
				let temp = this.attrs.random ? this.randomise_words( tempWords ) : tempWords;
				let words = [];
				let maxTileSize = Math.min( this.attrs.max_tiles , temp.length);
				for( let count=0;count<maxTileSize;count++){
					let newWord = { word : temp[count], selected : false };
					words.push( newWord );
				}
				return words;
			},

		},	
		methods:{
			reset : function(){
				this.game_exit();
				this.init();
			},
			randomise_words : function( input ){
				// copy array 
				// let tempArray = input.slice(0); // wierd issue?
				let tempArray = [];
				for( let i = 0; i < input.length; i++){
					tempArray.push( input[i] );
				}
				// randomize
				for( let count = tempArray.length-1; count >= 0; count--){
					let random = Math.floor(Math.random() * (count + 1));
					let temp = tempArray[count]
					tempArray[count] = tempArray[random];
					tempArray[random] = temp;
				}
				return tempArray;		
			},
			init : function(){

				if( !this.state.init ){
					let object = {
						url : ('/api/instance/' + this.$route.params.instance),
						method : 'GET',
						JSON : true,
						body : '' };

					this.onSubmit( object, this, null, null, this.init_onSuccess, this.init_onError);
				}

			},
			init_onSuccess : function( input ){
				this.state.init = true;
				this.$store.dispatch('game/init_game', input.data);
				this.$store.dispatch('game/set_instance', input.data);
				let self = this;
				setTimeout( function(){
					self.board_init();
				}, 500);
			},
			init_onError: function( input ){
				this.state.timeouts +=1;
				if( this.state.timeouts <= this.attrs.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.init();
					}, 2000);
				}
			},
			player_init : function(){
				let playerTemp = this.$store.getters['game/get_player'];
				if( playerTemp.name.length < 1 ){
					this.change_player();
				}
			},
			change_player : function(){
				this.$root.$emit('showPlayerJoin', this.$refs.avatarBtn );
			},			
		
			board_init : function(){
				if( !this.state.loading ){
					let object = {
						url : ('/api/board/' + this.$store.getters['game/get_ids'].board),
						method : 'GET',
						JSON : false,
						body : '' };

					this.onSubmit( object, this, null, null, this.board_success, this.board_fail);
				}
			},
			board_success : function( input ){
				
				this.$store.dispatch('game/set_board', input.data);
				let self = this;
				setTimeout( function(){
					self.player_init();
					self.game_start();
					// has player joined? if not popup window?
					// this.board.words = 
					// console.log( self.$store.getters['game/get_board'] );
				}, 100);				
			},
			board_fail : function(){
				this.state.timeouts +=1;
				this.state.loading = false;
				if( this.state.timeouts <= this.max.timeouts ){
					let self = this;
					setTimeout( function(){
						self.board_init();
					}, 2000);
				}
			},				
			game_start : function(){
				console.log('gamestarting in ...');
				let self = this;
				setTimeout( function(){
					console.log('3');
				}, 1000);
				setTimeout( function(){
					console.log('2');
				}, 2000);
				setTimeout( function(){
					console.log('1');
				}, 3000);
				setTimeout( function(){
					self.$root.$emit('gameStart');
				}, 3100);
				
				this.state.loading = false;	
				this.state.ready = true;	
			},
			game_stop : function(){
				console.log('game stopping in ...');
				this.state.ready = false;	
				this.$root.$emit('gameStop');
			},			
			game_exit : function(){
				this.state.timeouts = 0;
				this.state.init = false;
				this.state.loading = false;
				this.state.playerJoin = false;				
				this.state.playerJoined = false;
				this.game_stop();				
				this.$store.dispatch('game/reset');
			},



			// timer_on : function(){
			// 	this.board.progress.playing = true;
			// 	this.board.progress.start = new Date();
			// 	this.timer_stop();
			// 	this.timer_start();
			// },
			// timer_start : function(){
			// 	let self = this;
			// 	if( self.board.progress.playing ){
			// 		self.board.progress.time += 1;
			// 		self.set_time_display( self.board.progress.time );
			// 		counter = setTimeout( function(){
			// 			self.timer_start();
			// 		},1000)
			// 	} else {
			// 		self.timer_stop();
			// 	}
			// },
			// timer_stop : function(){
			// 	clearTimeout(counter);
			// },	
			// set_time_display : function( input ){

			// 	let secs = Math.floor(input % 60)
			// 	let mins = Math.floor((input % 3600)/60)
			// 	let hrs = Math.floor(input / 3600)

			// 	let output = "";

			// 	if( hrs > 0){
			// 		output += "" + hrs + ":" + (mins < 10 ? "0" : "");
			// 	}
			// 	if( mins > 0){
			// 		output += "" + mins + ":" + (secs < 10 ? "0" : "");
			// 	}				
			// 	output += secs;

			// 	this.board.progress.time_display = output;
			// },		
			// reset : function( msgToShow='Board reset.' ){
				
			// 	this.reset_button('waiting');
				
			// 	if( msgToShow.length > 0 ){
			// 		this.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : msgToShow });
			// 	}

			// 	this.state.game.almost = false;
			// 	this.state.game.lost = false;
			// 	this.state.game.won = false;

			// 	this.set_board_data( this.dataCopy );
			// },
			// reset_button : function( state ){
			// 	if( this.$refs.resetBtn !== undefined ){
			// 		this.$refs.resetBtn.$emit('state', state);
			// 	}
			// },
			// set_board_data : function( input ){
			// 	this.board.name = input.name;
			// 	this.board.owner = input.owner;
			// 	this.board.date.created = input.date.created;
			// 	this.board.url = input.url;
			// 	// set board size
			// 	this.board.size = Math.floor(input.words.length * this.show);
			// 	if( this.board.size > this.max ){
			// 		this.board.size = this.max;
			// 	}

			// 	// setup scores
			// 	this.board.score.almost = Math.floor(this.board.size * this.almost);
			// 	this.board.score.win = Math.floor(this.board.size * this.win);

			// 	this.init_words();
			// 	this.set_board_words( input.words );

			// 	this.board.progress.time = 0;
			// 	this.set_score( 0 );

			// 	this.reset_button('success');

			// 	let self = this;
			// 	setTimeout(function(){
			// 		self.reset_button('reset');
			// 		self.state.board.loading = false;
			// 	},1000);
			// 	setTimeout(function(){
			// 		self.state.board.ready = true;
			// 		self.timer_on();
			// 	},2000);				
			// },
			// init_words : function(){
			// 	if( this.board.words.length < this.board.size ){
			// 		for( let count = 0; count < this.board.size; count++){
			// 			let newWord = { 
			// 				word:'',
			// 				count : count,
			// 				selected:false,
			// 			};
			// 			this.board.words.push( newWord );
			// 		}
			// 	}			
			// },
			// set_board_words : function( input ){

			// 	// copy array 
			// 	let tempArray = input.slice(0);

			// 	// randomize
			// 	for( let count = tempArray.length-1; count >= 0; count--){
			// 		let random = Math.floor(Math.random() * (count + 1));
			// 		let temp = tempArray[count]
			// 		tempArray[count] = tempArray[random];
			// 		tempArray[random] = temp;
			// 	}

			// 	// copy randomized words to board
			// 	for( let count = 0; count < this.board.size; count++){
			// 		this.board.words[count].word = tempArray[count];
			// 		this.board.words[count].selected = false;
			// 		this.board.words[count].count += this.board.size + 1;
			// 	}
			// },
			set_word_click : function( input ){
				// let self = this;
				// return function(){
				// 	if( self.board.words[input].selected ){
				// 		self.board.words[input].selected = false;
				// 		self.set_score( self.board.score.current - 1 );
				// 	} else {
				// 		self.board.words[input].selected = true;
				// 		self.set_score( self.board.score.current + 1 );
				// 	}
				// };
			},
			// set_score : function( input ){
			// 	this.board.score.current = input;
			// 	this.check_score();
			// },
			// set_score_almost : function(){
			// 	this.board.score.current = input;
			// 	this.check_score();
			// },			
			// check_score : function(){
			// 	if( this.board.score.current > 1 ){

			// 		// almost 
			// 		if( !this.state.game.almost && this.board.score.current >= this.board.score.almost ){
			// 			this.state.game.almost = true;
			// 			this.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : 'Almost there!' });
			// 		}

			// 		// win
			// 		if( !this.state.game.won && this.board.score.current >= this.board.score.win ){
			// 			this.state.game.won = true;
			// 			this.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : "You've won!" });
			// 		}

			// 	}
			// },
			// get_board_data : function(){

			// 	let self = this;
			// 	self.state.board.loading = true;

			// 	let boardID = this.$route.params.board;
			// 	let tempURL = '/api/board/' + boardID.toLowerCase();

			// 	let object = { 
			// 		url : tempURL, 
			// 		method : 'POST', 
			// 		body : '' 
			// 	};

			// 	this.$request.request_url( object, function(error, result){
					
			// 		if( error ){
			// 			self.$refs.messageSrv.$emit('message', { class : 'error text-negative', message : error.message });
			// 			return;
			// 		}

			// 		self.dataCopy = result.data;
			// 		self.reset( '' );
			// 		self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : result.message });

			// 	});

			// },			
		},
		mounted() {
			// get all data associated with board from server?
			this.init();
			// this.get_board_data();
		},
		beforeDestroy(){
			this.game_exit();
			// this.timer_stop();
		},		
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-word' : Word,
			'c-win-player-join' : PlayerJoin,
			'c-game-poll' : GamePoll,
			'c-game-state' : GameState,
		},		
}
</script>

<style>

.load-icon {
	margin: 0 auto;
	width: 40vw;
	height: 40vw;
}
.load-icon-el {
	opacity: 0;
	transform: scale(0.25);
	width: 25%;
	height: 25%;
	margin: 3%;
	background-color: hsl(100,33%,70%);
	display: inline-block;
	animation: load-anim-in-out 1s infinite ease-in-out;
}


@keyframes load-anim-in-out {
	0% {
		transform: scale(0.66);
		opacity: 0.5;
	}
	50% {
		transform: scale(1);
		opacity: 1;
	}	
	100% {
		transform: scale(0.66);
		opacity: 0.5;
	}
}



.load-enter-active, .load-leave-active {
  transition: opacity 1s;
}
.load-enter, .load-leave-to /* .load-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.bingo-board {
	margin-top: -3rem;
	transition: 0.5s;
}
.bingo-board.is-lost {
	background-color: hsla(1,90%,60%,0.66);
}
.bingo-board.is-almost {
	background-color: hsla(100,90%,75%,0.2);
}
.bingo-board.is-won {
	background-color: hsla(100,90%,75%,0.66);
}

.timer {
	position: absolute;
	right:0;
	top: 0;
	bottom:0;
	/*height: 100%;*/
	text-align: right;
	padding: 0.5rem 1rem;
	background-color: hsl(1,1%,10%);
}

.score {
	position: absolute;
	left:0;
	top: 0;
	bottom:0;
	/*height: 100%;*/
	text-align: left;
	padding: 0.5rem 1rem;
	background-color: hsl(1,1%,10%);
}

</style>

