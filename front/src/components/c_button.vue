<template>

	<button 
		class="button button-shadow fade-in colour-bg-dark border-round" 
		v-on:click=clicked
		v-bind:class=get_state>

		<p 
			class="colour-fill-pop label"> 
				<slot> 
				 	Submit 
				</slot> 
		</p> 

		<p 
			class="text colour-fill-pop text-bold message anim-3">
				{{ obj.message }} 
		</p>

		<div 
			class="anim-container"
			v-bind:class=get_strobes>
			
				<span class="strobe delay-5" ></span>
				<span class="strobe delay-5" ></span>
				<span class="strobe delay-5" ></span>

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
				}
				if( input === 'error' ){
					this.obj.state = 'is-error';
					this.set_strobes(false);
				}
				if( input === '' || input === 'reset' ){
					this.init();
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
/*
	.button p {
		position: relative;
		z-index: 1;
		transition: 0.5s;
	}

	.button .message {
		position: absolute;
		top: -1.9rem;
		opacity: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: 0.5s;
	}

	.button.msg-is-active, .button.is-error, .button.is-success, .button.is-waiting{
		border: 1px solid var( --colour-button-highlight );
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
		background-color: var( --colour-button-positive );		
	}	
	.button.is-error, .button.is-error-colour {
		background-color: var( --colour-button-negative );
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
		background-color: var( --colour-button-highlight );
		background-color: hsla(1,10%,90%,1);

		opacity: 0.1;
		display: inline;
		transform: scaleX(.175) skew(-33deg) translateX(-210%);
	}

	@keyframes is-waiting-anim {
		0% { 
			opacity: 0; 
			transform: scaleX(.3) skew(-33deg) translateX(-210%);
		}
		33% { 
			opacity: 1;
		}
		66% {
			opacity: 1;
		}
		80% {
			opacity: .1;
		}
		100% { 
			opacity: 0;
			transform: scaleX(.3) skew(-33deg) translateX(210%);
		}
	}

	.button.is-waiting .strobe, .button.is-success .strobe, .button.is-error .strobe{
		animation-name: is-waiting-anim;
		animation-duration: 1.5s;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
	}


	.is-message .colour-fill-depends, .is-success .colour-fill-depends, .is-error .colour-fill-depends {
		color: var( --colour-inv );
	}	
*/

/*	.colour-fill-depends {
		color: var( --colour );
	}*/
</style>

