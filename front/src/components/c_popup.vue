<template>
	
	<div ref="popup" class="popup-fill" style="z-index: 50;">
		
		<transition 
			appear
			name="fade">
		
				<div 
					v-if=show
					v-on:click=clicked
					class="fill-all colour-bg-darken">
				</div>

		</transition>


		<transition 
			appear
			name="slide-in">

				<div 	
					class="panel center-auto-h"
					style="position: relative;z-index:50;">

					<header class="">

						<p class="header colour-fill-bg-inv text-funky custom"> 
							<slot name="header" ></slot>
						</p>

						<div class="options flex-row flex-row-end header-shadow1">
							<slot name="options"></slot>
						</div>

					</header>

					<div class="width-90 center-auto-h">

						<main class="text">	
							<slot></slot>
						</main>

						<slot name="no-margin" class="main"></slot>

						<footer class="footer">
							<p class="text"> 
								<slot name="footer"></slot>
							</p>
						</footer>

					</div>

				</div>

		</transition>

	</div>

</template>

<script>

	export default {
		name: 'cPopUp',
		data(){
			return {
				show : true,
			}
		},	
		props: {
			onClick : Function,
		},
		methods : {
			clicked : function(){
				if( this.onClick !== undefined ){
					this.onClick();
				}
			},
		},		
		mounted(){
			document.body.appendChild( this.$refs.popup );
		},
		components: {
		},
}

</script>

<style scoped >

	.popup-fill {
		position: fixed;
		left: 0;
		top: 2rem;
		width: 100%;
		height: 100%;
	}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active, .fade-leave-active {
	transition: all .6s ease;
}
.fade-enter, .fade-leave-to, .slide-in-enter, .slide-in-leave-to {
	opacity: 0;
}

.slide-in-enter-active, .slide-in-leave-active {
	transition: all 1.5s ease;
}
.slide-in-enter {
	transform: translateY(-1.5rem);
}
.slide-in-leave-to {
	transform: translateY(1.5rem);
}

	/*.is-success .panel{
		background-color: var( --colour-success );
	}
	.is-warning .panel{
		background-color: var( --colour-warning );
	}	
	.is-error .panel{
		background-color: var( --colour-error );
	}	*/

</style>

