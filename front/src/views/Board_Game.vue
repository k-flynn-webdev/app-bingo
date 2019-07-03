<template>

	<c-panel>

		<c-init-instance v-on:trigger="messageShow"></c-init-instance>
		<c-init-board v-on:trigger="messageShow"></c-init-board>
		<c-init-player v-on:trigger="messageShow"></c-init-player>
		
		<c-window-game></c-window-game>
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

		<div>
	
			<c-button
				v-bind:class="{ 'game-ready' : game_ready }"
				ref="btnReset"
				v-bind:onClick=reset>
					Reset
			</c-button>

			<c-button-expand
				style="display:inline;"
				v-bind:buttonShow=true
				v-bind:buttonClickClose=true
				v-bind:buttonClick=onCopy>

				<p class="label" slot="label">
					Share
				</p>

				<input 
					slot="content"
					ref="shareLinkURL"
					class="text colour-fill-bg-inv text-input" 
					type="string"
					name="share"
					v-bind:value=share.link>

				<p class="text text-bold" slot="button">
					copy
				</p>
				
			</c-button-expand>

		</div>

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
	import ButtonExpand from '../components/c_button_expand.vue';

	import InitBoard from '../game/c_init_board.vue';
	import InitInstance from '../game/c_init_instance.vue';
	import InitPlayer from '../game/c_init_player.vue';

	import Player from '../components/c_player.vue';
	import Players from '../components/c_players.vue';
	import PlayerWindow from '../components/c_player_window.vue';

	import UpdateInstance from '../game/c_update_instance.vue';
	
	import GameWords from '../components/c_words.vue';
	import GameWindow from '../components/c_game_window.vue';


	export default {
		name: 'BoardGame',
		data(){
			return {
				attrs : {
				},
				share : {
					link : '',
				},				
			}
		},	
		computed : {
		
			board_name : function(){
				return this.$store.getters['board/get_board'].data.name;
			},
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

				this.board = this.$route.params.board;
				this.game_share_link();
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

			onCopy : function(){
				let copyText = this.$refs.shareLinkURL.select();
				document.execCommand('copy');
			},

			game_share_link : function(){
				this.share.link = window.location.href;
			},

			exit : function(){
				this.$root.$off('reset.success', this.reset_success );
				this.$root.$off('reset.fail', this.reset_fail );				
			},
		},
		mounted() {
			this.init();
			this.$root.$on('game.pre.reset', this.game_share_link );

		},
		beforeDestroy(){
			this.$root.$off('game.pre.reset', this.game_share_link );

			this.exit();
		},		
		components: {
			'c-panel' : Panel,
			'c-button' : Button,
			'c-message' : Message,
			'c-button-expand' : ButtonExpand,
			'c-game-words' : GameWords,
			'c-init-board' : InitBoard,
			'c-init-instance' : InitInstance,
			'c-init-player' : InitPlayer,
			'c-player' : Player,
			'c-players' : Players,
			'c-window-player' : PlayerWindow,
			'c-window-game' : GameWindow,
			'c-update-instance' : UpdateInstance,
		},		
}
</script>

<style>

</style>

