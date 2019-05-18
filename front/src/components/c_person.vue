<template>
		
	<div 
		class="person-row delay-2"
		v-bind:class="{ 'is-player' : is_player, 'is-open' : open, 'dot-anim' : dot_anim }">

		<div class="person-row-inner">

			<p 
				class="text text-hidden">
					{{ name_full }}
			</p>
			
			<div 
				ref="btnPerson" 
				class="person">

				<div class="inside">
					
					<p class="text name-short">
						{{ name_short }}
					</p>

					<p class="text name-full">
						{{ name_full }}	
					</p>

				</div>

				<div 
					v-if=is_player 
					class="dot">
				</div>
				<div 
					v-if=is_player 
					class="dot-edge">
				</div>

			</div>

		</div>

	</div>

</template>

<script>

	export default {
		name: 'cPerson',
		data(){
			return {
				open : false,
				dot_anim : false,
			}
		},	
		props: {
			input : Object,
			input_is_player : Boolean,
			onClick : Function,
		},
		computed : {
			name_short : function(){
				let short = this.input.data.name.substring(0,2)
				return short;
			},
			name_full : function(){
				return this.input.data.name;
			},
			is_player : function(){
				if( this.input_is_player ){
					this.player_init();
				}
				return this.input_is_player;
			},			
		},
		methods : {
			player_init : function(){
				let self = this;
				setTimeout( function(){
					self.open = true;
				},1500);
				setTimeout( function(){
					self.dot_anim = true;
				},1000);				
				setTimeout( function(){
					self.open = false;
				},3500);
				
			},
			clicked : function(){
				if( this.onClick !== undefined ){
					this.onClick();
				}
			},
		},
		mounted(){
		},
		components: {
		},
}

</script>

<style>


.people-holder{
	position: absolute;
	z-index: 1;
	right: 3vmin;
	top: 4.2rem;
	pointer-events: none;
}
.people-list {
	backface-visibility: hidden;
}
.people-list-move .person{
	transform: scale(1.33);
}

/* appear at */
.people-list-enter{
}
/* appearing */
.people-list-enter-active{
	animation: anim-person-enter var( --anim-time-3 ) backwards;
}
/* disappear to */
.people-list-leave-to{
}
/* disappearing */
.people-list-leave-active{
	animation: anim-person-enter var( --anim-time-3 ) reverse forwards;
}
@keyframes anim-person-enter {
	0% { 
		transform: scale(0.75) translateX(2rem);
		opacity: 0;
	}
	100% { 
		transform: scale(1) translateX(0); 
		opacity: 1;
	}
}





.person-row {
	text-align: right;
	display: block;
	margin-bottom: 1rem;
	min-height: 2rem;
	transition: var( --anim-time-10 );
}

.person-row-inner {
	display: inline-block;
	position: relative;
	min-height: 2rem;
	transition: var( --anim-time-10 );
}


.text-hidden{
	padding: 0 1rem;
	opacity: 0;
}


.person {
	pointer-events:auto;
	transition: var( --anim-time-6 );

	position: absolute;
	height: 100%;
	min-width: 2rem;
	top: 0;
	right: 0;

	background-color: yellow;
	border-radius: .3rem;
}
.person {
	width: 2rem;
	border-radius: 1rem;
}
.is-open .person, .person:hover {
	width: 100%;
	border-radius: .3rem;
}

.person .inside {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.person .text {
	text-transform: capitalize;
	position: absolute;
	top: 50%;
	width: 100%;
	text-align: center;
	transform: translateY(-50%);
}

.person .name-short {
	transition: var( --anim-time-3 );
	opacity: 1;
}
.person .name-full {
	transition: var( --anim-time-3 );
	opacity: 0;
	white-space: nowrap;
}


.person:hover .name-short, .is-open .person .name-short {
	opacity: 0;
}
.person:hover .name-full, .is-open .person .name-full {
	opacity: 1;
}



.dot{
	transition: var( --anim-time-10 );
	opacity: 0;
}
.dot, .dot-edge{
	opacity: 0;
	position: absolute;
	z-index: 1;
	top: 0.6rem;
	left:-1rem;

	background-color: red;
	height: 0.8rem;
	width: 0.8rem;
	border-radius: 50%;
}

.is-player.dot-anim .dot {
	opacity: 1;
}
.is-player.dot-anim .dot-edge{
	animation: anim-person-player-dot-edge var( --anim-time-6 ) 2 forwards;
}


@keyframes anim-person-player-dot-edge {
	0% { 
		transform: scale(0.1);
		opacity: 0;
	}
	10% { 
		opacity: 1;
	}
	100% { 
		transform: scale(2.5); 
		opacity: 0;
	}	
}

</style>

