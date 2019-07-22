<template>
	<nav 
		id="navbar"
		class="colour-bg-dark" 
		v-bind:data-open=state.menu.display
		v-bind:class="{ 'is-active' : state.menu.display }">


		<div class="nav-step">
		
			<div class="left">

				<div 
					class="home-icon"
					v-on:click=on_home>
						<div class="icon"></div>
				</div>
						
			</div>


			<div class="middle no-click">

				<div 
					v-bind:class="{ 'is-active' : state.title.display }"
					class="navbar-title fit-space text-center anim-6">

						<p class="header text-bold colour-fill-pop">
								{{ state.title.content }}
						</p>

				</div>


				<div 
					v-bind:class="{ 'is-active' : state.logo.display }" 
					class="navbar-title fit-space text-center anim-6">

						<svg class="logo" height="100%" viewBox="0 0 261 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g><g id="text"><path d="M103.558,12.92l11.195,0c7.33,0 11.629,3.529 11.629,9.502c0,2.76 -0.905,4.932 -2.625,6.47c-0.995,0.86 -1.81,1.312 -3.665,1.991c2.217,0.497 3.394,1.04 4.706,2.172c1.946,1.719 2.941,4.162 2.941,7.149c0,6.515 -4.615,10.361 -12.488,10.361l-11.683,0l-0.1,-0.001c-3.599,-0.068 -6.744,-3.211 -6.856,-6.769l-0.003,-0.125l0,-23.806l0.001,-0.085c0.069,-3.649 3.327,-6.836 6.948,-6.859Zm10.245,30.179c2.851,0 4.57,-1.583 4.57,-4.253c0,-2.624 -1.719,-4.163 -4.615,-4.163l-8.28,0l0,8.416l8.325,0Zm-0.362,-15.655c2.398,0 3.891,-1.403 3.891,-3.62c0,-2.217 -1.402,-3.484 -3.981,-3.484l-7.873,0l0,7.104l7.963,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M132.309,12.92c0.271,1.991 0.362,3.303 0.362,6.696l0,24.253c0,3.031 -0.091,4.931 -0.362,6.696l9.954,0c-0.271,-1.9 -0.362,-3.574 -0.362,-6.696l0,-24.253c0,-3.303 0.091,-4.841 0.362,-6.696l-9.954,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M160.905,18.576c-1.765,-2.625 -2.76,-4.434 -3.213,-5.656l-9.818,0c0.271,2.081 0.362,4.117 0.362,6.742l0,23.799c0,3.349 -0.091,5.339 -0.362,7.104l9.637,0c-0.271,-1.946 -0.362,-3.936 -0.362,-7.058l0,-10.136c0,-2.217 -0.09,-4.705 -0.317,-6.741c1.267,2.398 2.037,3.755 3.258,5.565l8.371,12.624c1.538,2.353 2.579,4.027 3.393,5.746l9.909,0c-0.226,-1.9 -0.362,-3.982 -0.362,-6.742l0,-24.026c0,-2.941 0.091,-4.841 0.362,-6.877l-9.637,0c0.271,2.081 0.362,3.891 0.362,6.877l0,10.317c0,2.533 0.09,4.615 0.271,6.696c-1.086,-1.991 -1.945,-3.439 -3.257,-5.384l-8.597,-12.85Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M211.536,36.81l0,5.158c-2.217,1.131 -4.163,1.629 -6.561,1.629c-2.851,0 -5.068,-0.86 -6.516,-2.443c-1.81,-1.991 -2.76,-5.249 -2.76,-9.457c0,-7.601 3.168,-11.809 8.959,-11.809c1.9,0 3.394,0.452 4.57,1.403c0.995,0.769 1.538,1.628 2.036,3.257l9.23,-2.126c-0.724,-2.172 -1.447,-3.53 -2.669,-4.932c-2.986,-3.62 -7.285,-5.385 -12.941,-5.385c-11.402,0 -18.596,7.557 -18.596,19.456c0,6.199 1.9,11.584 5.339,15.022c3.213,3.258 7.692,4.842 13.438,4.842c3.349,0 6.652,-0.543 9.593,-1.539c2.036,-0.678 3.257,-1.267 5.746,-2.85c-0.272,-2.082 -0.317,-3.529 -0.317,-6.742l0,-5.068c0,-2.941 0.091,-4.434 0.317,-6.153c-1.991,0.181 -3.665,0.226 -5.973,0.226l-3.619,0c-3.168,0 -4.254,-0.045 -5.928,-0.271l0,8.008c1.403,-0.181 2.172,-0.226 4.48,-0.226l2.172,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M242.62,12.105c-11.131,0 -18.28,7.647 -18.28,19.592c0,11.991 7.149,19.728 18.235,19.728c10.995,0 18.279,-7.918 18.279,-19.864c0,-11.854 -7.103,-19.456 -18.234,-19.456Zm0,31.492c-5.52,0 -8.914,-4.57 -8.914,-11.945c0,-7.285 3.394,-11.764 8.914,-11.764c5.475,0 8.823,4.434 8.823,11.764c0,7.42 -3.348,11.945 -8.823,11.945Z" style="fill:#fff;fill-rule:nonzero;"/></g><g id="logo"><path d="M66.858,6.17c8.343,0.158 15.769,7.372 15.932,15.932c0.07,11.089 2.193,23.49 -4.592,30.439c-2.948,3.019 -7.092,4.784 -11.34,4.865c-15.808,0.1 -31.617,0.1 -47.425,0c-8.32,-0.158 -15.767,-7.237 -15.932,-15.932c-0.072,-11.331 -2.222,-23.628 4.727,-30.577c2.939,-2.939 7.023,-4.648 11.205,-4.727c15.808,-0.1 31.617,-0.1 47.425,0Z" style="fill:#ff1751;"/><g><path d="M60.496,12.561c-0.973,0.011 -1.947,0.069 -2.913,0.197c-4.031,0.535 -8.247,2.481 -9.998,6.285c-2.217,4.819 -0.305,11.159 4.873,13.598c3.164,1.49 6.764,1.794 10.326,2.771c1.116,0.306 2.291,0.645 3.083,1.423c1.648,1.621 1.482,4.72 -0.362,6.192c-1.412,1.128 -3.346,1.374 -5.092,1.282c-2.388,-0.127 -4.925,-1.234 -5.9,-3.636c-0.231,-0.57 -0.357,-1.174 -0.446,-1.78l-8.4,0.807c0.138,0.867 0.284,1.739 0.531,2.582c2.168,7.377 12.342,10.202 20.735,8.01c2.831,-0.739 5.559,-2.274 7.12,-4.842c1.186,-1.95 1.629,-4.265 1.572,-6.526c-0.085,-3.448 -1.89,-6.783 -4.884,-8.577c-4.049,-2.427 -9.533,-1.779 -13.703,-4.113c-2.097,-1.173 -2.703,-4.671 -0.151,-6.294c1.363,-0.868 3.076,-1.024 4.71,-0.853c2.204,0.23 4.193,1.748 4.749,4.056l4.795,-0.521l3.784,-0.41c-0.594,-2.437 -1.718,-4.831 -3.766,-6.538c-2.821,-2.353 -6.657,-3.061 -10.195,-3.113c-0.234,-0.001 -0.233,-0.001 -0.468,0Z" style="fill:#fff;fill-rule:nonzero;"/><path d="M17.919,13.379c-3.795,0.088 -7,2.852 -7.092,6.408c-0.054,7.998 -0.143,15.998 0.001,23.994c0.125,3.255 3.025,6.154 6.289,6.282c4.874,0.125 9.846,0.463 14.581,-0.172c2.747,-0.368 5.549,-1.422 7.336,-3.657c3.364,-4.207 2.429,-11.662 -2.742,-14.049c-0.826,-0.381 -1.71,-0.613 -2.594,-0.815c0,0 -0.706,-0.654 -0.062,-0.956c2.519,-0.928 4.869,-2.722 5.605,-5.276c0.912,-3.166 0.225,-6.847 -2.228,-9.065c-1.963,-1.775 -4.679,-2.445 -7.255,-2.614c0,0 0.124,0 0,0c-2.381,0 -3.006,1.501 -5.684,1.501c-2.678,0 -3.237,-1.581 -6.155,-1.581Zm9.603,30.22c1.432,-0.012 2.881,-0.406 3.856,-1.419c1.466,-1.526 1.679,-4.172 0.49,-5.995c-1.576,-2.414 -5.433,-1.863 -5.433,-1.863c-0.781,0.748 -1.907,0.945 -2.821,0.564c-0.455,-0.19 -0.851,-0.646 -1.037,-0.695c-0.029,-0.003 -0.057,-0.005 -0.086,-0.008l-3.296,0c-0.371,0.03 -0.469,0.104 -0.5,0.5l0,8.416c0.029,0.371 0.103,0.469 0.5,0.5l8.327,0Zm-0.362,-15.655c1.206,-0.011 2.414,-0.352 3.256,-1.182c1.438,-1.418 1.575,-3.905 0.346,-5.458c-0.844,-1.066 -2.24,-1.432 -3.567,-1.463c-2.666,-0.02 -5.333,-0.001 -8,-0.001c-0.371,0.029 -0.469,0.104 -0.5,0.5l0,7.104c0.029,0.37 0.103,0.469 0.5,0.5l7.965,0Z" style="fill:#fff;"/><path d="M32.117,13.255l5.8,-1.731l-0.232,-9.91l0.67,-1.144c5.255,6.133 7.583,10.443 7.461,15.032c-0.065,2.445 -2.847,4.902 -5.718,6.843c-0.03,-4.858 -2.92,-8.085 -7.981,-9.09Z" style="fill:#fff;"/><path d="M10.326,24.543c-3.522,-1.921 -9.5,-5.439 -9.649,-9.019c-0.191,-4.586 2.973,-8.649 8.136,-14.861l1.048,2.378l-0.752,8.293l6.245,1.896c-2.779,0.886 -4.97,3.563 -5.027,6.549l-0.001,0.085l0,4.679Z" style="fill:#fff;"/></g></g></g></svg>

				</div>

			</div>


			<div class="right">

				<div
					class="burger"
					tabindex="1" 
					:class="state.menu.display ? 'cross' : 'bars' " 
					v-on:click=on_click>
						<span class="span-1 colour-bg-pop"></span>
						<span class="span-2 colour-bg-pop"></span>
						<span class="span-3 colour-bg-pop"></span>
				</div>

			</div>

		</div>


		<div 
			class="navbar-shade fill-all colour-bg-shade"
			v-on:click=on_click>



		</div>		


		<div 
			class="content" 
			v-on:click=on_click
			v-bind:class="{ 'is-admin' : is_admin , 'is-user' : is_user }">
		
				<slot></slot>

				<slot v-if=is_active name="active">
					
					{{ user }}

				</slot>

				<slot v-else name="none-active">
					
					none active
					
				</slot>	


				<small class="nav-version colour-fill-pop text-bold">
					v: {{ version }}
				</small>					



		</div>



	</nav>		

