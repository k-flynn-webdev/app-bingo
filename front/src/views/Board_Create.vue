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
				v-bind:key="word.id"
				v-bind:ref="'word_'+index"
				v-model=form.words[index].value 
				v-on:change=validate_word(index)>


					<button
						v-if=form.words[index].state.add
						slot="post"
						class="button shadow fade-in colour-bg-dark border-round" 
						v-on:click=add_word(index)
						style="min-width:unset;">
							<p class="label colour-fill-pop">Add</p>
					</button>

					<button 
						v-if=form.words[index].state.remove
						slot="post" 
						class="button shadow fade-in colour-bg-dark border-round" 
						v-on:click=remove_word(index)
						style="min-width:unset;">
							<p class="label colour-fill-pop">X</p>
					</button>


			</c-field-input>







	</div>


	<c-message 
		ref="msgObj">
	</c-message>


	<div class="sections anim-3"
		v-bind:data-open=sections_end
		v-bind:class="{ 'is-active' : sections_end }">
			
			<br>

			<c-button
				ref="btnOK"
				class="button-action"
				v-bind:onClick=submit>
					Submit
			</c-button>
			
	</div>		







	</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import FieldInput from '../components/c_field.create.input.vue';

	import { submit } from '../mixins/h_submit.js';

	import Validate from '../helpers/h_validate_input.js';
	import Random from '../helpers/h_random_id.js';


	export default {
		name: 'BoardCreate',
		mixins: [ submit ],
		data(){
			return {
				form : {
					name : '',
					words : [],
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
					sections : [ false, false, false ],
					words : 0,
				},
			}
		},

		computed : {
			word_count : function(){
				return '(' + this.state.words + '/' + this.attrs.words.min + ')';
			},

			sections_end : function(){
				let result = true;
				for( let i = 0; i < this.state.sections.length; i++ ){
					if( !this.state.sections[i] ){
						result = false;
					}
				}
				return result;
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

				this.create_word();
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

				let result = Validate.length( this.$refs[refWord][0] , this.form.words[index].value, this.$refs.msgObj, this.attrs.word.min, this.attrs.word.max );

				if( result === null || !result ){
					this.form.words[index].state.ready = false;
				} 

				if( result ){
					this.form.words[index].state.ready = true;
				}

				this.check_word_count();

				return result;
			},

			check_word_count : function(){
				this.state.words = 0;
				for( let i =0;i < this.form.words.length;i++){
					if( this.form.words[i].state.ready ){
						this.state.words +=1;
					}
				}

				if( this.state.words >= this.attrs.words.min ){
					this.section_display( 2 , true );
				} else {
					this.section_display( 2 , false );
				}
			},


			create_word : function(){
				let wordObj = { id : Random.id(3), value : '', state : { add : true, remove : false, ready : false } };
				this.form.words.push( wordObj );
			},

			add_word : function( index ){
				let refWord = 'word_' + index;
				let result = this.validate_word( index );

				if( result === null ){
					Validate.length( this.$refs[refWord][0] , 'x', this.$refs.msgObj, this.attrs.word.min, this.attrs.word.max );
					return
				}

				if( result ){
					this.create_word();
					this.form.words[index].state.add = false;
					this.form.words[index].state.remove = true;
					this.form.words[index].state.ready = true;
					Validate.reset( this.$refs[refWord][0] );
				}

				this.check_word_count();
			},

			remove_word : function( index ){
				this.form.words.splice( index, 1);

				this.check_word_count();
			},

			submit : function(){

			},






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
			'c-field-input' : FieldInput,
		},		
}
</script>

<style>

.sections {
	opacity: 0;
	height: 1px;
	margin: var(--margin) 0;
}

.sections.is-active {
	opacity: 1;
	height: auto;
}


</style>

