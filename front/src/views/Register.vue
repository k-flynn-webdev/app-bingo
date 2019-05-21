<template>

	<c-panel class="flex-only-on-large">
		<div slot="header">
			Account Register
		</div>

		<form 
			class="form" 
			action="/api/account/create" 
			method ="POST" 
			@submit.prevent="onSubmit">

				<c-account-input 
					v-bind:input=form>
				</c-account-input>
				<c-button 
					v-bind:progress=progress> 
				</c-button>	

			<c-message ref="messageBtn"></c-message>

		</form>

		<div slot="footer">
			<div class="colour-fill-bg-inv">
				<div>
					<p>
						Already have an account, 
						<router-link 
							class="colour-fill-accent"
							to="/login">
								login?
						</router-link>
					</p>
				</div>

				<div>
					<p>
						Try a
						<router-link 
							class="colour-fill-accent"
							to="/demo">
								demo?
						</router-link>
					</p>
					
				</div>
			</div>
		
		</div>

	</c-panel>

</template>

<script>

	import AccountInput from '../components/c_account_input.vue';
	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	export default {
		name: 'Register',
		data(){
			return {
				progress : { 
					waiting : false, 
					success : false, 
					error : false },	
				form : {
					name : { show : true, isRequired : true, value : '' },
					email : { show : true, isRequired : true, value : '' },
					password : { show : true, isRequired : true, value : '' },
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
			'c-panel' : Panel,
			'c-message' : Message,
		},		
}
</script>