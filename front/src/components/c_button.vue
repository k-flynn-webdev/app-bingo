<template>

	<button 
		class="button fade-in" 
		v-on:click=clicked
		v-bind:class=get_state>		

		<div v-bind:class=get_message>

			<p 
				class="text colour-fill-depends label"> 
				<slot> 
				 	Submit 
				</slot> 
			</p> 

			<p 
				class="text colour-fill-depends text-bold message">
					{{ obj.message }} 
			</p>

			<div 
				class="anim-container"
				v-bind:class=get_strobes>
				
					<span class="strobe delay-5" ></span>
					<span class="strobe delay-5" ></span>
					<span class="strobe delay-5" ></span>

			</div>

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
					min : 1500,
					message : 5000,
				},
			}
		},	
		props: {
			onClick : Function,
		},
		computed : {
			get_state : function(){
				return this.obj.state;
			},
			get_strobes : function(){
				if( this.obj.strobes ){
					return 'is-active';
				}
				return '';
			},
			get_message : function(){
				if( this.obj.hasMessage ){
					return 'msg-is-active';
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



	.button {
		overflow: hidden;
		box-sizing: border-box;
		border-radius: 0.3rem; 
		padding: 0 0.66rem;
		position: relative;
	}

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

	.button .msg-is-active .message{
		transform: translateY(2rem);
		opacity: 1;
	}

	.button .msg-is-active .label{
		transform: translateY(2rem);
		opacity: 0;
	}

	
	.button.is-loading{

	}

	.button.is-loading p{
		opacity: 0.1;
	}

	.button.is-loading.is-success p{
		opacity: 0.75;
	}
	.button.is-loading.is-error p{
		opacity: 0.75;
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

		opacity: 0;
		display: inline;
		background-color: white;
		transform: scaleX(.3) skew(-33deg) translateX(-210%);
	}

@keyframes is-waiting-anim {
	0% { 
		opacity: 0; 
		transform: scaleX(.3) skew(-33deg) translateX(-210%);
	}
	45% { 
		opacity: 0.5; 
	}
	80% {
		opacity: 0; 
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

	.button.is-success {
		background-color: var( --colour-positive );
	}	
	.button.is-error {
		background-color: var( --colour-negative );
	}


	.colour-fill-depends {
		color: var( --colour );
	}
	.is-error .colour-fill-depends {
		color: var( --colour-inv );
	}	

</style>

