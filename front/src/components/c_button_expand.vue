<template>

	<div 
		ref="btnHolder"
		class="button-holder">

		<c-button
			ref="btn"
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

			emit : function( emit, extra ){
				this.$refs.btn.$emit('state', emit, extra);
			}
	
		},
		mounted(){	
			this.$on('state', this.emit );	
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


.slide-fade-enter-active {
	animation: anim-button-slide-down .4s cubic-bezier(0.35, 0.025, 0.3, 1.1);
}
.slide-fade-leave-active {}
.slide-fade-enter, .slide-fade-leave-to {
}

.slide-fade-side-enter-active {
	animation: anim-button-slide-in .4s ease;
}
.slide-fade-side-leave-active {}
.slide-fade-side-enter, .slide-fade-side-leave-to {
}

@keyframes anim-button-slide-down {
	0% { 
		opacity:0; 
		transform: translateY(-1.5rem);
	}
	100% { 
		opacity:1; 
		transform: translateY(0);	
	}
}

@keyframes anim-button-slide-in {
	0% { 
		opacity:0; 
		transform: translateX(1rem);
	}
	100% { 
		opacity:1; 
		transform: translateX(0);	
	}
}



</style>

