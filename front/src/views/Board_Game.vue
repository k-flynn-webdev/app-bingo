<template>

	<c-panel>

		<c-init-instance></c-init-instance>
		<c-init-board></c-init-board>

		<c-update-instance></c-update-instance>


		<div slot="header">
			{{ board_name }}
		</div>

		<c-game-words></c-game-words>



		<c-button
			v-bind:onClick=reset>
				Reset
			</c-button>


		<!-- <c-message ref="messageBtn"></c-message>	 -->

	</c-panel>

	<!-- <div class="panel width-90 center-auto-h colour-text-dark">
		
		<header class="opt">
			
			<p class="colour-bg-inv title text-uppercase text-bold colour-text-light header-shadow"> 
				{{ board_name }}
			</p>

			<div class="colour-bg-inv options flex-row flex-row-end header-shadow">

				<p class="score text colour-text-light "> 
					{{ board_score }}
				</p>

				<i 
					v-on:click=player_toggle
					class="avatar fas fa-user-circle colour-text-light ">
				</i>

			</div>

		</header>

		<main class="text">	
			



		</main>

		<footer>

			<p class="text"> 


			</p>

		</footer>
	</div> -->


<!-- 
<div 
	class="width-90 center-auto-h colour-text-dark"
	style="max-width:33rem;">
	
		<c-game-state></c-game-state>
		<c-game-instance></c-game-instance>
		<c-game-player></c-game-player>
		<c-game-players></c-game-players>

	<div class="game-panel">

		<header class="colour-bg-inv">
			
			<p class="title text-uppercase text-bold colour-text-light"> 
				
			</p>

			<div class="options flex-row flex-row-end">
				<slot name="options"></slot>
			</div>

		</header> -->




			<!-- <div class="options flex-row flex-row-start">

				<div 
					class="score-holder"
					v-if=board_player>

					<p class="score text text-light"> {{ board_score }} </p>
					<i v-on:click=player_toggle
						class="fas fa-user-circle text-light"></i>

				</div>

			</div> -->

		<!-- </header> -->





		<!-- <div class="main">
		
			<c-game-board></c-game-board>
			
			<c-game-player-form></c-game-player-form>

		</div>

		<footer>
				
				<c-button
					ref="resetBtn" 
					class="footer-btn"
					v-bind:onClick=resetBtn>
						Reset?
				</c-button>

				<p class="footer-btn"></p>

				<c-button
					ref="shareBtn" 
					class="footer-btn"
					v-bind:onClick=shareBtn>
						Share?
				</c-button>				

		</footer> -->

	<!-- </div> -->

<!-- </div> -->






	<!-- <div>

		

		<c-panel>

			<template slot="header">

				<p class="title">
					{{ board_name }}
				</p>

			</template>
			
			<template slot="options">

				<div 
					class="score-holder"
					v-if=board_player>

					<p class="score text text-light"> {{ board_score }} </p>	
					<i v-on:click=player_toggle
						class="fas fa-user-circle text-light"></i>

				</div>
	
			</template>		
			
			<c-game-board></c-game-board>
			
			<c-game-player-form></c-game-player-form> -->

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

					<!-- <c-word
						v-for="(word, index) in board_words" :key=word.count
						v-bind:onClick=set_word_click(index)
						v-bind:class="{ 'is-selected' : word.selected }">

							<p > {{ word.word }} </p>
		
					</c-word> -->

				<!-- </div> -->

			<!-- </div>	 -->
				
			<!-- <div slot="footer">

				<c-button
					ref="resetBtn" 
					v-bind:onClick=resetBtn>
						Reset?
				</c-button> -->

				<!-- <div style="position: absolute;right:0;top:0;bottom:0;"> -->
					<!-- <c-game-player-sync></c-game-player-sync> -->
				<!-- </div> -->

		<!-- 	</div>

		</c-panel>

	</div> -->

</template>

