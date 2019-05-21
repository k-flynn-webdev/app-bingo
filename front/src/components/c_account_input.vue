<template>

	<div class="account-input">
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
				v-bind:required=input.password.isRequired
				v-on:change=validate_password>

			<c-field-result></c-field-result>

		</div>

	</div>

</template>

<script>

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
				},
				result : {
					name : false,
					email : false,
					password : false,
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
			}
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

			validate_name : function(){
				let model = this.form.name;
				let elementClass = this.$refs.field_name;
				let result = this.validate_length( model, elementClass, this.attrs.name );
				if( result ){
					this.result.name = true;
				} else {
					this.result.name = false;
				}
			},
			validate_email : function(){
				let model = this.form.email;
				let elementClass = this.$refs.field_email;

				let result = this.validate_length( model, elementClass, this.attrs.name );
				if( result === null || !result ){
					this.result.email = false;
					return;
				}

				if( model.indexOf('@') < 0){
					this.set_element_fail( elementClass );
					this.result.email = false;
					return;
				}
				if( model.indexOf('.') < 0 || 
					model.endsWith('.') ){
					this.set_element_fail( elementClass );
					this.result.email = false;
					return;
				}
				this.result.email = true;
				
			},
			validate_password : function(){
				let model = this.form.password;
				let elementClass = this.$refs.field_password;
				let result = this.validate_length( model, elementClass, this.attrs.password );
				if( result ){
					this.result.name = true;
				} else {
					this.result.name = false;
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

			validate_length : function( value, element, length ){

				if( value.length === 0 ){
					this.set_element_default( element );
					return null;
				}
				if( value.length < length ){
					this.set_element_fail( element );
					return false;
				}
				if( value.length < this.attrs.max ){
					this.set_element_pass( element );
					return true;
				}
			}
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

