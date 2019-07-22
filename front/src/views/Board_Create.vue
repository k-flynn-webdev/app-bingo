<template>

	<c-panel>

		<div class="sections anim-6"
			v-bind:data-open=state.sections[0]
			v-bind:class="{ 'is-active' : state.sections[0] }">

			<c-field-input 
				ref="field_name"
				v-bind:placeholder=attrs.name.placeholder
				v-model=form.name
				v-on:change=validate_name>

				<p class="label" slot="pre"> Name </p>

			</c-field-input>

		</div>


		<div class="sections anim-6"
			v-bind:data-open=state.sections[1]
			v-bind:class="{ 'is-active' : state.sections[1] }">


			<p class="label colour-fill-dark">
				Words and Phrases

				<span 
					class="label colour-fill-dark"
					v-if=!state.complete> {{ line_count }} </span>

			</p>


			<c-field-input 
				v-for="(line, index) in form.lines" 
				v-bind:key="line.id"
				v-bind:ref="'line_'+index"
				v-bind:placeholder=attrs.line.placeholder
				v-model=form.lines[index].value 
				v-on:change=validate_line(index)>


					<button
						v-if=form.lines[index].state.add
						slot="post"
						class="button shadow fade-in colour-bg-dark border-round" 
						v-on:click=add_line(index)
						style="min-width:unset;">
							<p class="label colour-fill-pop">Add</p>
					</button>

					<button 
						v-if=form.lines[index].state.remove
						slot="post" 
						class="button shadow fade-in colour-bg-dark border-round" 
						v-on:click=remove_line(index)
						style="min-width:unset;">
							<p class="label colour-fill-pop">X</p>
					</button>


			</c-field-input>


	</div>


	<c-message 
		ref="msgObj">
	</c-message>


	<div class="sections anim-6"
		v-bind:data-open=sections_end
		v-bind:class="{ 'is-active' : sections_end }">
			
			<div class="br-smaall"></div>

			<c-button
				ref="btnSubmit"
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
					lines : [],
				},
				attrs : {

					name : {
						min : 5,
						max: 30,
						placeholder : 'Choose a name ..',
					},	

					line : {
						min : 5,
						max: 80,
						placeholder : 'Choose a word or phrase ..',
					},

					lines : {
						min : 8,
						max: 50,
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
					lines : 0,
				},
			}
		},

		computed : {
			line_count : function(){
				return '(' + this.state.lines + '/' + this.attrs.lines.min + ')';
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
							lines : '',
						},
					};
					this.attrs.action = object;
					this.state.init = true;
				}

				this.create_line();
				this.section_display( 0 , true );
				

				let self = this;
				setTimeout( function(){
					self.$root.$emit('page-title', 'CREATE');	
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

			validate_line : function( index ){
				let ref_line = 'line_' + index;

				let result = Validate.length( this.$refs[ref_line][0] , this.form.lines[index].value, this.$refs.msgObj, this.attrs.line.min, this.attrs.line.max );

				if( result === null || !result ){
					this.form.lines[index].state.ready = false;
				} 

				if( result ){
					this.form.lines[index].state.ready = true;
				}

				this.check_line_count();

				return result;
			},

			check_line_count : function(){
				this.state.lines = 0;
				for( let i =0;i < this.form.lines.length;i++){
					if( this.form.lines[i].state.ready ){
						this.state.lines +=1;
					}
				}

				if( this.state.lines >= this.attrs.lines.min ){
					this.section_display( 2 , true );
				} else {
					this.section_display( 2 , false );
				}
			},


			create_line : function(){
				let lineObj = { id : Random.id(3), value : '', state : { add : true, remove : false, ready : false } };
				this.form.lines.push( lineObj );
			},

			add_line : function( index ){
				let ref_line = 'line_' + index;
				let result = this.validate_line( index );

				if( result === null ){
					Validate.length( this.$refs[ref_line][0] , 'x', this.$refs.msgObj, this.attrs.line.min, this.attrs.line.max );
					return
				}

				if( result ){
					this.create_line();
					this.form.lines[index].state.add = false;
					this.form.lines[index].state.remove = true;
					this.form.lines[index].state.ready = true;
					Validate.reset( this.$refs[ref_line][0] );
				}

				this.check_line_count();
			},

			remove_line : function( index ){
				this.form.lines.splice( index, 1);

				this.check_line_count();
			},

			submit : function(){

				this.attrs.action.body.name = this.form.name;

				let lineString = '';
				for( let i = 0; i < this.form.lines.length;i++){
					let lineClean = this.form.lines[i].value;
					//TODO client side escaping..
					lineString += lineClean + '§';
				}
				this.attrs.action.body.lines = lineString;

				let self = this;	
				self.onSubmit( self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgObj, self.onSuccess, self.onError);

			},

			onSuccess : function( input ){
				let self = this;
				self.$refs.btnSubmit.$emit( 'state' , 'message', 'Enjoy!' );
				setTimeout( function(){
					self.$router.push( '/board/' +  input.data.url);
				}, 2.3*1000 );
			},
			onError : function( input ){
				if( this.state.timeouts < this.attrs.server.max_timeouts ){


					// TODO error checking here ..


					this.$refs.btnSubmit.$emit( 'state' , 'message', 'Error!' );

					if( input.status !== 408 ){
						return;
					}

					let self = this;
					setTimeout( function(){
						self.state.timeouts +=1
						self.onSubmit( self.attrs.action, self, self.$refs.btnSubmit, self.$refs.msgObj, self.onSuccess, self.onError);
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
			'c-field-input' : FieldInput,
		},		
}
</script>

<style>

.sections {
	opacity: 0;
	height: 1px;
	margin: var(--margin) 0;
	pointer-events: none;
}
.sections .button, .sections button {
	pointer-events: none;
}

.sections.is-active {
	pointer-events: all;
	opacity: 1;
	height: auto;
}
.sections.is-active .button, .sections.is-active button {
	pointer-events: all;
}

</style>

