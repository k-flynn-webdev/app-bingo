<template>

	<div ref="parent">

		<footer 
			ref="footer"
			class="app-footer"> 

			<div 
				class="footer-content text-center">

					<span class="colour-fill-pop text"> Made with </span>

					<i> 						
						<svg 
							class="colour-fill-pop icon" 
							viewBox="0 0 907 828" 
							height="100%"
							version="1.1" 
							xmlns="http://www.w3.org/2000/svg" 
							xmlns:xlink="http://www.w3.org/1999/xlink" 
							xml:space="preserve" 
							xmlns:serif="http://www.serif.com/">

							<path class="" d="M730.084,312.85c4.226,113.133 -40.828,236.381 -79.883,320.702c-29.137,63.033 -92.165,103.467 -161.607,103.675c-58.148,0.184 -129.832,0.398 -188.066,0.573c-68.886,0.206 -131.752,-39.215 -161.569,-101.314c-43.597,-90.793 -96.522,-224.663 -88.059,-325.713"/>
							<path class="" d="M710,410.13l137.329,0c0,0 27.947,188.444 -226.001,233.406"/>

						</svg>
					</i>

					<span class="colour-fill-pop text"> by </span>

					<span class="text colour-fill-pop">
						<a class="text-link" rel="noreferrer" target="_blank" href="https://github.com/k-flynn-webdev">
							k-flynn-webdev 
						</a>					
					</span>

			</div>

			<small class="footer-version colour-fill-pop">
				v: {{ version }}
			</small>

		</footer>

	</div>	

</template>

<script>

export default {
	name: 'cFooter',
	data(){
		return {
			version : '',
		}
	},	
	methods : {
		get_version : function(){
			this.version = process.env.VUE_APP_VERSION || '0.0.0';
		},
	},
	mounted(){
		this.get_version();
		document.body.appendChild( this.$refs.footer );
	},
	beforeDestroy(){
		document.body.removeChild( this.$refs.footer );	
		this.$refs.parent.appendChild( this.$refs.footer );
	},

}

</script>

<style scoped >
	


	.app-footer{
		margin: 0 calc(var(--margin)*.5);
	}

	.app-footer .footer-content .text {
	}

	.footer-content {
	}
	.footer-version {
		position: absolute;
		right: calc(var(--margin)*.5);
	}
	.icon {
		width: 1.5rem;
	}

@media only screen and (min-width: 600px) {

	.app-version {
	}

}


</style>

















