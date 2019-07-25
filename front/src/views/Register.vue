<template>

	<c-panel>

		<div ref="field_name" class="field-result">

			<div 
				class="field">

				<p class="label colour-fill-dark label-account">
					Name
				</p>

				<input
					class="input text colour-fill-dark"
					type="string"
					placeholder="Your name"
					value=form.name
					v-model=form.name
					v-on:change=validate_name(form.name)
					required>

				<c-field-result>
				</c-field-result>

			</div>

		</div>


		<div ref="field_email" class="field-result">

			<div 
				class="field">

				<p class="label colour-fill-dark label-account">
					Email
				</p>

				<input
					class="input text colour-fill-dark"
					type="email"
					placeholder="Your email"
					value=form.email
					v-model=form.email
					v-on:change=validate_email(form.email)
					required>

				<c-field-result>
				</c-field-result>

			</div>

		</div>


		<div ref="field_password" class="field-result">

			<div 
				class="field">

				<p class="label colour-fill-dark label-account">
					Password
				</p>

				<input
					class="input text colour-fill-dark"
					type="password"
					placeholder="Your password"
					value=form.password
					v-model=form.password
					v-on:change=validate_password(form.password)
					required>

				<c-field-result>
				</c-field-result>

			</div>

		</div>


		<c-message
			ref="msgObj">
		</c-message>


		<br>


		<c-button
			ref="btnOK"
			slot="footer"
			class="button-action"
			v-bind:onClick=validate_form>
				Submit
		</c-button>
		

	</c-panel>

</template>

<script>

	import Panel from '../components/c_panel.vue';
	import Button from '../components/c_button.vue';
	import ButtonRow from '../components/c_button_row.vue';
	import PopUp from '../components/c_popup.vue';
	import Message from '../components/c_message.vue';

	import Validate from '../helpers/h_validate_input.js';
	import FieldResult from '../components/c_field_result.vue';

	import { submit } from '../mixins/h_submit.js';


	export default {
		name: 'Register',
		mixins: [ submit ],		
		data(){
			return {
				attrs : {
					name : {
						min : 6,
						max : 40,
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
					name : '',
					email : '',
					password : '',
				},			
			}
		},
	
		methods:{

			init : function(){

				let action = {
					url : '/api/account/create',
					method : 'POST',
					JSON : false };

				this.attrs.action = action;

				let self = this;

				setTimeout( function(){
					self.$root.$emit('page-title', 'register');	
				}, .5*1000);

			},



			validate_name : function( input ){
				let result = Validate.length( this.$refs.field_name, input, this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );
				return result;
			},
			validate_email : function( input ){
				let result = Validate.email( this.$refs.field_email, input, this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );
				return result;
			},
			validate_password : function( input ){
				let result = Validate.length( this.$refs.field_password, input, this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );
				return result;
			},


			validate_form : function(){

				let name = this.validate_name( this.form.name ) || false;
				let email = this.validate_email( this.form.email ) || false;
				let password = this.validate_password( this.form.password ) || false;

				if( !name ){
					this.validate_name('x');
				}
				if( !email ){
					this.validate_email('x');
				}
				if( !password ){
					this.validate_password('x');
				}

				if( name && email && password ){
					console.log('great');

					self.onSubmit( self.attrs.action, self, null, null, self.register_success, self.register_error );


				} else {
					this.$refs.msgObj.$emit('message' , { class : 'fail', message : 'Missing details.' });
				}

			},

			register_success : function( input ){

			},
			register_error : function( input ){

			},


			// init : function(){
			// 	if( !this.state.init ){
			// 		let object = {
			// 			url : ('/api/account/create' ),
			// 			method : 'POST',
			// 			JSON : true,
			// 			body : {
			// 				name : '',
			// 				email : '',
			// 				password : '',
			// 			},
			// 		};
			// 		this.attrs.action = object;
			// 		this.state.init = true;
			// 	}
			// },


			// onLogin : function( event ){

			// 	if( !Validate.email( this.form.email.value ) || 
			// 		!Validate.length( this.form.password.value, this.attrs.validate.password, 100 ) ||
			// 		!Validate.length( this.form.name.value, this.attrs.validate.name, this.attrs.validate.max )){
			// 		return;
			// 	}

			// 	this.attrs.action.body.name = this.form.name.value;
			// 	this.attrs.action.body.email = this.form.email.value;
			// 	this.attrs.action.body.password = this.form.password.value;

			// 	let self = this;	
			// 	this.onSubmit( this.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);

			// },
			// onSuccess : function( input ){
			// 	let self = this;
			// 	self.$refs.btnSubmit.$emit( 'state' , 'message', 'Hello!' );
			// 	self.$store.dispatch('user/login_success', input.token);
			// 	setTimeout( function(){
			// 		self.$router.push( '/');
			// 	}, 2000 );
			// },
			// onError : function( input ){

			// 	if( this.state.timeouts < this.attrs.server.max_timeouts ){

			// 		this.$refs.btnSubmit.$emit( 'state' , 'message', 'Error!' );

			// 		if( input.status !== 408 ){
			// 			return;
			// 		}

			// 		// let self = this;
			// 		// setTimeout( function(){
			// 		// 	self.state.timeouts +=1
			// 		// 	self.onSubmit(self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
			// 		// }, self.attrs.server.timing );
			// 	}
			// },



		},
		mounted(){
			this.init();
		},
		components: {
			// 'c-account-input' : AccountInput, 
			'c-button' : Button,
			'c-message' : Message,
			'c-panel' : Panel,
			'c-field-result' : FieldResult,
		},		
}
</script>


<style scoped>
	
	.label-account {
		min-width: 5rem !important;
	}

</style>

