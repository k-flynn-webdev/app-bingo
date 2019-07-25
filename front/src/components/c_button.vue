<template>

	<button 
		class="button shadow fade-in colour-bg-dark border-round" 
		v-on:click=clicked
		v-bind:class=get_state>


		<div 
			class="anim-container message anim-3">
			<p class="text text-center colour-fill-pop text-bold"> {{ obj.message }} </p>
				
		</div>


		<p 
			class="colour-fill-pop label"> 
				<slot> 
				 	Submit 
				</slot> 
		</p> 



		<div 
			class="anim-container"
			v-bind:class=get_strobes>
			
				<span class="strobe colour-bg-pop delay-5" ></span>
				<span class="strobe colour-bg-pop delay-5" ></span>
				<span class="strobe colour-bg-pop delay-5" ></span>

		</div>

		<div 
			class="anim-container anim-result anim-3"
			v-bind:class="{ 'is-active' : get_result }">
		</div>

	</button>

</template>

<script>

	export default {
		name: 'cButton',
		data(){
			return {
				obj : { 
					state : '', 
					strobes : false,
					hasMessage : false,
					message : '',
					result : false,
				},
				time : {
					min : 2300,
					message : 2300,
				},
			}
		},	
		props: {
			onClick : Function,
		},
		computed : {
			get_state : function(){
				let state = this.obj.state;
				if( this.obj.hasMessage ){
					state += ' msg-is-active';
				}
				return state;
			},
			get_strobes : function(){
				if( this.obj.strobes ){
					return 'is-active';
				}
				return '';
			},
			get_result : function(){
				return this.obj.result;
			},			
		},
		methods : {
			init : function(){
				this.clear_state();
				this.message_reset();
			},
			clear_state : function(){
				this.set_strobes(false);
				this.obj.state = '';
			},
			set_state : function( input, message ){

				if( input === 'waiting' ){
					this.obj.state = 'is-waiting';
					// trigger strobes ...
					this.set_strobes(true);
				}

				if( input === 'success' ){
					this.obj.state = 'is-success';
					this.set_strobes(false);
					this.set_result(true);
				}
				if( input === 'error' ){
					this.obj.state = 'is-error';
					this.set_strobes(false);
					this.set_result(false);
				}
				if( input === '' || input === 'reset' ){
					this.init();
					this.set_result(false);
				}

				if( input === 'message' ){
					this.clear_state();
					this.message_set( message );
				}
			},

			set_strobes : function( mode ){
				if( mode ){
					let self = this;
					setTimeout( function(){
						// are we still waiting?
						if( self.obj.state === 'is-waiting' ){
							self.obj.strobes = true;	
						}
					}, 350);
				} else {
					this.obj.strobes = false;	
				}
			},

			set_result : function( input ){
				this.obj.result = input;

				if( this.obj.result ){
					let self = this;
					setTimeout( function(){
						self.obj.result = false;
					}, 1.5*1000);					
				}
			},

			message_set : function( input ){
				this.obj.message = input;
				this.obj.hasMessage = true;
				this.message_reset();
			},
			message_reset : function(){
				let self =this;
				setTimeout( function(){
					self.obj.hasMessage = false;
				}, self.time.message );	
			},
			clicked : function(){
				if( this.onClick !== undefined ){
					this.onClick();
				}
				// this.$emit('click');
			},
	
		},
		mounted(){	
			this.$on('state', this.set_state );	
			this.init();
		},
		beforeDestroy(){
			this.$off('state', this.set_state );	
		},		
		components: {
		},
}

</script>

<style>

	.button p {
		position: relative;
		z-index: 1;
		transition: 0.5s;
	}

	.button .message {
		background-color: hsla(1,1%,10%,.4);
		top: -1.9rem;
	}

	.button.msg-is-active, .button.is-error, .button.is-success, .button.is-waiting{
		pointer-events: none;
	}

	.button.msg-is-active .message{
		transform: translateY(1.95rem);
		opacity: 1;
	}

	.button.msg-is-active .label{
		transform: translateY(1.95rem);
		opacity: 0;
	}

	.button.is-success, .button.is-success-colour {
		/*background-color: var( --colour-positive );		*/
	}	
	.button.is-error, .button.is-error-colour {
		/*background-color: var( --colour-negative );*/
	}

	.anim-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		opacity: 0;
		transition: .33s;
		overflow: hidden;
	}
	.anim-container.is-active {
		opacity: 1;
	}

	.button .strobe{
		position: absolute;
		left: 0;
		top: 0;
		
		width: 100%;
		height: 100%;

		opacity: 0.1;
		display: inline;
		transform: scaleX(.3) skew(-33deg) translateX(-250%);
	}

	@keyframes is-waiting-anim {
		0% { 
			opacity: 0; 
			transform: scaleX(.3) skew(-33deg) translateX(-250%);
		}
		33% { 
			opacity: .75;
		}
		66% {
			opacity: .75;
		}
		80% {
			opacity: .1;
		}
		100% { 
			opacity: 0;
			transform: scaleX(.3) skew(-33deg) translateX(250%);
		}
	}

	@keyframes is-result-anim {
		0% { 
			left: -10%;
			width: 0;
		}
		30% {
			opacity: 1;
			left: -10%;
			width: 120%;
		}
		70% {
			opacity: 1;
			left: -10%;
			width: 120%;
		}
		100% { 
			opacity: 0;
			width: 0;
			left: 120%;
		}
	}


	.button.is-waiting .strobe {
		animation-name: is-waiting-anim;
		animation-duration: 1.5s;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
	}

	.button .anim-result {
		transform: skewX(-33deg);
		width: 0;
		opacity: 1;
	}

	.button.is-success .anim-result, .button.is-negative .anim-result {
		animation-name: is-result-anim;
		animation-duration: 2s;
		animation-timing-function: ease;
		animation-iteration-count: 1;
	}

	.button.is-success .anim-result {
		background-color: var(--colour-button-positive);
	}
	.button.is-negative .anim-result {
		background-color: var(--colour-button-negative);
	}

	.is-message .colour-fill-depends, .is-success .colour-fill-depends, .is-error .colour-fill-depends {
		/*color: var( --colour-inv );*/
	}	


</style>

