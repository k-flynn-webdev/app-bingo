<template>

	<c-panel>

		<template slot="header">
			Create Board
		</template>

		<div 
			ref="name"
			class="field">
			
			<p class="text label colour-fill-bg-inv"> Name: </p>
			<input 
				class="text colour-fill-bg-inv text-input"
				
				type="string"
				placeholder="Board Name here" 
				v-model=form.name_string
				v-on:change=onValidate_name
				required>

				<c-field-result></c-field-result>

		</div>

		<div class="field-column">
			
			<span class="label">

				<p class="text label colour-fill-bg-inv" style="display:inline-block;">
					Phrases or Words
				</p>

				<div 
					class="input-add colour-bg-inv add-btn anim-3"
					v-on:click=words_add>
					<div class="pin">
						<span class="colour-bg"></span>
						<span class="colour-bg"></span>
					</div>
				</div>

			</span>

			<div 
				class="field-alt"
				ref="wordsParent">

					<textarea 
						class="text colour-fill-bg-inv text-input"
						style="height: 5.5rem;border-bottom: 1px solid var( --colour-inv );"
						ref="words"
						type="string"
						placeholder="Separate with , new line or use the +" 
						v-model=form.word_string
						v-on:change=words_update
						required>				

					</textarea>

					<c-field-result></c-field-result>

			</div>
			


		</div>

		<br>

		<div slot="footer">

			<div class="br-small"></div>

			<div class="tags phrases">

				<transition-group name="tag">

					<c-tag
						v-for="(word, index) in words" :key="word">
							{{ word }}
					</c-tag>

				</transition-group>	

			</div>

		</div> 

 			<c-button 
 				ref="btnSubmit"
 				v-bind:onClick=onCreate>
 				Create
 			</c-button>

			<!-- <c-message ref="msgSubmit"></c-message> -->

	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	// import Message from '../components/c_message.vue';
	import Tag from '../components/c_tag.vue';
	import FieldResult from '../components/c_field_result.vue';

	import { submit } from '../mixins/h_submit.js';


	export default {
		name: 'BoardCreate',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
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
					name_string : '',
					word_string : '',
				},
				words : [],		
				min_word_length : 3,
			}
		},
		methods:{
			init : function( urls ){
				if( !this.state.init ){
					let object = {
						url : ('/api/board/create' ),
						method : 'POST',
						JSON : true,
						body : {
							name : '',
							words : '',
						},
					};
					this.attrs.action = object;
					this.state.init = true;
				}
			},


			onValidate_name : function(){
				if( this.form.name_string.length === 0) {
					this.$refs.name.className = 'field';
					return false;
				}

				return this.onValidate_name_check();
			},
			onValidate_name_check : function(){
				if( this.form.name_string.length > this.min_word_length ){
					this.$refs.name.className = 'field pass';
					return true;
				} else {
					this.$refs.name.className = 'field fail';
					return false;
				}
			},

			onValidate_words : function(){
				if( this.form.word_string.length === 0) {
					this.$refs.wordsParent.className = 'field-alt';
					return false;
				}
				return this.onValidate_words_check();
			},
			onValidate_words_check : function(){
				if( this.form.word_string.length > this.min_word_length ){
					this.$refs.wordsParent.className = 'field-alt pass';
					return true;
				} else {
					this.$refs.wordsParent.className = 'field-alt fail';
					return false;
				}
			},
			validate_reset : function(){
				let self = this;
				setTimeout( function(){
					if( !self.onValidate_name_check() ){
						self.$refs.name.className = 'text-area';	
					}
					if( !self.onValidate_words_check() ){
						self.$refs.words.className = 'text-area';	
					}
				}, self.attrs.server.timing );
			},

			onCreate : function( event ){
				if( 
					this.attrs.action.url !== undefined 
					&& this.onValidate_name_check()
					&& this.onValidate_words_check() ){

					this.attrs.action.body.name = this.form.name_string;
					this.attrs.action.body.words = this.form.word_string;

					let self = this;	
					this.onSubmit( this.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);

				} else {
					this.validate_reset();
				}
			},
			onSuccess : function( input ){
				let self = this;
				self.$refs.btnSubmit.$emit( 'state' , 'message', 'Enjoy!' );				
				setTimeout( function(){
					self.$router.push( '/board/' +  input.data.url);
				}, 3000 );
			},
			onError : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){
					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit();
					}, self.attrs.server.timing );
				}
			},

			words_add : function(){
				this.form.word_string += ',\n';
				this.$refs.words.focus();
			},
			words_update : function(){
				this.onValidate_words();
				this.words = [];
				let temp = this.form.word_string.split(/[,\n\r]+/);
				for( let count=0;count<temp.length;count++){
					if( temp[count].length >= this.min_word_length){
						this.words.push( temp[count] );
					}
				}
			},
		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			// 'c-message' : Message,
			'c-tag' : Tag,
			'c-field-result' : FieldResult,
		},		
}
</script>

<style>

.text-area {
	transition: .4s;
	overflow: auto;
	border-bottom: 1px solid transparent;
}



.add-btn {
}
.add-btn:hover {
	transform: scale(1.1);
}
.add-btn:active {
	transform: scale(1.2) rotateZ(-33deg);
	background-color: var( --colour-input );

}
.phrases .tag:nth-child(2){
	opacity: 0.5;
}
.phrases .tag:nth-child(n+3):nth-child(-n+4){
	opacity: 0.4;
}
.phrases .tag:nth-child(n+5):nth-child(-n+6){
	opacity: 0.2;
}
.phrases .tag:nth-child(n+7):nth-child(-n+8){
	opacity: 0.1;
}
.phrases .tag:nth-child(n+9):nth-child(-n+10){
	opacity: 0.05;
}
.phrases .tag:nth-child(n+11){
	display: none;
}

</style>

