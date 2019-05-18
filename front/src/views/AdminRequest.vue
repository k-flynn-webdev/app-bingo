<template>

	<c-panel class="flex-only-on-large">
		<div slot="header">
			Admin Request
		</div>

		<form 
			class="form" 
			action="/api/admin/request" 
			method ="POST" 
			@submit.prevent="onSubmit">

				<div class="field">
					<p class="text label">Password:</p>
					<input 
						class="text" 
						type="password" 
						name="password" 
						placeholder="Admin Password" >
				</div>		

				<c-button 
					v-bind:progress=progress> 
				</c-button>	

		</form>

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';

	export default {
		name: 'AdminCreate',
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
						console.log('error');
						// todo future retry if its server issue?
						// else spawn a message
						return;
					}

					self.progress.success = true;

					setTimeout( function(){
						self.$store.dispatch('user/login_success', result.token);
						self.$router.push( '/' );
					}, 1000);

				});
			},
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
		},		
}
</script>
