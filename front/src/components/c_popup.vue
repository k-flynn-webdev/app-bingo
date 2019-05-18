<template>
	
	<div ref="popup" class="popup-fill" style="z-index: 50;">
		
		<div 
			v-on:click=clicked
			class="fill-all shade">
		</div>
		
		<div class="panel center-auto-h width-95 shadow "
			style="position: relative;z-index: 10;">

			<header>

				<div style="position:absolute;height:100%;width:100%;">
					<div 
						class="options flex-row flex-row-end "
						style="height:100%;width:100%;">
						<slot name="options"></slot>
					</div>
				</div>

				<p class="title text-uppercase text-med text-small"> 
					<slot name="header" ></slot>
				</p>

			</header>
			<main>
				<slot></slot>
				<slot name="no-margin" class="main"></slot>
			</main>
			<footer>
				<p class="text"> 
					<slot name="footer"></slot>
				</p>
			</footer>
		</div>

	</div>

</template>

<script>

	require('@/assets/style/panel.css');

	export default {
		name: 'cPopUp',
		data(){
			return {
				show : false,
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

	.is-success .panel{
		background-color: var( --colour-success );
	}
	.is-warning .panel{
		background-color: var( --colour-warning );
	}	
	.is-error .panel{
		background-color: var( --colour-error );
	}	

</style>