</template>

<script>

	export default {
		name: 'Navbar',		
		data() {
			return {
				state : {
					logo : {
						display : true,
					},
					title : {
						display : false,
						content : '',
					},
					menu : {
						display : false,
					},
				},
			}		
		},
		computed: {
			version : function(){
				return process.env.VUE_APP_VERSION || '0.0.0';
			},
			is_active : function(){
				return this.$store.getters['user/get_active'];
			},
			user : function(){
				return this.$store.getters['user/get_user'];
			},
			is_user : function(){
				if( this.user.role === 'user'){
					return true;
				}
				return false;
			},			
			is_admin : function(){
				if( this.user.role === 'admin'){
					return true;
				}
				return false;
			},				
		},
		methods: {
			on_home : function(){
				this.state.menu.display = false;
				this.$router.push('/');
			},
			on_click : function(){
				this.state.menu.display = !this.state.menu.display;
			},
			set_title : function( input ){

				// general reset
				if( input === ''){
					this.state.logo.display = true;
					this.state.title.display = false;

					let self = this;
					setTimeout( function(){
						self.state.title.content = '';
					},1*1000);
				}

				if( input !== ''){

					this.state.logo.display = false;

					if( this.state.title.content === '' ){
						this.state.title.content = input;
						this.state.title.display = true;
					} else {

						// if theres a clash

						this.state.title.display = false;

						let self = this;
						setTimeout( function(){
							self.state.title.content = input;
							self.state.title.display = true;
						},1*1000);
					}
				}

			},
		},
		mounted(){
			this.set_title('');
			this.$root.$on('page-title', this.set_title );
		},
		beforeDestroy(){
			this.$root.$off('page-title', this.set_title );
		},
		components: {
		},
	}

