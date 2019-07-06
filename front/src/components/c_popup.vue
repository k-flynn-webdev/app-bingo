<template>
	<div ref="parent">

		<div 
			ref="popup" 
			class="popup-fill" 
			v-bind:class=extraClass
			style="z-index:30;">
			
			<transition 
				appear
				name="fade">
			
					<div 
						v-if=onShow
						v-on:click=clicked
						class="fill-all colour-bg-darken">
					</div>

			</transition>


			<transition 
				appear
				name="slide-in">

				<div 
					v-if=onShow class="panel-parent"
					style="position:relative;">
					
					<div						
						class="panel center-auto-h"
						style="position:relative;">

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

				</div>

			</transition>

		</div>

	</div>

</template>

<script>

	export default {
		name: 'cPopUp',
		data(){
			return {
				// show : true,
			}
		},	
		props: {
			extraClass : String,
			onClick : Function,
			onShow : Boolean,
			onRemove : Boolean,
		},
		methods : {
			clicked : function(){
				if( this.onClick !== undefined ){
					this.onClick();
				}
			},
			exit : function(){
				// this.onShow = false;
				this.$refs.parent.appendChild( this.$refs.popup  );
			},
		},
		mounted(){
			document.body.appendChild( this.$refs.popup );
		},
		beforeDestroy(){
			this.exit();
		},
		components: {
		},
}

</script>

<style scoped >


.panel-parent{
	z-index: 10;
}


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
	transition: all 1s ease;
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

