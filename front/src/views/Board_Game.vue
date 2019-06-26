<template>

	<c-panel>

		<c-init-instance v-on:trigger="messageShow"></c-init-instance>
		<c-init-board v-on:trigger="messageShow"></c-init-board>
		<c-init-player v-on:trigger="messageShow"></c-init-player>
		<c-window-player></c-window-player>

		<c-update-instance v-on:trigger="messageShow"></c-update-instance>


		<div slot="header">
			{{ board_name }}
		</div>

		<div slot="options">
			<c-players class="item"></c-players>
			<c-player class="item"></c-player>
		</div>

		<c-game-words></c-game-words>

		<br>
		<br>

		<c-button
			v-bind:class="{ 'game-ready' : game_ready }"
			ref="btnReset"
			v-bind:onClick=reset>
				Reset
		</c-button>

		<br>
		
		<!-- <c-message ref="msgObj1"></c-message> -->

		<span class="text colour-fill-bg-inv">
			{{ game_state.mode }}
			{{ game_state.result }}
		</span>

	</c-panel>

</template>

<script>

	import Panel from '../components/c_panel.vue';
	import Button from '../components/c_button.vue';
	import Message from '../components/c_message.vue';

	import InitBoard from '../game/c_init_board.vue';
	import InitInstance from '../game/c_init_instance.vue';
	import InitPlayer from '../game/c_init_player.vue';
	import Player from '../components/c_player.vue';
	import Players from '../components/c_players.vue';
	import PlayerWindow from '../components/c_player_window.vue';

	import UpdateInstance from '../game/c_update_instance.vue';
	
	import GameWords from '../components/c_words.vue';

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
			// board_score : function(){
			// 	return this.$store.getters['game/get_score'];
			// },			
			// board_player : function(){
			// 	let player = this.$store.getters['game/get_player'];
			// 	if( player.data.name === '' ){
			// 		return true;
			// 	}
			// 	return true;
			// },
			game_state : function(){
				return this.$store.getters['game/get_game'];
			},
			game_ready : function(){
				let mode = this.$store.getters['game/get_game'].mode;
				if( mode === 'playing'){
					return true;
				}
				return false;
			},

		},	
		methods:{

			init : function(){
				this.$root.$on('reset.success', this.reset_success );
				this.$root.$on('reset.fail', this.reset_fail );
				// this.board.name = 'Bullshit Bingo';

				// let self = this;
				// setTimeout( function(){
				// 	self.board.name = self.board_name;
				// }, 1500);
			},


			messageShow : function( input ){
				// this.$refs.msgObj1.$emit('message', { class: 'content colour-fill-bg-inv', message : input } );
			},

			reset : function(){
				this.$root.$emit('player.reset');
				this.$root.$emit('player.words.reset');
				if( this.$refs.btnReset !== undefined ){
					this.$refs.btnReset.$emit('state', 'waiting');
				}
			},
			reset_success : function(){
				if( this.$refs.btnReset !== undefined ){
					this.$refs.btnReset.$emit( 'state', 'message', 'Ready');
				}
			},
			reset_fail : function(){
				if( this.$refs.btnReset !== undefined ){
					this.$refs.btnReset.$emit( 'state', 'message', 'Error');
				}
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
			exit : function(){
				this.$root.$off('reset.success', this.reset_success );
				this.$root.$off('reset.fail', this.reset_fail );				
			},
		},
		mounted() {
			this.init();
		},
		beforeDestroy(){
		},		
		components: {
			'c-panel' : Panel,
			'c-button' : Button,
			'c-message' : Message,			
			'c-game-words' : GameWords,
			'c-init-board' : InitBoard,
			'c-init-instance' : InitInstance,
			'c-init-player' : InitPlayer,
			'c-player' : Player,
			'c-players' : Players,
			'c-window-player' : PlayerWindow,
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

