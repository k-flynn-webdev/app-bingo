<template>

	<c-panel>
		<div slot="header">
			Account Login
		</div>

		<form 
			class="form" 
			action="/api/account/login" 
			method ="POST" 
			@submit.prevent="onSubmit">

				<c-account-input v-bind:Input=AccountInfo ></c-account-input>
				
				<c-button 
					v-bind:progress=progress> 
				</c-button>	

		</form>

		<c-message ref="messageBtn"></c-message>

		<div slot="footer">
			Dont have an account, why not 
			<router-link to="/register">register?</router-link>
		</div>

	</c-panel>

</template>

<script>

	import AccountInput from '../components/c_account_input.vue';
	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	export default {
		name: 'Login',
		data(){
			return {
				progress : { 
					waiting : false, 
					success : false, 
					error : false },				
				AccountInfo : {
					Name : { show : false, isRequired : false, value : '' },
					Email : { show : true, isRequired : true, value : '' },
					Password : { show : true, isRequired : true, value : '' },
				}				
			}
		},
		created(){
		},		
		methods:{
			button_reset : function(){
				let self = this;
				setTimeout( function(){
					self.progress.waiting = false;
					self.progress.success = false;
					self.progress.error = false;
				}, 1000);
			},	
			onSubmit : function( event ){
				this.progress.waiting = true;
				let self = this;
				this.$request.request_url_form( event, function(error, result){

					self.button_reset();

					if( error ){
						self.progress.error = true;
						self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
						// todo future retry if its server issue?
						// else spawn a message

						return;
					}

					self.progress.success = true;

					self.$refs.messageBtn.$emit('message', { class : 'success text-positive', message : result.message });

					setTimeout( function(){
						self.$store.dispatch('user/login_success', result.token);
						self.$router.push( '/' );
					}, 1000);

				});
			},
		},
		components: {
			'c-account-input' : AccountInput, 
			'c-button' : Button,
			'c-message' : Message,
			'c-panel' : Panel,
		},		
}
</script>

