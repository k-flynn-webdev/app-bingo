<template>

	<div class="tag text colour-fill-bg-inv">
		<slot>
			new tag
		</slot>
	</div>


</template>

<script>

	export default {
		name: 'cTag',
		data(){
			return {
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
		},
		components: {
		},
}

</script>

<style>

	.tag-enter-active {
		animation: tag-anim-in-out 0.5s both;
	}
	.tag-leave-active {
		animation: tag-anim-in-out 0.5s reverse both;
	}
	@keyframes tag-anim-in-out {
		0% {
			transform: scale(0.3);
			opacity: 0;
		}
		100% {
			transform: scale(1);
		}
	}

	.tags {
		margin: 1rem 0.1rem;
		text-align: left;
	}
	.tag {
		display: inline-block;
		border-radius: .2rem;
		margin: .25rem;
		padding: 0.33rem 0.5rem;
		transition: 0.5s;
	}

</style>

