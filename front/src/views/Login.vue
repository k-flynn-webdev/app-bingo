<template>

	<section>

		<c-panel>

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

			<p class="colour-fill-dark text">
				Dont have an account, why not 

				<router-link 
					class="colour-fill-dark text-bold text-link"
					to="/register">
						register?
				</router-link>

			</p>


			<c-button
				ref="btnOK"
				slot="footer"
				class="button-action"
				v-bind:onClick=validate_form>
					Login
			</c-button>

		</c-panel>


	</section>

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
		name: 'Login',
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
					email : '',
					password : '',
				},			
			}
		},
	
		methods:{

			init : function(){

				let action = {
					url : '/api/account/login',
					method : 'POST',
					JSON : true,
					body : {
						email : '',
						password : '',
					} };

				this.attrs.action = action;

				let self = this;

				setTimeout( function(){
					self.$root.$emit('page-title', 'login');	
				}, .5*1000);

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

				let email = this.validate_email( this.form.email ) || false;
				let password = this.validate_password( this.form.password ) || false;

				if( !email ){
					this.validate_email('x');
				}
				if( !password ){
					this.validate_password('x');
				}

				if( email && password ){

					this.attrs.action.body = this.form;

					let self = this;
					self.onSubmit( self.attrs.action, self, null, null, self.login_success, self.login_error );

				} else {
					this.$refs.msgObj.$emit('message' , { class : 'fail', message : 'Missing details.' });
				}

			},

			login_success : function( input ){
				this.$refs.btnOK.$emit( 'state', 'message', 'GREAT' );
				this.$refs.msgObj.$emit('message', { class : 'success', message : input.message });

				this.$store.dispatch('user/login_success', input.token);

				let self = this;
				setTimeout( function(){
					self.$router.push( '/');
				}, 1.5*1000 );
			},
			login_error : function( input ){
				this.$refs.btnOK.$emit( 'state', 'message', 'ERROR' );
				this.$refs.msgObj.$emit('message', { class : 'error', message : input.message });
			},

		},
		mounted(){
			this.init();
		},
		components: {
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


