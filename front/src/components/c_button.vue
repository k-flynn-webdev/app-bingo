<template>

	<button 
		class="button fade-in" 
		v-on:click=clicked
		v-bind:class=get_state>

		<p 
			class="text colour-fill-depends label"> 
			<slot> 
			 	Submit 
			</slot> 
		</p> 

		<p 
			class="text colour-fill-depends text-bold message anim-3">
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
					let self = this;
					self.set_strobes(false);
					setTimeout( function(){
						self.obj.state = '';
						self.message_reset();
					}, self.time.min );
				}

				if( input === 'message' ){
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

	.button.is-success {
		background-color: var( --colour-button-positive );

		box-shadow: 1px 3px 0 var( --colour-button-positive-shadow );
		-webkit-box-shadow: 1px 3px 0 var( --colour-button-positive-shadow );
		-moz-box-shadow: 1px 3px 0 var( --colour-button-positive-shadow );		
	}	
	.button.is-error {
		background-color: var( --colour-button-negative );

		box-shadow: 1px 3px 0 var( --colour-button-negative-shadow );
		-webkit-box-shadow: 1px 3px 0 var( --colour-button-negative-shadow );
		-moz-box-shadow: 1px 3px 0 var( --colour-button-negative-shadow );	
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

		opacity: 0.1;
		display: inline;
		transform: scaleX(.3) skew(-33deg) translateX(-210%);
	}

	@keyframes is-waiting-anim {
		0% { 
			opacity: 0.1; 
			transform: scaleX(.3) skew(-33deg) translateX(-210%);
		}
		45% { 
			opacity: 1; 
		}
		80% {
			opacity: 0.1; 
		}
		100% { 
			transform: scaleX(.3) skew(-33deg) translateX(210%);
		}
	}

	.button.is-waiting .strobe, .button.is-success .strobe, .button.is-error .strobe{
		animation-name: is-waiting-anim;
		animation-duration: 1.5s;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
	}

	.colour-fill-depends {
		color: var( --colour );
	}
	.is-success .colour-fill-depends, .is-error .colour-fill-depends {
		color: var( --colour-inv );
	}	

</style>

