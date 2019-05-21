<template>

	<c-panel>
		<template slot="header">
			Account Login
		</template>

		<form 
			class="form" 
			action="/api/account/login" 
			method ="POST" 
			@submit.prevent="onLogin">

				<c-account-input 
					v-bind:input=form>
				</c-account-input>
				
				<c-message ref="messageBtn"></c-message>

				<br>

				<c-button 
					ref="btnSubmit"
					v-bind:onClick=onLogin> 
				</c-button>	

		</form>

		<template slot="footer">

			<br>
			<br>

			<p class="colour-fill-bg-inv">
				Dont have an account, why not 

				<router-link 
					class="colour-fill-accent"
					to="/register">
						register?
				</router-link>

			</p>

		</template>

	</c-panel>

</template>

<script>

	import AccountInput from '../components/c_account_input.vue';
	import Button from '../components/c_buttonNew.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import { submit } from '../mixins/h_submit.js';


	export default {
		name: 'Login',
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
				// progress : { 
				// 	waiting : false, 
				// 	success : false, 
				// 	error : false 
				// },				
				form : {
					name : { show : false, isRequired : false, value : '' },
					email : { show : true, isRequired : true, value : '' },
					password : { show : true, isRequired : true, value : '' },
				}				
			}
		},
		created(){
		},		
		methods:{

			init : function(){
				if( !this.state.init ){
					let object = {
						url : ('/api/account/login' ),
						method : 'POST',
						JSON : false,
						body : {
						},
					};
					this.attrs.action = object;
					this.state.init = true;
				}
			},



			onLogin : function( event ){
				if( 
					this.attrs.action.url !== undefined 
					&& this.onValidate_name_check()
					&& this.onValidate_words_check() ){

					this.attrs.action.body.name = this.form.name_string;
					this.attrs.action.body.words = this.form.word_string;

					let self = this;	
					this.onSubmit( this.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);

				} else {
					this.validate_reset();
				}
			},
			onSuccess : function( input ){
				let self = this;
				self.$refs.btnSubmit.$emit( 'state' , 'message', 'Enjoy!' );				
				setTimeout( function(){
					self.$router.push( '/board/' +  input.data.url);
				}, 3000 );
			},
			onError : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit();
					}, self.attrs.server.timing );
				}
			},






			// button_reset : function(){
			// 	let self = this;
			// 	setTimeout( function(){
			// 		self.progress.waiting = false;
			// 		self.progress.success = false;
			// 		self.progress.error = false;
			// 	}, 1000);
			// },	
			// onSubmit : function( event ){
			// 	this.progress.waiting = true;
			// 	let self = this;
			// 	this.$request.request_url_form( event, function(error, result){

			// 		self.button_reset();

			// 		if( error ){
			// 			self.progress.error = true;
			// 			self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
			// 			// todo future retry if its server issue?
			// 			// else spawn a message

			// 			return;
			// 		}

			// 		self.progress.success = true;

			// 		self.$refs.messageBtn.$emit('message', { class : 'success text-positive', message : result.message });

			// 		setTimeout( function(){
			// 			self.$store.dispatch('user/login_success', result.token);
			// 			self.$router.push( '/' );
			// 		}, 1000);

			// 	});
			// },
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

