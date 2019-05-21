<template>

	<button 
		class="button fade-in" 
		v-on:click=clicked
		v-bind:class=get_state>		

		<div v-bind:class=get_message>

			<p 
				class="text colour-fill-bg label"> 
				<slot> 
				 	Submit 
				</slot> 
			</p> 

			<p 
				class="text colour-fill-bg message">
					{{ obj.message }} 
			</p>

			<div 
				class="anim-container"
				v-bind:class=get_display>
				
					<span class="strobe" ></span>
					<span class="strobe" ></span>
					<span class="strobe" ></span>

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
					display : false,
					hasMessage : false,
					message : '',
				},
				time : {
					reset : 4000,
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
			get_display : function(){
				if( this.obj.display ){
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
			state_set : function( input, message ){
				this.obj.display = true;
				if( input === '' || input === 'reset' ){
					this.state_reset();
				}
				if( input === 'waiting' ){
					this.obj.state = 'is-waiting';
				}

				if( input === 'success' ){
					this.obj.state = 'is-success';
				}
				if( input === 'error' ){
					this.obj.state = 'is-error';
				}
				if( input === 'message' ){
					this.message_set( message );
				}
			},
			state_reset : function(){
				let self =this;
				setTimeout( function(){
					self.obj.display = false;
				}, self.time.reset - 250 );				
				setTimeout( function(){
					self.obj.state = '';
				}, self.time.reset );			
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
				}, self.time.reset / 2);					
			},
			clicked : function(){
				if( this.onClick !== undefined ){
					this.onClick();
				}
			},			
		},
		mounted(){	
			this.$on('state', this.state_set );	
		},
		beforeDestroy(){
			this.$off('state', this.state_set );	
		},		
		components: {
		},
}

</script>

<style>



	.anim-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		opacity: 0;
		transition: 0.33s;
		overflow: hidden;
	}
	.anim-container.is-active {
		opacity: 1;
	}

	.button{
		overflow: hidden;
		box-sizing: border-box;
		border-radius: 0.3rem; 
		padding: 0 0.66rem;
		background-color: var( --colour-button );
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

	.button .strobe{
		position: absolute;
		left: calc(50% - 0.3rem);
		top: -10%;
		bottom: -10%;
		display: inline;
		width: 0.6rem;
		opacity: 0;
		background-color: white;
	}

@keyframes is-waiting-anim {
	0% { 
		transform: skew(-10deg) translateX(-3rem); 
		opacity: 0; 
	}
	50% { 
		opacity: 0.75; 
	}
	85% {
		opacity: 0; 
	}
	100% { 
		transform: skew(10deg) translateX(3rem); 
		opacity: 0; 
	}
}

	.button.is-waiting .strobe{
		opacity: 0.5;
		animation: is-waiting-anim 1.5s ease infinite;	
	}

	.button.is-success .strobe{
		opacity: 0.75;	
		animation: is-waiting-anim 1.5s ease infinite;	
	}
	.button.is-error .strobe{
		opacity: 0.75;	
		animation: is-waiting-anim 1.5s ease infinite;	
	}

	.button .strobe:nth-child(1){
		animation-delay: 0;
	}	
	.button .strobe:nth-child(2){
		animation-delay: 0.3s;
	}
	.button .strobe:nth-child(3){
		animation-delay: 0.6s;
	}	

	.button.is-success{
		background-color: var( --colour-positive );
	}	
	.button.is-error{
		background-color: var( --colour-negative );
	}

</style>

