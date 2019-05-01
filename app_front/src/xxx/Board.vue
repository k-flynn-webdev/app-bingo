<template>

	<c-panel class="flex-only-on-large">
		<template slot="header">
			Create Board
		</template>

		<form 
			class="form" 
			action="/api/board/create" 
			method ="POST" 
			@submit.prevent="onSubmit">

			<div class="field">
				<p class="text label">Name:</p>
				<input class="text" type="string" name="name" placeholder="Name" required v-model=form.name_string>
			</div>	
			<div class="field">
				<p class="text label">Words:</p>
				<textarea 
					class="text" 
					required
					type="string" 
					name="words" 
					placeholder="seperate with , or space" 
					v-model=form.word_string
					v-on:change=words_update
					style="height: 3.5rem;"></textarea>
			</div>

 			<c-button ref="btnSubmit">Create</c-button>	

			<c-message ref="messageBtn"></c-message>

		</form>

		<div slot="footer">

			<div class="tags">

				<transition-group name="tag" class="tag1">

					<c-tag
						v-for="(word, index) in words" :key="word">
							{{ word }}
					</c-tag>

				</transition-group>	

			</div>

		</div>

	</c-panel>

</template>

<script>

	import Button from '../components/c_buttonNew.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';
	import Tag from '../components/c_tag.vue';

	export default {
		name: 'CreateBoard',
		data(){
			return {
				form : {
					name_string : '',
					word_string : '',
				},
				words : [],		
				min_length : 3,						
			}
		},		
		methods:{	
			words_update : function(){
				this.words = [];
				let temp = this.form.word_string.split(/[, \n\t]+/);
				for( let count=0;count<temp.length;count++){
					if( temp[count].length >= this.min_length){
						this.words.push( temp[count] );
					}
				}
				
				// this.word_input();
			},
			word_input : function( input ){
				// this.$refs.messageWrds.$emit('message', { class : 'success text-positive', message : this.form.words });
			},		
			onSubmit : function( event ){

				this.$refs.btnSubmit.$emit('state', 'waiting');

				let self = this;
				this.$request.request_url_form( event, function(error, result){

					setTimeout(function(){
						self.$refs.btnSubmit.$emit('state', 'reset');
					}, 5000);
					

					if( error ){
						self.$refs.btnSubmit.$emit('state', 'error');
						self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
						// todo future retry if its server issue?
						// else spawn a message
						return;
					}

					self.$refs.btnSubmit.$emit('state', 'success');
					self.$refs.messageBtn.$emit('message', { class : 'success text-positive', message : result.message });

				});
			},
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-tag' : Tag,
		},		
}
</script>

<style>

</style>

