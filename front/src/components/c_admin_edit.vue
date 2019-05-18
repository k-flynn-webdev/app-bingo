<template>
	
	<div>

		<c-popup style="z-index:100;" class="admin"
			v-if=show_delete 
			v-bind:onClick=hide_delete>
			 
			<div slot="header">
				Delete user
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

		<c-popup class="admin"
			v-if=show_edit 
			v-bind:onClick=hide_edit>

			<div slot="header">
				Edit user
			</div>

			<div slot="no-margin" style="margin:0 !important;padding:0 !important;">
				
				<form 
					class="form"
					v-bind:action=form_url 
					method ="POST" 
					@submit.prevent = "onSubmit_update">

					<div class="field">
						<p class="text label">Name:</p>
						<input class="text" type="string" name="name" placeholder="Name" v-bind:value=name>
					</div>
					<div class="field">
						<p class="text label">Email:</p>
						<input class="text" type="email" name="email" placeholder="Email" v-bind:value=email>
					</div>	
					<div class="field">
						<p class="text label">Role:</p>
						<input class="text" type="string" name="role" placeholder="Role" v-bind:value=role>
					</div>
					<div class="field">
						<p class="text label">Created:</p>
						<input class="text" type="date" name="created" placeholder="Role" v-bind:value=created>
					</div>
					<div class="field">
						<p class="text label">Updated:</p>
						<input class="text" type="date" name="updated" placeholder="Role" v-bind:value=updated>
					</div>
					<div class="field">
						<p class="text label">Login:</p>
						<input class="text" type="date" name="login" placeholder="Role" v-bind:value=login>
					</div>
					<div class="field">
						<p class="text label">ID:</p>
						<input class="text" type="string" name="id" placeholder="ID" v-bind:value=id_user>
					</div>

					<div class="flex-row flex-row-between">

						<c-button 
							class="colour-positive-bg" 
							type="submit" 
							v-bind:progress=progress_update>
							Update 
						</c-button>

						<c-button 
							class="colour-negative-bg" 
							type="button"
							v-bind:onClick=popup_delete 
							v-bind:progress=progress_delete>
							Delete
						</c-button>

					</div>	

					<c-message ref="messageBtn"></c-message>	

				</form>

			</div>

			<div slot="footer">
			</div>

		</c-popup>

	</div>
		
</template>

<script>

	import Button from '../components/c_button.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';

	import { tokenExpire } from '../mixins/h_token_expire.js';	

	export default {
		name: 'cAdminEdit',
		mixins: [ tokenExpire ],		
		data(){
			return {
				data : { 
					id : '', 
					name : '',
					email : '', 
					role : '',
					created : '',
					updated : '',
					login : '' },
				show_edit : false,
				progress_update : { 
					waiting : false, 
					success : false, 
					error : false },
				show_delete : false,			
				progress_delete : { 
					waiting : false, 
					success : false, 
					error : false },	
			}
		},
		mounted(){
			this.$root.$on('userAdminSelect', this.show_user );	
		},		
		computed : {
			name : function(){
				return this.data.name;
			},
			email : function(){
				return this.data.email;
			},
			role : function(){
				return this.data.role;
			},	
			created : function(){
				return new Date( this.data.created ).toISOString().split('T')[0];
			},	
			updated : function(){
				return new Date( this.data.updated ).toISOString().split('T')[0];
			},
			login : function(){
				return new Date( this.data.login ).toISOString().split('T')[0];
			},	
			id_user : function(){
				return this.data.id;
			},	
			form_url : function(){
				return ('/api/admin/user/' + this.id_user + '?_method=PUT');
			},																
		},
		methods:{
			popup_edit : function(){
				this.show_edit = true;
			},
			hide_edit : function(){
				this.show_edit = false;
			},
			popup_delete : function(){
				this.show_delete = true;
			},
			hide_delete : function(){
				this.show_delete = false;
			},
			show_user : function( input ){
				this.data.name = input.name;
				this.data.email = input.email;
				this.data.id = input.id;
				this.data.role = input.role;
				this.data.created = input.date.created;
				this.data.updated = input.date.updated;
				this.data.login = input.date.login;

				this.popup_edit();
			},
			button_update_reset : function(){
				let self = this;
				setTimeout( function(){
					self.progress_update.waiting = false;
					self.progress_update.error = false;
					self.progress_update.success = false;
				}, 1000);
			},
			button_delete_reset : function(){
				let self = this;
				setTimeout( function(){
					self.progress_delete.waiting = false;
					self.progress_delete.error = false;
					self.progress_delete.success = false;
				}, 1000);
			},			
			onSubmit_update : function( event ){
				this.progress_update.waiting = true;
				let self = this;
				this.$request.request_url_form( event, function(error, result){

					self.button_update_reset();

					if( error ){
						self.expired_token_check( error );						
						self.progress_update.error = true;
						self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
						// todo future retry if its server issue?
						// else spawn a message
						return;
					}

					self.$refs.messageBtn.$emit('message', { class : 'success text-positive', message : result.message });
					self.progress_update.success = true;				
					self.$root.$emit('userChanged');					

					setTimeout( function(){
						self.hide_edit();	
					},2300);

				});
			},
			onSubmit_delete : function( event ){
				let self = this;
				let object = {
					url : ('/api/admin/user/' + this.id_user + '?_method=DELETE'),
					method : 'POST',
					body : '' };
				this.progress_delete.waiting = true;	

				this.$request.request_url( object, function(error, result){
					self.button_delete_reset();

					if( error ){
						self.expired_token_check( error );						
						self.progress_delete.error = true;
						self.$refs.messageBtnDel.$emit('message', { class : 'error text-negative', message : error.message });
						// todo future retry if its server issue?
						// else spawn a message
						return;
					}

					self.$refs.messageBtnDel.$emit('message', { class : 'success text-positive', message : result.message });
					self.progress_delete.success = true;
					self.$root.$emit('userChanged');	

					setTimeout( function(){
						self.hide_delete();	
					},2000);

					setTimeout( function(){
						self.hide_edit();	
					},2300);
					
				});
			},		
		},
		components: {
			'c-button' : Button,
			'c-popup' : PopUp,			
			'c-message' : Message,
		},		
}
</script>

<style>
</style>
