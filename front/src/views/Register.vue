<template>

	<c-panel>
		<template slot="header">
			Account Register
		</template>

		<form 
			class="form" 
			action="/api/account/create" 
			method ="POST" 
			@submit.prevent="onLogin">

				<c-account-input 
					v-bind:input=form>
				</c-account-input>
				
				<c-message 
					ref="msgSubmit"
					class="colour-fill-bg-inv">		
				</c-message>

				<br>

				<c-button 
					ref="btnSubmit">
					Register
				</c-button>

		</form>

		<template slot="footer">

			<br>
			<br>

			<p class="colour-fill-bg-inv">
				Already have an account,

				<router-link 
					class="colour-fill-accent"
					to="/login">
						login.
				</router-link>

			</p>

		</template>

	</c-panel>

</template>

<script>

	import AccountInput from '../components/c_account_input.vue';
	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import { submit } from '../mixins/h_submit.js';

	import Validate from '../helpers/h_validate_input.js';

	export default {
		name: 'Register',
		mixins: [ submit ],		
		data(){
			return {
				attrs : {
					validate : {
						max : 30,
						name : 3,
						password : 7,
					},					
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

				form : {
					name : { show : true, isRequired : true, value : '' },
					email : { show : true, isRequired : true, value : '' },
					password : { show : true, isRequired : true, value : '' },
				}				
			}
		},
	
		methods:{

			init : function(){
				if( !this.state.init ){
					let object = {
						url : ('/api/account/create' ),
						method : 'POST',
						JSON : true,
						body : {
							name : '',
							email : '',
							password : '',
						},
					};
					this.attrs.action = object;
					this.state.init = true;
				}
			},


			onLogin : function( event ){

				if( !Validate.email( this.form.email.value ) || 
					!Validate.length( this.form.password.value, this.attrs.validate.password, 100 ) ||
					!Validate.length( this.form.name.value, this.attrs.validate.name, this.attrs.validate.max )){
					return;
				}

				this.attrs.action.body.name = this.form.name.value;
				this.attrs.action.body.email = this.form.email.value;
				this.attrs.action.body.password = this.form.password.value;

				let self = this;	
				this.onSubmit( this.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);

			},
			onSuccess : function( input ){
				let self = this;
				self.$refs.btnSubmit.$emit( 'state' , 'message', 'Hello!' );
				self.$store.dispatch('user/login_success', input.token);
				setTimeout( function(){
					self.$router.push( '/');
				}, 2000 );
			},
			onError : function( input ){

				if( this.state.timeouts < this.attrs.server.max_timeouts ){

					this.$refs.btnSubmit.$emit( 'state' , 'message', 'Error!' );

					if( input.status !== 408 ){
						return;
					}

					// let self = this;
					// setTimeout( function(){
					// 	self.state.timeouts +=1
					// 	self.onSubmit(self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
					// }, self.attrs.server.timing );
				}
			},



		},
		mounted(){
			this.init();
		},
		components: {
			'c-account-input' : AccountInput, 
			'c-button' : Button,
			'c-message' : Message,
			'c-panel' : Panel,
		},		
}
</script>

