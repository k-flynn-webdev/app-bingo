<template>

	<c-panel>

		<div slot="header">
			<p v-if=state.board.loading class="title"> Play Bingo!</p>
			<p v-else class="title"> {{ this.board.name }} </p>
		</div>

		<div slot="options">
			<p class="score text text-light"> 
				{{ board_score }}
			</p>			

			<p class="timer text text-light"> 
				{{ board_time }}
			</p>
		</div>

		<div 
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

			</transition>					

			<div	
				v-if=state.board.ready>

				<c-word
					v-for="(word, index) in board.words" :key=word.count
					v-bind:onClick=set_word_click(index)
					v-bind:class="{ 'is-selected' : word.selected }">

						<p > {{ word.word }} </p>
	
				</c-word>

			</div>

		</div>	
			
			
		<div slot="footer">
			<c-button
				v-if=state.board.ready
				ref="resetBtn" 
				v-bind:onClick=reset>
					Try Again?
			</c-button>
		</div>

	</c-panel>

</template>

<script>

	import Button from '../components/c_buttonNew.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';
	import Word from '../components/c_word.vue';

	let counter = null;
	let serverPing = null;

	export default {
		name: 'BoardView',
		data(){
			return {
				dataCopy : Object,
				instance : '',

				multiplayer : true,
				random : true,
				show : 0.77,
				max : 20,
				almost : 0.5,
				win : 0.6,
				state : {
					board : {
						loading : false,
						ready : false,	
					},
					game : {
						almost : false,
						won : false,
						lost : false,
					},								
				},

				board : {
					name : '',
					owner : '',
					date : {
						created : new Date(),
					},
					words : [],
					url : '',
					size : 0,
					progress : {
						start : new Date(),
						playing : false,
						time : 0,
						time_display : '0',
					},	
					score : {
						current : 0,
						almost : 0,
						win : 0,
					},
				},	
			}
		},	
		computed : {
			board_time : function(){
				return this.board.progress.time_display;
			},
			board_score : function(){
				return this.board.score.current + '/' + this.board.score.win;
			},
			board_data : function(){
				return this.board;
			},
			board_words : function(){
				return this.board.words;
			},
		},	
		methods:{
			timer_on : function(){
				this.board.progress.playing = true;
				this.board.progress.start = new Date();
				this.timer_stop();
				this.timer_start();
				
				if( this.multiplayer ){
					this.ping_start();	
				}
				
			},
			timer_start : function(){
				let self = this;
				if( self.board.progress.playing ){
					self.board.progress.time += 1;
					self.set_time_display( self.board.progress.time );
					counter = setTimeout( function(){
						self.timer_start();
					},1000)
				} else {
					self.timer_stop();
				}
			},
			ping_start : function(){
				let self = this;
				if( self.board.progress.playing ){
					
					self.ping_game_state();				

					serverPing = setTimeout( function(){
						self.ping_start();
					},10000)
				} else {
					self.timer_stop();
				}
			},			
			timer_stop : function(){
				clearTimeout(counter);
				clearTimeout(serverPing);
			},	
			set_time_display : function( input ){

				let secs = Math.floor(input % 60)
				let mins = Math.floor((input % 3600)/60)
				let hrs = Math.floor(input / 3600)

				let output = "";

				if( hrs > 0){
					output += "" + hrs + ":" + (mins < 10 ? "0" : "");
				}
				if( mins > 0){
					output += "" + mins + ":" + (secs < 10 ? "0" : "");
				}				
				output += secs;

				this.board.progress.time_display = output;
			},		
			reset : function( msgToShow='Board reset.' ){
				
				this.reset_button('waiting');
				
				if( msgToShow.length > 0 ){
					this.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : msgToShow });
				}

				this.state.game.almost = false;
				this.state.game.lost = false;
				this.state.game.won = false;

				this.set_board_data( this.dataCopy );
			},
			reset_button : function( state ){
				if( this.$refs.resetBtn !== undefined ){
					this.$refs.resetBtn.$emit('state', state);
				}
			},
			set_board_data : function( input ){
				this.board.name = input.name;
				this.board.owner = input.owner;
				this.board.date.created = input.date.created;
				this.board.url = input.url;
				// set board size
				this.board.size = Math.floor(input.words.length * this.show);
				if( this.board.size > this.max ){
					this.board.size = this.max;
				}

				// setup scores
				this.board.score.almost = Math.floor(this.board.size * this.almost);
				this.board.score.win = Math.floor(this.board.size * this.win);

				this.init_words();
				this.set_board_words( input.words );

				this.board.progress.time = 0;
				this.set_score( 0 );

				this.reset_button('success');

				let self = this;
				setTimeout(function(){
					self.reset_button('reset');
					self.state.board.loading = false;
				},1000);
				setTimeout(function(){
					self.state.board.ready = true;
					self.timer_on();
				},2000);				
			},
			init_words : function(){
				if( this.board.words.length < this.board.size ){
					for( let count = 0; count < this.board.size; count++){
						let newWord = { 
							word:'',
							count : count,
							selected:false,
						};
						this.board.words.push( newWord );
					}
				}			
			},
			set_board_words : function( input ){

				// copy array 
				let tempArray = input.slice(0);

				// randomize
				for( let count = tempArray.length-1; count >= 0; count--){
					let random = Math.floor(Math.random() * (count + 1));
					let temp = tempArray[count]
					tempArray[count] = tempArray[random];
					tempArray[random] = temp;
				}

				// copy randomized words to board
				for( let count = 0; count < this.board.size; count++){
					this.board.words[count].word = tempArray[count];
					this.board.words[count].selected = false;
					this.board.words[count].count += this.board.size + 1;
				}
			},
			set_word_click : function( input ){
				let self = this;
				return function(){
					if( !self.state.game.won ){
						if( self.board.words[input].selected ){
							self.board.words[input].selected = false;
							self.set_score( self.board.score.current - 1 );
						} else {
							self.board.words[input].selected = true;
							self.set_score( self.board.score.current + 1 );
						}
					}
				};
			},
			set_score : function( input ){
				this.board.score.current = input;
				this.check_score();
			},
			set_score_almost : function(){
				this.state.game.almost = true;
				this.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : 'Almost there!' });
				this.submit_game_state('almost');
			},		
			set_score_won : function(){
				this.timer_stop();
				this.state.game.won = true;
				this.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : "You've won!" });
				this.submit_game_state('won');
			},	
			get_words_Selected : function(){
				let temp = [];

				for( let count = 0; count < this.board.words.length; count++){
					if( this.board.words[count].selected ){
						temp.push( this.board.words[count].word );
					}
				}

				return temp;
			},	

			ping_game_state : function(){
				let tempURL = '/api/board/' + this.board.url + '/' + this.instance;

				let object = { 
					url : tempURL, 
					method : 'GET', 
					body : {}, 
					JSON : true,
				};

				this.$request.request_url( object, function(error, result){
					
					// if( error ){
					// 	self.$refs.messageSrv.$emit('message', { class : 'error text-negative', message : error.message });
					// 	return;
					// }
					console.log( result );
					// self.dataCopy = result.data;
					// self.reset( '' );
					// self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : result.message });

				});
			},

			submit_game_state : function( input ){
				let tempURL = '/api/board/' + this.board.url + '/' + this.instance;

				let object = { 
					url : tempURL, 
					method : 'PUT', 
					body : {
						userID : 'testUser',
						userState : input,
						userTime : this.board.progress.time,
						userWords : this.get_words_Selected(),
					}, 
					JSON : true,
				};

				this.$request.request_url( object, function(error, result){
					
					// if( error ){
					// 	self.$refs.messageSrv.$emit('message', { class : 'error text-negative', message : error.message });
					// 	return;
					// }
					console.log( result );
					// self.dataCopy = result.data;
					// self.reset( '' );
					// self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : result.message });

				});
			},	
			check_score : function(){
				if( this.board.score.current > 1 ){

					// almost 
					if( !this.state.game.almost && this.board.score.current >= this.board.score.almost ){
						this.set_score_almost();
					}

					// win
					if( !this.state.game.won && this.board.score.current >= this.board.score.win ){
						this.set_score_won();
					}

				}
			},
			get_board_data : function(){

				let self = this;
				self.state.board.loading = true;

				let boardID = this.$route.params.board;
				let instanceID = this.$route.params.instance;
				let tempURL = '/api/board/' + boardID.toLowerCase() + '/' + instanceID.toLowerCase();

				let object = { 
					url : tempURL, 
					method : 'POST', 
					body : '' 
				};

				this.$request.request_url( object, function(error, result){
					
					if( error ){
						self.$refs.messageSrv.$emit('message', { class : 'error text-negative', message : error.message });
						return;
					}

					self.dataCopy = result.data.board;
					self.instance = result.data.instance;

					self.reset( '' );

					self.$refs.messageSrv.$emit('message', { class : 'success text-positive', message : result.message });

				});

			},			
		},
		mounted() {
			// get all data associated with board from server?
			this.get_board_data();
		},
		beforeDestroy(){
			this.timer_stop();
		},		
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-word' : Word,
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

