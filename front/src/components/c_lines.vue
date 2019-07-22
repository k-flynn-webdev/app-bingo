<template>

	<div 
		ref="wrds_holder"
		class="lines-holder anim-6"
		v-bind:class="{ 'lines-lock' : !is_ready, 'lines-ready' : is_ready, }">

		<div ref="wrds_holder_inner">
			
			<transition-group name="anim-line" tag="">

				<c-line
					v-for="(line, index) in lines_list" 
					v-bind:key="line.id"
					v-bind:style=get_style_task(index)
					v-bind:input=line>

				</c-line>

			</transition-group>

		</div>

	</div>

</template>

<script>



let array_sort = function( a, b ){
	return b.length - a.length;
}
let array_clamp = function( input, clamp ){
	let new_array = [];
	let tempMax = Math.min( clamp, input.length );

	for( let count = 0; count < tempMax; count++){
		new_array.push(input[count]);
	}
	return new_array;
}
let array_randomize = function( input ){
	let new_array = [];
	for( let count = 0; count < input.length; count++){
		new_array.push(input[count]);
	}

	for( let count = new_array.length-1; count >= 0; count--){
		let random = Math.floor(Math.random() * (count + 1));
		let temp = new_array[count]
		new_array[count] = new_array[random];
		new_array[random] = temp;
	}

	return new_array;
}

let line_hash = function (str){
	let hash = 0;
	if (str.length == 0) return hash;
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}


	import Line from '../components/c_line.vue';

	export default {
		name: 'cLines',
		data(){
			return {
				timing : {
					delay_render : 1.66,
					delay_each_item : 250,
				},
				rendered : false,
			}
		},
		computed : {
			lines_list : function(){
				return this.$store.getters['game/get_lines'];
			},
			is_ready : function(){
				let gameMode = this.$store.getters['game/get_game'];
				if( gameMode.mode === 'playing' ){
					return true;
				} else {
					return false;
				}
			},
		},
		methods : {
			setup : function(){

				let lines = []
				let display = this.$store.getters['instance/get_instance'].data.game.display;

				let temp_lines = array_randomize( this.$store.getters['board/get_lines'] );

				for( let i = 0; i < display; i++){
					let new_line = {
						line : temp_lines[i],
						waiting : false,
						selected : false,
						id : line_hash( temp_lines[i] ),
					};
					lines.push( new_line );	
				}

				// now sort into smallest > largest
				lines.sort( function(a,b){
					return b.line.length - a.line.length;	
				});

				let self = this;
				function delayStart( index, items ){
					setTimeout( function(){
						let temp_array = [];
						for( let a = 0; a < index; a++){
							temp_array.push( items[a] );
						}
						self.$store.dispatch('game/set_lines', temp_array );

						// array of lines finished .. set game ready!
						if( temp_array.length === display){
							self.$store.dispatch('game/set_game', {} );
						}

					}, index * self.timing.delay_each_item );
				}

				// delay dispatch
				let tDelay = self.timing.delay_render;

				if(!this.rendered){
					tDelay = 0;
					this.rendered = true;
				} else {
					this.$store.dispatch('game/set_lines', [] );
				}

				setTimeout( function(){
					for( let a = 0; a <= lines.length; a++){	
						delayStart(a, lines);
					}
				}, tDelay * 1000);

			},

			get_style_task : function( index ){
				let inv = this.lines_list.length - index;
				return { '--i' : index + 1, '--inv-i' : inv - 1 };
			},

			exit : function(){
				this.$store.dispatch('game/set_lines', [] );
				this.$root.$off('player-lines-reset', this.setup );
			},
		},
		mounted(){
			this.$root.$on('player-lines-reset', this.setup );
		},
		beforeDestroy(){
			this.exit();
		},
		components: {
			'c-line' : Line,
		},
}

</script>

<style>

.lines-holder {
	display: block;
	flex: none;
	position: relative;
	min-height: 15rem;
	width: 100%;
}

.lines-lock, .lines-lock .button {
	pointer-events: none !important;
}	

.anim-line-enter {
	opacity: 0;
	transform: translateY(-1rem);
}
.anim-line-enter .label {
	opacity: 0;
	transform: translateX(-2rem);
}

.anim-line-leave, .anim-line-leave-to {
	animation: remove-task 1s ease calc( .1s * var(--inv-i) );
}
.anim-line-leave-to .label {
	opacity: 0;
	transition-delay: calc( .1s * var(--inv-i));
	transition-duration: .66s;
	transform: translateX(1rem);
}
.anim-line-move {
	transition: transform 1s ease !important;
}

@keyframes add-task {
	0% {
		opacity: 0;
		transform: translateY(-2rem);
	}		
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes remove-task {
	0% {
		opacity: 1;
		transform:  translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(2rem);
	}
}


/*@media only screen and (max-width: 400px) {	*/

/*}*/

/*@media only screen and (max-width: 320px) {*/
/*	.word-block {
		display: block;
		min-width: 80%;
	}
	.word-content {
		font-size: 1rem;
	}*/
/*}*/

/*@media only screen and (min-width: 600px) {*/

/*}*/


</style>

