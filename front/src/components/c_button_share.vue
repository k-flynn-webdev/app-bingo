<template>

	<div 
		class=""
		v-bind:class="{ 'hover-trigger hover-force' : state.display }">

			<div
				class="anim-6 title hover-message-left">

						<div 
							style="padding: .5rem 1rem;"
							v-bind:data-copied=state.copied
							class="text-bold colour-bg-notice colour-fill-dark border-round border-dark copy anim-10">
								( copied )
						</div>

					<input 
						style="padding: .5rem 1rem;"
						class="text colour-fill-dark colour-bg-notice" 
						ref="txtCopy" 
						type="string" 
						name="" 
						v-bind:value=content>

			</div>

			<button 
				v-on:click=clicked
				class="button icon shadow colour-bg-dark border-round"
				style="width:2.6rem;height:2.6rem;overflow:hidden;border:2px solid white;">

					<svg 
						class="colour-fill-pop"
						height="100%" viewBox="-20 -20 240 240" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" 
						style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
							<path d="M121.666,45.63c-0.969,-2.964 -1.492,-6.119 -1.492,-9.39c0,-17.242 14.524,-31.24 32.413,-31.24c17.889,0 32.413,13.998 32.413,31.24c0,17.242 -14.524,31.24 -32.413,31.24c-8.567,0 -16.363,-3.211 -22.161,-8.45l-52.092,31.58c0.969,2.964 1.492,6.119 1.492,9.39c0,3.271 -0.523,6.426 -1.492,9.39l52.092,31.58c5.798,-5.239 13.594,-8.45 22.161,-8.45c17.889,0 32.413,13.998 32.413,31.24c0,17.242 -14.524,31.24 -32.413,31.24c-17.889,0 -32.413,-13.998 -32.413,-31.24c0,-3.271 0.523,-6.426 1.492,-9.39l-52.092,-31.58c-5.798,5.239 -13.594,8.45 -22.161,8.45c-17.889,0 -32.413,-13.998 -32.413,-31.24c0,-17.242 14.524,-31.24 32.413,-31.24c8.567,0 16.363,3.211 22.161,8.45l52.092,-31.58Z"/>
					</svg>

			</button>

	</div>

</template>

<script>

	export default {
		name: 'cButtonShare',
		data(){
			return {
				state : {
					display : false,
					copied : false,
				},
			}
		},
		props: {
			content : String,
		},
		methods : {
			reset : function(){
				this.state.display = false;
				this.state.copied = false;
			}, 
			clicked : function(){
				if( !this.state.display ){
					this.state.display = true;

					let self = this;

					setTimeout( function(){
						self.onCopy();
					}, .75*1000);

					setTimeout( function(){
						self.state.copied = true;
					}, 1.33*1000);

					setTimeout( function(){
						self.reset();
					}, 2.5*1000);
				}
			},
			onCopy : function(){
				let copyText = this.$refs.txtCopy.select();
				document.execCommand('copy');
			},			
		},
		mounted(){	
			this.reset();
		},
		beforeDestroy(){
		},		
		components: {
		},
}

</script>

<style>

.copy {
	opacity: 0;
	position: absolute;
	left: 50%;
	transform: translateX(-50%) translateY(50%);
}
.copy[data-copied] {
	opacity: 1;
	transform: translateX(-50%) translateY(-110%);
}

</style>

