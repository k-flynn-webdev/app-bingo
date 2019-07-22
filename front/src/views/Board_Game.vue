<template>

	<section>

		<div class="center-auto-h width-95">

			<!-- // TODO future: thse should be pushed into some kind of api in the store .. -->
			<c-init-instance></c-init-instance>
			<c-init-board></c-init-board>
			<c-init-player></c-init-player>


			<c-window-game></c-window-game>
			<c-window-player></c-window-player>

			<!-- // TODO future: this should be pushed into some kind of api in the store .. -->
			<c-update-instance></c-update-instance>

			<p class="poster colour-fill-pop bingo-header">
				{{ board_name }}
			</p>


			<div class="options-bar">
				<c-players></c-players>
				<c-player></c-player>
			</div>

			<c-game-lines></c-game-lines>

			<br>

			<div class="options-bar">

				<c-button
					class="border-white"
					v-bind:class="{ 'game-ready' : game_ready }"
					ref="btnReset"
					v-bind:onClick=reset>
						Reset
				</c-button>

				<c-button-share 
					class="text-right" 
					style="position:absolute;right:0;top:-.25rem;"
					v-bind:content=share.link>
				</c-button-share>
				
			</div>

		</div>

	</section>	

</template>

<script>

	import Panel from '../components/c_panel.vue';
	import Button from '../components/c_button.vue';
	import ButtonShare from '../components/c_button_share.vue';

	import ButtonExpand from '../components/c_button_expand.vue';

	import InitBoard from '../game/c_init_board.vue';
	import InitInstance from '../game/c_init_instance.vue';
	import InitPlayer from '../game/c_init_player.vue';

	import Player from '../components/c_player.vue';
	import Players from '../components/c_players.vue';
	import PlayerWindow from '../components/c_player_window.vue';

	import UpdateInstance from '../game/c_update_instance.vue';
	
	import GameLines from '../components/c_lines.vue';
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
				this.$root.$on('reset-success', this.reset_success );
				this.$root.$on('reset-fail', this.reset_fail );

				this.board = this.$route.params.board;
				this.game_share_link();
			},

			reset : function(){
				this.$root.$emit('player-reset');
				this.$root.$emit('player-lines-reset');
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

			game_share_link : function(){
				this.share.link = window.location.href;
			},

			exit : function(){
				this.$root.$off('reset-success', this.reset_success );
				this.$root.$off('reset-fail', this.reset_fail );				
			},
		},
		mounted() {
			this.init();
			this.$root.$on('game-pre-reset', this.game_share_link );

		},
		beforeDestroy(){
			this.$root.$off('game-pre-reset', this.game_share_link );

			this.exit();
		},		
		components: {
			'c-panel' : Panel,
			'c-button' : Button,
			'c-button-share' : ButtonShare,
			'c-button-expand' : ButtonExpand,
			'c-game-lines' : GameLines,
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

.bingo-header {
	margin: 0.5rem 0;
}

.options-bar {
	position: relative;
	margin: var(--margin);
	height: 3rem;
	margin: .5rem;
}


</style>

