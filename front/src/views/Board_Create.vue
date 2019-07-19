<template>

	<c-panel>

		<div class="sections anim-3"
			v-bind:data-open=state.sections[0]
			v-bind:class="{ 'is-active' : state.sections[0] }">

			<c-field-input 
				ref="field_name"
				v-model=form.name 
				v-on:change=validate_name>

				<p class="label" slot="pre"> Name </p>

			</c-field-input>

		</div>


		<div class="sections anim-3"
			v-bind:data-open=state.sections[1]
			v-bind:class="{ 'is-active' : state.sections[1] }">


			<p class="label colour-fill-dark">
				Words and Phrases

				<span 
					class="label colour-fill-dark"
					v-if=!state.complete> {{ word_count }} </span>

			</p>

			

			<c-field-input 
				v-for="(word, index) in form.words" 
				v-bind:key="index"
				v-bind:ref="'word_'+index"
				v-model=form.words[index] 
				v-on:change=validate_word(index)>


					<button
						v-if=state.buttons[index] 
						slot="post" 
						class="button shadow fade-in colour-bg-dark border-round" 
						v-on:click=add_word(index)
						style="min-width:unset;">
							<p class="label colour-fill-pop">Add</p>
					</button>

					<button 
						v-if=!state.buttons[index]
						slot="post" 
						class="button shadow fade-in colour-bg-dark border-round" 
						v-on:click=remove_word(index)
						style="min-width:unset;">
							<p class="label colour-fill-pop">X</p>
					</button>


			</c-field-input>



			

			<div 
				v-if=state.complete
				class="text-right button-add">
				<button 
					v-on:click=submit
					class="button shadow fade-in colour-bg-dark border-round">
						<p class="label colour-fill-pop"> 
							Ready
						</p>
				</button>
			</div>



		</div>


		



<!-- 		<div 
			class="text-right button-next">

				<button 
					v-on:click=name_next
					class="button shadow fade-in colour-bg-dark border-round">
					<p class="label colour-fill-pop"> 
						Next
					</p>
				</button>

		</div> -->




<!-- 

		<div class="sections anim-3"
			v-bind:data-open=state.sections[1]
			v-bind:class="{ 'is-active' : state.sections[1] }">
		



			<div ref="field_words" class="field-result">

				<div 
					class="field">

					<input
						class="input text colour-fill-dark"
						type="string"
						placeholder="Choose a phrase or word"
						required>

					<c-field-result>
					</c-field-result>

				</div>

			</div>





			<div class="text-right button-add">
				<button 
					v-on:click=word_add
					class="button shadow fade-in colour-bg-dark border-round">
						<p class="label colour-fill-pop"> 
							Add
						</p>
				</button>
			</div>



		</div> -->

		<!-- <div ref="field_words" class="field-result"> -->

			<!-- <div 
				v-bind:class="{ 'is-visible' : state.word_phrase.display }"
				class="field reveal anim-6">

				<p class="label colour-fill-dark">
					Words or Phrases
				</p>

				<input
					class="input text colour-fill-dark"
					type="string"
					placeholder="Choose a phrase or word"
					value=form.words
					v-model=form.words
					v-on:change=validate_words
					required>

				<c-field-result>
				</c-field-result>

			</div> -->

		<!-- </div> -->



		<c-message 
			ref="msgObj">
		</c-message>



<!-- 		<div 
			slot="footer"
			class="text-right button-next">

				<button 
					v-on:click=name_next
					class="button shadow fade-in colour-bg-dark border-round">
					<p class="label colour-fill-pop"> 
						Next
					</p>
				</button>

		</div> -->




<!-- 		<c-button
			slot="footer"
			ref="btnOK"
			class="button-action">
				<p class="colour-fill-bg-inv label">
					Submit
				</p>
		</c-button> -->