<script>


	// import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Button from '../components/c_button.vue';

	import InitBoard from '../game/c_init_board.vue';
	import InitInstance from '../game/c_init_instance.vue';
	import UpdateInstance from '../game/c_update_instance.vue';
	
	import GameWords from '../components/c_words.vue';


	// import Player from '../components/c_game_player.vue';
	// import PlayerForm from '../components/c_game_player_form.vue';
	// import PlayersState from '../components/c_game_players_state.vue';

	// import State from '../components/c_game_state.vue';
	// import Instance from '../components/c_game_instance.vue';
	// import Board from '../components/c_game_board.vue';


	export default {
		name: 'BoardGame',
		data(){
			return {
				attrs : {
				},
			}
		},	
		computed : {
		
			board_name : function(){
				return this.$store.getters['board/get_board'].data.name;
			},
			board_score : function(){
				return this.$store.getters['game/get_score'];
			},			
			board_player : function(){
				let player = this.$store.getters['game/get_player'];
				if( player.data.name === '' ){
					return true;
				}
				return true;
			},		

		},	
		methods:{

			init : function(){
				// this.board.name = 'Bullshit Bingo';

				// let self = this;
				// setTimeout( function(){
				// 	self.board.name = self.board_name;
				// }, 1500);
			},

			reset : function(){
				this.$root.$emit('reset');
			},
			// resetBtn : function(){
			// 	console.log('btn: reset.');
			// 	this.$root.$emit('state_reset');

			// 	let player = this.$store.getters['game/get_player'];
			// 	let toSend = {
			// 		player : {
			// 			url : player.url,
			// 			word : {
			// 				reset : true,
			// 			},
			// 		},
			// 	};

			// 	this.$root.$emit('state_player_submit',
			// 			toSend, 
			// 			this.reset_success, 
			// 			this.reset_fail, 
			// 			this.$refs.resetBtn );

			// },
			// shareBtn : function(){
			// 	console.log('btn: share.');
			// },
			// reset_success : function( input ){
			// 	this.$store.dispatch('game/reset_player');
			// },
			// reset_fail : function( input ){
			// 	// todo failed reset retry ..
			// },

			// player_toggle : function(){
			// 	this.$root.$emit('player_show');
			// },			

		},
		mounted() {
			this.init();
		},
		beforeDestroy(){
		},		
		components: {
			'c-panel' : Panel,
			'c-button' : Button,
			'c-game-words' : GameWords,
			'c-init-board' : InitBoard,
			'c-init-instance' : InitInstance,
			'c-update-instance' : UpdateInstance,
			// 'c-button' : Button,
			
			// 'c-game-state' : State,
			// 'c-game-instance' : Instance,			
			// 'c-game-board' : Board,			
			// 'c-game-player' : Player,
			// 'c-game-player-form' : PlayerForm,
			// 'c-game-players' : PlayersState,
		},		
}
</script>

<style>


/*.panel header.opt .title {
	width: calc(100% - 3.75rem);
    margin-left: auto;
    text-align: center;
}

.panel header.opt .options{
	transform: skew( 0deg ,18.5deg);
	position: absolute;
	box-sizing: border-box;
	width: 3.75rem;
	height: 100%;
	top: -10px;
	left: 0;
	z-index: -1;
}

.panel header {
	box-shadow: unset;
}*/

.score{
	font-size: 1.5rem;
	margin-right: .4rem;
}

.avatar {
	font-size: 1.6rem;
	margin-right: .2rem;
}




/*
.game-panel {
	margin-bottom: 2rem !important;
	text-align: center;
	overflow: hidden;	
	text-align: center;
}
*/

/*
.game-panel header{
	position: relative;
	box-sizing: border-box;
	background-color: var( --colour-panel );
	margin-bottom: 0.75rem;
}*/

/*.game-panel header .title{
	padding: 0.25rem 0;
	margin-left: 5rem;
}*/

/*.game-panel .main{
	margin-bottom: 1rem;
	position: relative;
	width: calc(100% - 2rem);
	text-align: left;
}*/

/*.game-panel footer{
	min-height: 0.33rem;
	padding-bottom: 0.33rem;
	margin: 0 var( --margin-screen-large );
}*/

/*.game-panel .footer-btn{
	min-width: 3rem;
	display: inline-block;
}*/


/*@media only screen and (max-width: 400px) {	
	.game-panel main{
		margin: 0.5rem var( --margin-screen-med );
	}
	.game-panel footer{
		margin: 0 var( --margin-screen-med );
	}
}*/

/*@media only screen and (max-width: 320px) {
	.game-panel main{
		margin: 0.5rem var( --margin-screen-small );
	}
	.game-panel footer{
		margin: 0 var( --margin-screen-small );
	}
}*/

/*@media only screen and (min-width: 600px) {
	.game-panel .main {
		width: 100%;
	}	
	.game-panel main{
		margin: 0.5rem var( --margin-screen-small );
	}
	.game-panel footer{
		margin: 0 var( --margin-screen-small );
	}
}*/









/*.load-icon {
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
}*/


/*@keyframes load-anim-in-out {
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
}*/



/*.load-enter-active, .load-leave-active {
  transition: opacity 1s;
}
.load-enter, .load-leave-to */
/* .load-leave-active below version 2.1.8 */ 
/*{
  opacity: 0;
}*/


/*.bingo-board {
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
}*/

/*.timer {
	position: absolute;
	right:0;
	top: 0;
	bottom:0;
	text-align: right;
	padding: 0.5rem 1rem;
	background-color: hsl(1,1%,10%);
}
*/
/*.score-holder {*/
	/*position: absolute;*/
	/*top: 0;*/
	/*width: 3rem;*/
	/*bottom: 0;*/

	/*padding: 0.3rem 1rem;*/
	/*background-color: hsl(1,1%,10%);*/
/*}*/



/*.score-holder i {*/
/*	position: absolute;
	font-size: 1.5rem;
	top: 50%;
	transform: translateY(-50%) translateX(25%);*/
/*}*/

</style>

