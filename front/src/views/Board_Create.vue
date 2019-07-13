<template>

	<c-panel>

		<template slot="header">
			Create Board
		</template>

		<form 
			class="form" 
			action="/ignore" 
			@submit.prevent="onCreate">

			<div 
				ref="name"
				class="field field-result">
				
				<p class="text label colour-fill-bg-inv"> Name: </p>
				<input 
					class="text colour-fill-bg-inv text-input"
					
					type="string"
					placeholder="Board Name here" 
					v-model=input.name.value
					v-on:change=validate_name
					v-bind:pattern=name_pattern
					v-bind:title=name_title
					required>

				<c-field-result>
				</c-field-result>

			</div>

			<div class="field-column ">
				
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
					class="field field-result"
					ref="wordsParent">

						<textarea 
							class="text colour-fill-bg-inv text-input"
							style="height: 10rem;border-bottom: 1px solid var( --colour-inv );margin-top:-.5rem;overflow:scroll; "
							ref="words"
							type="string"
							placeholder="Add 6 or more words or phrases. Seperate with , new line or +" 
							v-model=input.words.value
							v-on:change=validate_words
							required>

						</textarea>

						<c-field-result>
						</c-field-result>

				</div>

			</div>

			<br>

			<c-message 
				ref="msgSubmit"
				class="colour-fill-bg-inv">		
			</c-message>

			<div class="br-small"></div>

 			<c-button 
 				ref="btnSubmit">
 				Create
 			</c-button>

	 	</form>		


	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import Tag from '../components/c_tag.vue';

	import { submit } from '../mixins/h_submit.js';

	import Validate from '../helpers/h_validate_input.js';
	import FieldResult from '../components/c_field_result.vue';


	export default {
		name: 'BoardCreate',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					words_or_prases : {
						min : 6,
					},
					word_or_phrase : {
						min : 3,
					},
					name : {
						min : 5,
						max: 30,
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

				input : {
					name : {
						value : '',
					},
					words : {
						value : ''
					},
				},

			}
		},
		computed : {
			name_pattern : function(){
				let pattern = '.{' + this.attrs.name.min + ',' + this.attrs.name.max + '}';
				return pattern;
			},
			name_title : function(){
				let title = "name must be between " + this.attrs.name.min + " and " + this.attrs.name.max + " characters long."
				return title;
			},			
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


			words_add : function(){
				this.input.words.value += ',\n';
				this.$refs.words.focus();
			},

			validate_name : function(){
				let model = this.input.name.value;
				let elementClass = this.$refs.name;

				let result = Validate.length( model, this.attrs.name.min, this.attrs.name.max );

				this.validate_result( result, elementClass );
				return result;
			},

			validate_words : function(){
				let model = this.input.words.value;
				let elementClass = this.$refs.wordsParent;
				let temp = this.input.words.value.split(/[,\n\r]+/);

				let wordsClean = [];
				for( let b = 0; b < temp.length; b++){
					let word = temp[b].trim();
					if( word.length > 0 ){
						wordsClean.push( word );
					}
				}

				// has min amount of words/prhases?
				if( wordsClean.length < this.attrs.words_or_prases.min ){
					this.validate_result( false, elementClass );
					return false;
				}

				//smallest word/phrase is big enough?
				let min = 100;
				// find smallest ..
				for(let i = 0; i < wordsClean.length; i++){
					if( wordsClean[i].length < min){
						min = wordsClean[i].length;
					}
				}
				if( min < this.attrs.word_or_phrase.min ){
					this.validate_result( false, elementClass );
					return false;
				}

				this.validate_result( true, elementClass );
				return true;
			},


			validate_result : function( test, element ){
				if( test === null ){
					this.set_element_default( element );
					return;
				}
				if( !test ){
					this.set_element_fail( element );
					return;
				}
				if( test ){
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


			onCreate : function( event ){

				if( this.attrs.action.url === undefined ){
					return;
				}
				if( !this.validate_name() ){
					return;
				}
				if( !this.validate_words() ){
					return;
				}

				this.attrs.action.body.name = this.input.name.value;
				this.attrs.action.body.words = this.input.words.value;

				let self = this;	
				self.onSubmit( self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
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

					this.$refs.btnSubmit.$emit( 'state' , 'message', 'Error!' );

					if( input.status !== 408 ){
						return;
					}

					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
					}, self.attrs.server.timing );
				}
			},

		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			'c-tag' : Tag,
			'c-field-result' : FieldResult,
		},		
}
</script>

<style>

/*.text-area {
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
}*/

</style>