<!-- 		<form 
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



			<div class="br-small"></div>

 			<c-button 
 				ref="btnSubmit">
 				Create
 			</c-button>

	 	</form>		 -->


	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import FieldInput from '../components/c_field.create.input.vue';

	import { submit } from '../mixins/h_submit.js';

	import Validate from '../helpers/h_validate_input.js';


	export default {
		name: 'BoardCreate',
		mixins: [ submit ],
		data(){
			return {
				form : {
					name : '',
					words : [{ 	
						id : '',
						value : '',
						state : {
							add : false, 
							x : false, 
							ready : false	
						}}],
				},
				attrs : {

					name : {
						min : 5,
						max: 30,
					},	

					word : {
						min : 5,
						max: 80,
					},

					words : {
						min : 8,
						max: 40,
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

					sections : [ false, false, ],
					complete : false,
				},
			}
		},

		computed : {
			word_count : function(){
				let min = this.attrs.words.min;
				let current = 0;

				for( let i = 0; i < this.state.buttons.length; i++){
					if( !this.state.buttons[i] ){
						current +=1;
					}
				}
				
				if( current >= min ){
					this.state.complete = true;
				} else {
					this.state.complete = false;
				}

				return '(' + current + '/' + min + ')';
			},
			// name_pattern : function(){
			// 	let pattern = '.{' + this.attrs.name.min + ',' + this.attrs.name.max + '}';
			// 	return pattern;
			// },
			// name_title : function(){
			// 	let title = "name must be between " + this.attrs.name.min + " and " + this.attrs.name.max + " characters long."
			// 	return title;
			// },			
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

				this.section_display( 0 , true );

				let self = this;
				setTimeout( function(){
					self.$root.$emit('page.title', 'CREATE');	
				}, .5*1000);			
			},



			section_display : function( index, val ){
				let self = this;
				setTimeout( function(){
					self.$set( self.state.sections, index, val );
				}, 1*1000);
			},



			validate_name : function(){
				let result = Validate.length( this.$refs.field_name, this.form.name, this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );

				if( result === null || !result ){
					this.section_display( 1 , false );
				} else {
					this.section_display( 1 , true );
				}
				return result;
			},

			validate_word : function( index ){
				let refWord = 'word_' + index;

				let result = Validate.length( this.$refs[refWord][0] , this.form.words[index], this.$refs.msgObj, this.attrs.word.min, this.attrs.word.max );

				if( result === null || !result ){
					// this.section_display( 1 , false );
				}
				return result;
			},

			check_word_count : function(){
				for( let i =0;i < this.form.words.length;i++){

				}
			},


			add_word : function( index ){

				// todo need a unique id per row to be generated not based on contents?

				let refWord = 'word_' + index;
				let result = this.validate_word( index );

				if( result === null ){
					Validate.length( this.$refs[refWord][0] , 'x', this.$refs.msgObj, this.attrs.word.min, this.attrs.word.max );
					return
				}

				if( result ){
					this.form.words.push('');
					this.$set( this.state.buttons, index, false );
					this.state.buttons.push( true );
					Validate.reset( this.$refs[refWord][0] );
				}
			},

			remove_word : function( index ){
				this.form.words.splice( index, 1);
				this.state.buttons.splice( index, 1);
				for( let i =0; i < this.state.buttons.length; i++){
					this.$set( this.state.buttons, i, false );
				}
				this.$set( this.state.buttons, this.state.buttons.length - 1, true );
			},

			submit : function(){

			},

			// name_next : function(){
			// 	// todo should be next section and programmaticly find?
			// 	let result = this.validate_name();

			// 	if( result === null ){
			// 		Validate.length( this.$refs.field_name, 'x', this.$refs.msgObj, this.attrs.name.min, this.attrs.name.max );
			// 		return;
			// 	}	

			// 	if( result ){
			// 		this.section_display( 1 , true );
			// 	}		
			// },

			// word_add : function(){
			// 	// todo adds a new  form element of phrase ..
			// },






			// validate_words : function(){
			// 	let result = Validate.length( this.$refs.field_words, this.form.words, this.$refs.msgObj, this.attrs.word_phrase.min, this.attrs.word_phrase.max );

			// 	return result;
			// },
			// word_next : function(){
			// 	let result = this.validate_name();
			// 	if( result ){
			// 		console.log('test');
			// 	}			
			// },



			// words_add : function(){
			// 	this.input.words.value += ',\n';
			// 	this.$refs.words.focus();
			// },

			// validate_name : function(){
			// 	let model = this.input.name.value;
			// 	let elementClass = this.$refs.name;

			// 	let result = Validate.length( model, this.attrs.name.min, this.attrs.name.max );

			// 	this.validate_result( result, elementClass );
			// 	return result;
			// },

			// validate_words : function(){
			// 	let model = this.input.words.value;
			// 	let elementClass = this.$refs.wordsParent;
			// 	let temp = this.input.words.value.split(/[,\n\r]+/);

			// 	let wordsClean = [];
			// 	for( let b = 0; b < temp.length; b++){
			// 		let word = temp[b].trim();
			// 		if( word.length > 0 ){
			// 			wordsClean.push( word );
			// 		}
			// 	}

			// 	// has min amount of words/prhases?
			// 	if( wordsClean.length < this.attrs.words_or_prases.min ){
			// 		this.validate_result( false, elementClass );
			// 		return false;
			// 	}

			// 	//smallest word/phrase is big enough?
			// 	let min = 100;
			// 	// find smallest ..
			// 	for(let i = 0; i < wordsClean.length; i++){
			// 		if( wordsClean[i].length < min){
			// 			min = wordsClean[i].length;
			// 		}
			// 	}
			// 	if( min < this.attrs.word_or_phrase.min ){
			// 		this.validate_result( false, elementClass );
			// 		return false;
			// 	}

			// 	this.validate_result( true, elementClass );
			// 	return true;
			// },


			// validate_result : function( test, element ){
			// 	if( test === null ){
			// 		this.set_element_default( element );
			// 		return;
			// 	}
			// 	if( !test ){
			// 		this.set_element_fail( element );
			// 		return;
			// 	}
			// 	if( test ){
			// 		this.set_element_pass( element );
			// 		return;
			// 	}
			// },

			// set_element_default : function( element ){
			// 	return element.className = 'field field-result';
			// },
			// set_element_pass : function( element ){
			// 	return element.className = 'field field-result pass';
			// },
			// set_element_fail : function( element ){
			// 	return element.className = 'field field-result fail';
			// },


			// onCreate : function( event ){

				// if( this.attrs.action.url === undefined ){
				// 	return;
				// }
				// if( !this.validate_name() ){
				// 	return;
				// }
				// if( !this.validate_words() ){
				// 	return;
				// }

				// this.attrs.action.body.name = this.input.name.value;
				// this.attrs.action.body.words = this.input.words.value;

				// let self = this;	
				// self.onSubmit( self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
			// },
			// onSuccess : function( input ){
				// let self = this;
				// self.$refs.btnSubmit.$emit( 'state' , 'message', 'Enjoy!' );
				// setTimeout( function(){
				// 	self.$router.push( '/board/' +  input.data.url);
				// }, 3000 );
			// },
			// onError : function( input ){
				// if( this.state.timeouts < this.attrs.server.max_timeouts ){

				// 	this.$refs.btnSubmit.$emit( 'state' , 'message', 'Error!' );

				// 	if( input.status !== 408 ){
				// 		return;
				// 	}

				// 	let self = this;
				// 	setTimeout( function(){
				// 		self.state.timeouts +=1
				// 		self.onSubmit( self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgSubmit, self.onSuccess, self.onError);
				// 	}, self.attrs.server.timing );
				// }
			// },

		},
		mounted(){
			this.init();
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
			// 'c-field-result' : FieldResult,
			'c-field-input' : FieldInput,
		},		
}
</script>

<style>

.sections {
	opacity: 0;
	margin: var(--margin) 0;
}

.sections.is-active {
	opacity: 1;
}


</style>

