<template>

	<c-panel>
		<template slot="header">
			Account Logout
		</template>

		<form 
			class="form" 
			action="/api/account/logout" 
			method ="POST" 
			@submit.prevent="onLogout">
				
				<c-message 
					ref="msgSubmit"
					class="colour-fill-bg-inv">		
				</c-message>

				<br>

				<c-button 
					ref="btnSubmit">
					Logout
				</c-button>

		</form>

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import { submit } from '../mixins/h_submit.js';

	export default {
		name: 'Logout',
		mixins: [ submit ],		
		data(){
			return {
				attrs : {				
					server : {
						max_timeouts : 5,
						timing : 1500,
					},
					action : Object,
				},	
				state : {
					init : false,
					timeouts : 0,
				},			
			}
		},
	
		methods:{

			init : function(){
				if( !this.state.init ){
					let object = {
						url : ('/api/account/logout' ),
						method : 'POST',
						JSON : false,
						body : {
						},
					};
					this.attrs.action = object;
					this.state.init = true;
				}
			},

			onLogout : function( event ){

				let self = this;	
				this.onSubmit( this.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);

			},
			onSuccess : function( input ){
				let self = this;
				self.$refs.btnSubmit.$emit( 'state' , 'message', 'GoodBye!' );
				self.$store.dispatch('user/logout_success', '');
				self.logout();
				
			},
			onError : function( input ){

				if( this.state.timeouts < this.attrs.server.max_timeouts ){

					this.$refs.btnSubmit.$emit( 'state' , 'message', 'Error!' );

					if( input.status !== 408 ){
						return;
					}

					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit(self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
					}, self.attrs.server.timing );
				}
			},
			logout : function(){
				let self = this;
				setTimeout( function(){
					self.$router.push( '/' );
				}, 2000);
			},			

		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-message' : Message,
			'c-panel' : Panel,
		},		
}
</script>
