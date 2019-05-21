<template>

	<div 
		class="account-input"
		v-bind:form-name=form.name
		v-bind:form-email=form.email
		v-bind:form-password=form.password>

		<div 
			v-if=NameShow 
			class="field field-result"
			ref="field_name">

			<p 
				class="text label colour-fill-bg-inv">
					Name:
			</p>
			<input 
				class="text colour-fill-bg-inv text-input" 
				v-model=form.name
				type="string" 
				name="name" 
				v-bind:pattern=name_pattern
				v-bind:title=name_title
				placeholder="Name" 
				v-bind:required=input.name.isRequired
				v-on:change=validate_name>

			<c-field-result></c-field-result>

		</div>

		<div 
			v-if=EmailShow 
			class="field field-result"
			ref="field_email">

			<p 
				class="text label colour-fill-bg-inv">
					Email:
			</p>
			<input 
				class="text colour-fill-bg-inv text-input" 
				v-model=form.email
				type="email" 
				name="email" 
				placeholder="Email" 
				v-bind:required=input.email.isRequired
				v-on:change=validate_email>

			<c-field-result></c-field-result>

		</div>

		<div 
			v-if=PasswordShow 
			class="field field-result"
			ref="field_password">
			
			<p 
				class="text label colour-fill-bg-inv">
					Password:
			</p>
			<input 
				class="text colour-fill-bg-inv text-input" 
				v-model=form.password
				type="password" 
				name="password"
				placeholder="Password" 
				v-bind:pattern=password_pattern
				v-bind:title=password_title
				v-bind:required=input.password.isRequired
				v-on:change=validate_password>

			<c-field-result></c-field-result>

		</div>

	</div>

</template>

<script>


	import Validate from '../helpers/h_validate_input.js';
	import FieldResult from '../components/c_field_result.vue';

	export default {
		name: 'AccountInput',
		data(){
			return {
				attrs : {
					max : 30,
					name : 3,
					password : 7,
				},
				form : {
					name : '',
					email : '',
					password : '',
					state : false,
				},
			}
		},
		props: { 
			input : {
				name : Object,
				email : Object,
				password : Object,
			}
		},
		computed: {
			NameShow : function(){
				if( this.input.name !== undefined && this.input.name.show ){
					return true;
				}
				return false;
			},	
			EmailShow : function(){
				if( this.input.email !== undefined && this.input.email.show ){
					return true;
				}
				return false;
			},			
			PasswordShow : function(){
				if( this.input.password !== undefined && this.input.password.show ){
					return true;
				}
				return false;
			},

			name_pattern : function(){
				let pattern = '.{' + this.attrs.name + ',' + this.attrs.max + '}';
				return pattern;
			},			
			name_title : function(){
				let title = "password must be between " + this.attrs.password + " and " + this.attrs.max + " characters long."
				return title;
			},

			password_pattern : function(){
				let pattern = '.{' + this.attrs.password + ',' + '}';
				return pattern;
			},			
			password_title : function(){
				let title = "password must be " + this.attrs.password + " characters long."
				return title;
			},
		},
		methods : {
			init : function(){
				if( this.NameShow ){
					this.form.name = this.input.name.value;
				}
				if( this.EmailShow ){
					this.form.email = this.input.email.value;
				}
				if( this.PasswordShow ){
					this.form.password = this.input.password.value;
				}
			},

			// pattern : function( type ){
			// 	console.log( type );
			// 	if( type === 'name' ){
			// 		return { this.attrs.name, this.attrs.max };
			// 	}
			// 	if( type === 'password' ){
			// 		console.log( { this.attrs.password, this.attrs.max } );
			// 		return { this.attrs.password, this.attrs.max };
			// 	}
			// },

			validate_name : function(){
				let model = this.form.name;
				let elementClass = this.$refs.field_name;

				let result = Validate.length( model, this.attrs.name, this.attrs.max );

				this.validate_result( result, elementClass );
			},
			validate_email : function(){
				let model = this.form.email;
				let elementClass = this.$refs.field_email;
				let result = Validate.email( model );

				this.validate_result( result, elementClass );	
			},
			validate_password : function(){
				let model = this.form.password;
				let elementClass = this.$refs.field_password;
				let result = Validate.length( model, this.attrs.password, 100 );

				this.validate_result( result, elementClass );
			},

			validate_result : function( test, element ){
				if( test === null ){
					this.set_element_default( element );
					return;
				}
				if( !test ){
					this.form.state = false;
					this.set_element_fail( element );
					return;
				}

				if( test ){
					this.form.state = true;
					this.set_element_pass( element );
					return;
				}
			},

			set_element_default : function( element ){
				return element.className = 'field field-result';
			},
			set_element_pass : function( element ){
				return element.className = 'field field-result pass';
			},
			set_element_fail : function( element ){
				return element.className = 'field field-result fail';
			},
			
		},
		mounted() {
			this.init();
		},
		components: {
			'c-field-result' : FieldResult,
		},
	}	
</script>

<style>

	.account-input{
		margin-bottom: 1rem;
	}

</style>

