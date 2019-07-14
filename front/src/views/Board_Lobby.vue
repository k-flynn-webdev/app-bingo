<template>

	<c-panel>

		<div slot="header">
			{{ get_name }}
		</div>

		<div class="text-left buttons">
			
			<div>
				<c-button
					ref="btnPlay"
					v-bind:onClick=onPlay>
					Play
				</c-button>
				
				<span class="text colour-fill-dark button-helper"> Start a game. </span>

			</div>


			<div>
				<c-button
					ref="btnRandom"
					v-bind:onClick=onRandom>
					Random
				</c-button>

				<span class="text colour-fill-dark button-helper"> Join a random game. </span>

			</div>

			<div>

				<c-button-expand
					ref="btnJoin"
					v-bind:buttonShow=true
					v-bind:buttonClickClose=true
					v-bind:buttonClick=onJoin>

						Join

						<input 
							slot="content"
							class="text colour-fill-bg-inv text-input content-input" 
							type="string" 
							name="join"
							placeholder="eg 'bc8yh2'"
							v-model=join.link>

						<p class="label" slot="button">
							ok
						</p>
					
				</c-button-expand>

				<span class="text colour-fill-dark button-helper"> Join a friends game. </span>

			</div>


			<div 
				class="button-row" 
				v-bind:data-info=state.info
				v-on:click=button_info>

					<span class="title colour-fill-dark"> Info </span>
					<div class="button-row-icon anim-3"></div>	

					<div class="row-content anim-3">

						<p class="text text-center colour-fill-bg">
								Players ():
						</p>

					</div>

			</div>


		</div>

		<div slot="footer">

			<div class="text-right">

				<c-button-share></c-button-share>

			</div>

		</div>

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import ButtonShare from '../components/c_button_share.vue';
	import ButtonExpand from '../components/c_button_expand.vue';
	import Panel from '../components/c_panel.vue';
	// import Message from '../components/c_message.vue';
	// import Tag from '../components/c_tag.vue';

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'BoardLobby',
		mixins: [ submit ],
		data(){
			return {
				board : '',
				instance : '',
				
				state : {
					info : false,
				},
				
				join : {
					link : ''
				},
				share : {
					link : '',
				},
			}
		},
		computed : {
			get_name : function(){
				return this.$store.getters['board/get_board'].data.name || 'Name';
			},
		},
		methods:{

			button_info : function(){
				this.state.info = !this.state.info;
			},

			init : function(){
				this.board = this.$route.params.board;
				this.share.link = window.location.href;
				this.$root.$emit('page.title', 'BOARD');
			},			
			onSuccess : function( input ){
				let self = this;
				setTimeout( function(){
					self.$router.push( '/instance/' +  input.data.url);
				}, 2000);
			},
			onError: function( input ){
				let self = this;
				// TODO retry?
				// setTimeout( function(){
				// }, 2000);
			},

			onPlay : function( event ){
				let object = {
					url : ('/api/instance/' + this.board + '/create'),
					method : 'GET',
					body : '' };
					
				let self = this;	
				let btn = self.$refs.btnPlay;

				// setTimeout( function(){
				// 	btn.$emit('state', 'success');
				// }, 1.5*1000);

				// setTimeout( function(){
				// 	btn.$emit('state', 'reset');
				// }, 5*1000);

				this.onSubmit( object, self, btn, null, self.onSuccess, self.onError);
			},
			onRandom : function( event ){
				let object = {
					url : ('/api/instance/' + this.board + '/random'),
					method : 'GET',
					body : '' };

				let self = this;	
				let btn = self.$refs.btnRandom;

				this.onSubmit( object, self, btn, null, self.onSuccess, self.onError);
			},	


			onJoin : function( event ){
				let self = this;
				self.$refs.btnJoin.$emit('state','waiting');
				setTimeout( function(){
					self.$router.push( '/instance/' +  self.join.link);
				},1000);
			},					


			onCopy : function(){
				let copyText = this.$refs.shareLinkURL.select();
				document.execCommand('copy');
			},
		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-button-share' : ButtonShare,
			'c-button-expand' : ButtonExpand,
			'c-panel' : Panel,
			// 'c-message' : Message,
			// 'c-tag' : Tag,
		},		
}
</script>

<style>

	/*.bottom-right {*/
		
		/*left: calc(100% - 2.33rem);*/
	/*}*/

/*	.share {
		min-width: unset;
		width: 2.33rem;
		height: 2.33rem;
	}*/
/*	.share svg {
		margin: 10%;
		width: 80%;
		height: 80%;
	}*/



</style>

