<template>

	<div class="field-result">

		<div class="field">

			<slot name="pre"></slot>

			<input
				ref="input"
				class="input text colour-fill-dark"
				type="string"
				v-bind:placeholder=placeholder
				v-bind:value=value
				v-on:input=input
				v-on:change=change>

			<slot name="post"></slot>	

			<c-field-result>
			</c-field-result>

		</div>

	</div>

</template>

<script>

import FieldResult from '../components/c_field_result.vue';

export default {
	name: 'cFieldName',
	props : {
		value : String,
		placeholder : String,
	},
	methods : {
		input : function(){
			this.$emit('input', this.$refs.input.value );	
		},		
		change : function(){
			this.$emit('change', this.$refs.input.value );	
		},
	},
	components: {
		'c-field-result' : FieldResult,
	},		
}

</script>

<style>


</style>

