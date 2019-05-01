<template>

	<div class="flex-only-on-large">
		
		<c-popup 
			v-if=isDeleting 
			v-bind:onClick=hide_delete>
			 
			<div slot="header">
				Delete Account
			</div>

			<p class="text"> Are you sure you want to delete </p>
			<p class="text"> this account? </p>
			<br>

			<div class="flex-row flex-row-between">

				<c-button 
					v-bind:onClick=hide_delete 
					type="button">
					Close
				</c-button>
				<c-button 
					type="button"
					v-bind:onClick=onSubmit_delete 
					class="colour-negative-bg">
					Delete
				</c-button>

			</div>	

			<c-message ref="messageBtnDel"></c-message>	


		 </c-popup>
	
		<c-panel>
			<div slot="header">
				Account
			</div>

			<form 
				class="form" 
				action="/api/account/?_method=PUT" 
				method ="POST" 
				@submit.prevent="onSubmit_update">

				<c-account-input 
					v-if=isEditing 
					v-bind:Input=account >	
				</c-account-input>
				<c-account-text 
					v-else 
					v-bind:Input=account >	
				</c-account-text>
				
				<div class="flex-row flex-row-between"
					v-bind:class="{ 'is-edit' : !isEditing }">

					<c-button 
						class="colour-yellow"
						v-bind:onClick=edit_switch 
						type="button">
						{{ button_undo_label }}
					</c-button>
					<c-button 
						v-show=isEditing
						class="colour-positive-bg" 
						type="submit" 
						v-bind:progress=progress_update>
						Update 
					</c-button>
					<c-button 
						v-show=isEditing 
						class="colour-negative-bg" 
						type="button"
						v-bind:onClick=popup_delete 
						v-bind:progress=progress_delete>
						Delete
					</c-button>

				</div>	

				<c-message ref="messageBtn"></c-message>	

			</form>
			
		</c-panel>
	
	</div>
		
</template>

<script>

	import AccountInput from '../components/c_account_input.vue';
	import AccountText from '../components/c_account_text.vue';

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';
	
	import { tokenExpire } from '../mixins/h_token_expire.js';	

	export default {
		name: 'Account',
		mixins: [ tokenExpire ],
		data(){
			return {					
				isEditing : false,
				isDeleting : false,
				progress_update : { 
					waiting : false, 
					success : false, 
					error : false },	
				progress_delete : { 
					waiting : false, 
					success : false, 
					error : false },					
				account : {
					Name : { show : true, isRequired : true, value : '' },
					Email : { show : true, isRequired : true, value : '' },
					Password : { show : true, isRequired : true, value : '' },
				}								
			}
		},
		computed : {
			button_undo_label : function(){
				return (this.isEditing ? 'undo' : 'edit');
			},
		},
		created(){
		},	
		mounted() {
			this.get_user();
		},	
		methods:{
			popup_delete : function(){
				this.isDeleting = true;
			},
			hide_delete : function(){
				this.isDeleting = false;
			},			
			get_user : function(){
				let user = this.$store.getters['user/get_user'];
				this.account.Name.value = user.name;
				this.account.Email.value = user.email;
			},
			edit_switch : function(){
				this.isEditing = !this.isEditing;
			},
			button_reset_update : function(){
				let self = this;
				setTimeout( function(){
					self.progress_update.waiting = false;
					self.progress_update.success = false;
					self.progress_update.error = false;
				}, 1000);
			},			
			button_reset_delete : function(){
				let self = this;
				setTimeout( function(){
					self.progress_delete.waiting = false;
					self.progress_delete.success = false;
					self.progress_delete.error = false;
				}, 1000);
			},		
			
			onSubmit_update : function( event ){
				let self = this;
				this.progress_update.waiting = true;
				this.$request.request_url_form( event, function(error, result){

					self.button_reset_update();

					if( error ){

						self.expired_token_check( error );

						self.progress_update.error = true;
						self.$refs.messageBtn.$emit('message', { class: "error text-negative" , message : error.message });
						// todo future retry if its server issue?
						// else spawn a message
						return;
					}

					self.progress_update.success = true;
					self.$refs.messageBtn.$emit('message', { class: "success text-positive" , message : result.message });

					setTimeout( function(){
						self.$store.dispatch('user/login_success', result.token);
						self.$router.push( '/' );
					}, 1000);

				});
			},
			onSubmit_delete : function( event ){
				let self = this;
				let object = {
					url : '/api/account/?_method=DELETE',
					method : 'POST',
					body : '' };
				this.progress_delete.waiting = true;	

				this.$request.request_url( object, function(error, result){

					if( error ){

						if( self.expired_token_check( error )){
							setTimeout( function(){
								self.hide_delete();
							}, 1400);
						}

						self.progress_delete.error = true;
						self.$refs.messageBtnDel.$emit('message', {class:'error text-negative', message: error.message});
						// todo future retry if its server issue?
						// else spawn a message
						return;
					}

					self.progress_delete.success = true;
					self.$refs.messageBtnDel.$emit('message', {class:'success text-positive', message: result.message});

					self.button_reset_delete();
					
					setTimeout( function(){
						self.hide_delete();
					}, 1400);

					setTimeout( function(){				
						self.$store.dispatch('user/logout_success');
						self.$router.push( '/' );
					}, 1900);

				});
			},
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-popup' : PopUp,			
			'c-account-input' : AccountInput, 
			'c-account-text' : AccountText,
			'c-message' : Message,						 
		},
}
</script>