// You always use $dispatch from your methods in routes / components. $dispatch sends a message to your vuex store to do some action. The action may be done anytime after the current tick, so that your frontend performance is not affected.

// You never commit from any of your components / routes. It is done only from within an action, and only when you have some data to commit. Reason: commit is synchronous and may freeze your frontend till it is done.



</script>


<style scoped>

	#navbar .user {
		display: none !important;
	}	
	#navbar .is-user .user {
		display: block !important;
	}
	#navbar .admin {
		display: none !important;
	}	
	#navbar .is-admin .admin {
		display: block !important;
	}

	@media only screen and (min-width: 600px) {
		#navbar .is-user .user {
			display: inline !important;
		}
		#navbar .is-admin .admin {
			display: inline !important;
		}				
	}	


</style>

<style>

	#navbar {
		position: fixed;
		z-index: 50;
		top: 0;
		height: var(--nav-height);
		width: 100%;
	}

	#navbar .nav-step {
		position: relative;
		z-index: 15;
		top: calc( var(--margin) * 0.25);
	}

	#navbar .middle {
		position: absolute;
		left: 3rem;
		right: 3rem;
		/*top: .3rem;*/
	}

	#navbar .middle .fit-space {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}

	#navbar .middle .navbar-title {
		transform: translateY(-3rem);
	}
	#navbar .middle .navbar-title.is-active {
		transform: translateY(0);
	}


	#navbar .middle .logo {
		height: 2rem;
	}


	#navbar .left, #navbar .right{
		position: absolute;
		top: 0;
	}

	#navbar .left{
		left: 0;
		margin-left: calc( var( --margin) * 0.5);
	}

	#navbar .right{
		right: 0;
		margin-right: calc( var( --margin) * 0.5);
	}

	#navbar .home-icon {
		position: relative;
		margin: .3rem;
	}

	#navbar .home-icon .icon {
		height: calc(var(--nav-height) - 1rem);
		width: calc(var(--nav-height) - 1rem);
		transform: rotateZ(45deg);
		border: 4px solid white;
	}

	#navbar .burger{
		height: calc(var(--nav-height) - .5rem);
		position: relative;
		width: 1.85em;
		transition: 0.2s;
		box-sizing: border-box;	
	}

	#navbar .burger span {
		position: absolute;
		width: 100%;
		height: .4em;
		display: block;
	}
	#navbar .burger:hover, #navbar .burger:active {
		transform: scale(1.1);
	}	
	#navbar .burger .span-1 {
		top: 2px;
	}
	#navbar .burger .span-2 {
		top: 43%;
	}
	#navbar .burger .span-3 {
		bottom: 2px;
	}

	#navbar .bars .span-1 {
		animation: anim_cross_to_flat_1 0.2s forwards;
	}
	#navbar .bars .span-2 {
		animation: anim_cross_to_flat_2 0.2s forwards;
	}
	#navbar .bars .span-3 {
		animation: anim_cross_to_flat_2 0.2s forwards;
	}

	#navbar .cross .span-1 {
		animation: anim_flat_to_cross_1 .2s forwards;
	}
	#navbar .cross .span-2 {
		animation: anim_flat_to_cross_2 .2s forwards;
	}
	#navbar .cross .span-3 {
		animation: anim_flat_to_cross_2 .2s forwards;
	}	


	#navbar .navbar-shade, #navbar .content {
		display: none;
		pointer-events: all;
	}
	#navbar[data-open] .navbar-shade {
		display: block;
	}
	

	#navbar .content {
		position: relative;
		z-index: 20;
		height: 100vh;
		padding-top: 5rem;
	}
	#navbar .content .link {
		margin: calc(var(--margin)*0.4) var(--margin);
		text-decoration: none;
	}

	#navbar[data-open] .content {
		display: flex;
		flex-direction: column;
	}	


	#navbar .link {
		opacity: 0;
		transform: translateY(-1rem);
		animation-duration: .3s;
		animation-fill-mode: forwards;
	}

	#navbar[data-open] .link {
		animation-name: anim-nav-link-in;
	}

	#navbar .text-link {
		opacity: 0;
		transform: translateX(-4rem);
		animation-duration: .66s;
		animation-fill-mode: forwards;
		animation-delay: inherit;
	}

	#navbar[data-open] .text-link {
		animation-name: anim-nav-link-text-in;
	}

	@keyframes anim-nav-link-in {
		0% { 
			opacity: 0;
			transform: translateY(-1rem); 
		}
		50% {
			background-color: var(--colour-light)
		}
		100% { 
			opacity: 1;
			transform: translateY(0); 
		}
	}

	@keyframes anim-nav-link-text-in {
		0% { 
			opacity: 0;
			transform: translateX(-4rem); 
		}
		100% { 
			opacity: 1;
			transform: translateX(0); 
		}
	}




