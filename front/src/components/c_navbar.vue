<template>
	<nav 
		id="navbar"
		class="colour-bg-dark" 
		v-bind:data-open=is_open
		v-bind:class="{ 'is-active' : is_open }">


		<div class="left">

			<svg class="home-icon colour-fill-pop" height="100%" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
				<g>
					<path class="colour-fill-pop" d="M121.923,26.923l-73.077,73.077l73.077,73.077l-21.923,21.923l-95,-95l95,-95c7.308,7.308 14.615,14.615 21.923,21.923Z"/>
				</g>				
			</svg>
					
		</div>


		<div class="middle">

			<div class="header colour-fill-pop">
				{{ page.title }}
			</div>

		</div>


		<div class="right">

			<div
				class="burger"
				tabindex="1" 
				:class="is_open ? 'cross' : 'bars' " 
				v-on:click=on_click>
					<span class="span-1 colour-bg-pop"></span>
					<span class="span-2 colour-bg-pop"></span>
					<span class="span-3 colour-bg-pop"></span>
			</div>

		</div>


		<!-- <div 
			class="content colour-bg-inv" 
			v-on:click=on_click
			v-bind:class="{ 'is-admin' : is_admin , 'is-user' : is_user }">
		
			<slot></slot>

			<slot v-if=is_active name="active">
				
				{{ user }}

			</slot>

			<slot v-else name="none-active">
				
				none active
				
			</slot>	

		</div> -->

		<!-- <div 
			class="shade colour-bg-shade"
			v-on:click=on_click>
		</div> -->

	</nav>		

</template>

<script>

	export default {
		name: 'Navbar',		
		data() {
			return {
				is_open : false,
				page : {
					title : '',
				},
			}		
		},
		computed: {
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
			on_click : function(){
				this.is_open = !this.is_open;
			},
			set_title : function( input ){
				this.page.title = input; 
			},			
		},
		mounted(){
			this.$root.$on('page.title', this.set_title );
		},
		beforeDestroy(){
			this.$root.$off('page.title', this.set_title );
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
	
:root{
	--height-nav: 2.66rem;
}

	#navbar {
		position: fixed;
		z-index: 5;
		top: .5rem;
		height: var(--height-nav);
		width: 100%;
	}
	#navbar .left, #navbar .right{
		position: absolute;
		top: 0;
	}

	#navbar .left{
		left: 0;
		margin-left: .75em;
	}
	#navbar .middle{
		margin: .2em;
	}
	#navbar .right{
		right: 0;
		margin-right: .75em;
	}

	#navbar .home-icon {
		height: var(--height-nav);
	}

	#navbar .burger{
		height: var(--height-nav);
		width: 1.85em;
		position: relative;
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









/*	#navbar, .shade {
		margin: 0;
		padding: 0;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 0;
	}*/



/*	#navbar .shade {
		position: relative;
		min-height: 100%;
	}*/


/*	#navbar .link {
		box-sizing: border-box;
		display: block;
		text-align: center;
		text-decoration: none;
		transition: background-color 0.5s;
	}


	#navbar .link {
		margin: .15rem 0;
	}

	
	#navbar .link:first-of-type {
		margin-top: 5rem;
	}
	#navbar .link:last-of-type {
		margin-bottom: 5rem;
	}

	#navbar .colour-navbar {
	}*/



/*	#navbar .content {
		display: none;
		overflow-y: auto;
		min-height: 50vh;
		max-height: 90vh;
	}

	#navbar.is-active {
		height: 100vh;
	}

	#navbar.is-active .content, #navbar[data-open] .content {
		display: flex;
		flex-direction: column;
	}	


	#navbar.is-active .content, #navbar[data-open] .content {
		display: flex;
		flex-direction: column;
	}*/



/*	#navbar .bar-logo {
		margin: 0;
		padding: 0;
		position: absolute;
		z-index: 1;
		left: 0;
		bottom: -1.3rem; 
		height: 5rem;
		transform-origin: bottom left;
	}
	#navbar .bar-fill {
		margin: 0;
		padding: 0;
		position: absolute;
		z-index: -1;
		left: 0;
		bottom: -1.3rem; 
		height: 1.5rem;
		width: 100%;
	}	
	#navbar .bar-fill-right {
		margin: 0;
		padding: 0;
		position: absolute;
		z-index: -1;
		left: 2.5rem;
		bottom: -1.3rem; 
		height: 1.5rem;
		width: 100%;
	}*/	

/*	#navbar .content .bar-logo {
		bottom: -1rem; 
	}
	#navbar .content .bar-fill-right {
		bottom: -1rem; 
	}*/



/*	#navbar .toggle:focus{
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
