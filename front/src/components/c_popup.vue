<template>
	<div ref="parent">

		<div 
			ref="popup" 
			class="popup-fill">
			
			<transition 
				appear
				name="fade">
			
					<div 
						v-if=onShow
						v-on:click=clicked
						class="fill-all colour-bg-shade">
					</div>

			</transition>


			<transition
				appear
				name="slide-in">

					<div 
						v-if=onShow 
						class="panel-parent">

						<div class="panel center-auto-h colour-bg-pop border-round width-95 shadow">

							<header class="">

								<p class="header"> 
									<slot name="header" ></slot>
								</p>

								<div class="options flex-row flex-row-end center-auto-h">
									<slot name="options"></slot>
								</div>

							</header>

							<div class="center-auto-h">

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

	// import Panel from '../components/c_panel.vue';

	require('@/assets/style/panel.css');


	export default {
		name: 'cPopUp',
		data(){
			return {
			}
		},	
		props: {
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
			// 'c-panel' : Panel,
		},
}

</script>

<style scoped >


.panel-parent{
	z-index: 10;
	position:relative;
}


.popup-fill {
	position: fixed;
	z-index:30;
	top: 4rem;
	left: 0;
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


</style>

