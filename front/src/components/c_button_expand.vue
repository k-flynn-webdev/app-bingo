<template>

	<div 
		ref="btnHolder"
		class="button-expander"
		v-bind:data-open=display>

		<c-button
			ref="btn"
			v-bind:onClick=onClickExpand>

				<slot class="label"> 
				 	Label here
				</slot>

		</c-button>

		<div class="content anim-6 field"> 

			<slot name="content">
				Content here
			</slot>

			<div class="button-expand-submit anim-3">
				<c-button
					class="label"
					ref="btn"
					style="min-width: unset; margin: 0;padding: 0 1rem;"
					v-bind:onClick=onClickConfirm>

						<slot class="label" name="button">
							Submit
						</slot>

				</c-button>				
			</div>

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

	.button-expander {
		display: inline-block;
		height: auto;
	}
	.button-expander[data-open] {
		height: 5rem;
	}

	.button-expander .content {
		margin-top: 0;
		padding: 0; 
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		opacity: 0;
		overflow: hidden;
		transform: translateY(-1rem);
	}
	.button-expander[data-open] .content {
		animation: anim-button-expand-slide-down .33s cubic-bezier(0.35, 0.025, 0.3, 1.1);

		opacity: 1;
		transform: translateY(0);
		height: 3rem;
	}

	.button-expander .button-expand-submit {
		transform: translateX(2rem);
		opacity: 0;
		transition-delay: 0;
	}
	.button-expander[data-open] .button-expand-submit {
		transition-delay: 1s;
		opacity: 1;
		transform: translateX(0);
	}

@keyframes anim-button-expand-slide-down {
	0% { 
		opacity:0; 
		transform: translateY(-1rem);
	}
	30% { 
		opacity:0.1; 
	}	
	66% {
		/*transform: translateY(.5rem);*/
	}	
	100% { 
		opacity:1; 
		transform: translateY(0);
	}
}




</style>

