<template>

	<div 
		ref="btnHolder"
		class="button-holder">

		<c-button
			v-bind:onClick=onClickExpand>

				<slot name="label" > 
				 	Label here 
				</slot>					

		</c-button>

		<transition 
			name="slide-fade">

			<div 
				v-if=display
				class="anim-6 button-holder">

					<div 
						class="button-holder-content">

							<slot name="content">
								Content here
							</slot>

							<transition 
								name="slide-fade-side">

									<button 
										v-if=button
										v-on:click=onClickConfirm
										class="button expand-button">

											<slot name="button">
												Confirm
											</slot>	


									</button>

							</transition>

					</div>

			</div>

		</transition>

		<div 
			class="anim-3"
			v-bind:style=" display ? 'height: 2.3rem;' : 'height: .01rem;' ">
		</div>
		
	</div>

</template>

<script>

	import Button from '../components/c_button.vue';

	export default {
		name: 'cButtonExpand',
		data(){
			return {
				display : false,
				button : false,
			}
		},	
		props: {
			buttonShow : Boolean,
			buttonClick : Function,
			buttonClickClose : Boolean,
		},
		methods : {
			onClickExpand : function(){
				this.display = !this.display;

				this.button = false;

				if( this.display ){

					if( this.buttonShow ){

						let self = this;
						setTimeout( function(){
							self.button = true;
						}, 1000);
					}
				}
			},

			onClickConfirm : function(){
				if( this.buttonClick !== undefined ){
					this.buttonClick();
				}				

				if( this.buttonClickClose ){
					let self = this;
					setTimeout( function(){
						self.display = false;
					}, 500);
				}
			},
	
		},
		components: {
			'c-button' : Button,
		},	
}

</script>

<style>

	.button-holder{
		position: relative;
	}

	.button-holder-content {
		border-radius: 0.25rem;
		position: absolute;
		z-index: 1;
		left: 50%;
		width: 90%;
		transform: translateX(-50%);
		background-color: var(--colour-inv);
		border: solid 1px white;
		text-align: left;
		padding: 0.15rem;
	}

	.expand-button{
		position: absolute;
		top: 0;
		right: -5px;
	}

.slide-fade-enter-active {}
.slide-fade-leave-active {}
.slide-fade-enter, .slide-fade-leave-to {
	opacity: 0;
	transform: translateY(-1rem);
}

.slide-fade-side-enter-active {}
.slide-fade-side-leave-active {}
.slide-fade-side-enter, .slide-fade-side-leave-to {
	opacity: 0;
	transform: translateX(1rem);
}

</style>

