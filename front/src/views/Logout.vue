<template>

	<c-panel>
		<div slot="header">
			Account Logout
		</div>

		<form 
			class="form" 
			action="/api/account/logout" 
			method ="POST" 
			@submit.prevent="onSubmit">

				<c-button 
					v-bind:progress=progress> 
				</c-button>	

			<c-message ref="messageBtn">
			</c-message>


		</form>

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	export default {
		name: 'Logout',
		data(){
			return {			
				progress : { 
					waiting : false, 
					success : false, 
					error : false },				
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
						self.logout();
						return;
					}

					self.progress.success = true;
					self.$refs.messageBtn.$emit('message', { class : 'success text-positive', message : result.message });
					self.logout();
				});
			},
			logout : function(){
				let self = this;
				setTimeout( function(){
					self.$store.dispatch('user/logout_success', '');
					self.$router.push( '/' );
				}, 1000);
			},
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,			
		},		
}
</script>