/* todo use transform translate to animate these for 60fps.. */

@keyframes anim_flat_to_cross_1 {
	50% { top:45%; transform: rotate(0deg); }
	100% { top:45%; transform: rotate(45deg); }
}

@keyframes anim_flat_to_cross_2 {
	50% { top:45%; transform: rotate(0deg); }
	100% { top:45%; transform: rotate(135deg); }
}

@keyframes anim_cross_to_flat_1 {
	0% { top:45%; transform: rotate(45deg); }
	50% { top:45%; transform: rotate(0deg); }
	100% { transform: rotate(0deg); }
}

@keyframes anim_cross_to_flat_2 {
	0% { top:45%; transform: rotate(135deg); }
	50% { top:45%; transform: rotate(0deg); }
	100% { transform: rotate(0deg); }
}



.nav-version {
	position: absolute;
	bottom: calc(var(--margin)*.5);
	right: calc(var(--margin)*.5);
}



/*
@media only screen and (min-width: 600px) {
	#navbar .toggle, #navbar .shade , #navbar .bar{
		display: none;
	}
	#navbar .content {
		display: flex;
		flex-direction: row;
		min-height: unset;
		padding: 0 1rem;
	}
	#navbar.is-active .content {
		display: flex;
		flex-direction: row;
	}

	#navbar .content .link {
		display: inline;
		margin: 0 .5rem;
		margin-top: .22rem;
		padding: 0 1rem;
		border-top-left-radius: .35rem;
		border-top-right-radius: .35rem;
		border: none;
		font-size: var( --text-screen-large );
	}

	#navbar .content .link:nth-child(1) {
		margin-left: 0;
	}	
	#navbar .content .link:nth-child(2) {
		margin-left: auto;
	}		
	#navbar .content .link:last-of-type {
		margin-bottom: 0;
	}*/

/*	#navbar .bar-fill {
		bottom: -0.2rem; 
	}*/				
/*}*/


</style>
