<template>

	<div 
		ref="btnRow"
		class="button-row border-round" 
		v-bind:data-open=state.open
		v-on:click=clicked>

			<span class="title colour-fill-dark no-click"> 

				<slot name="label">
					Label
				</slot>

				<div class="button-row-icon anim-3"></div>

			</span>

			<div class="row-content anim-6">

				<slot>
					Content
				</slot>

			</div>

	</div>


</template>

<script>

	export default {
		name: 'cButtonExpand',
		data(){
			return {
				state : {
					open : false,
				},
			}
		},	
		methods : {
			clicked : function(){
				this.$emit('click');
				this.state.open = !this.state.open;
			},	
		},
		mounted(){	
		},
		components: {
		},	
}

</script>

<style>

.button-row {
	text-align: left;
	margin: var(--margin);
	padding: .5rem;
	background-color: var(--colour-notice);
	overflow: hidden;
	position: relative;
}

.button-row-icon {
	display: inline-block;
	position: absolute;
	top: var(--margin);
	right: var(--margin);
	z-index: 1;

	width: .75rem;
	height: .75rem;
	border-right: 4px solid var(--colour-dark);
	border-bottom: 4px solid var(--colour-dark);
	transform: rotateZ(45deg) scaleY(1);
}
.button-row[data-open] .button-row-icon {
	margin-left: 0.5rem;
	transform: scaleY(-1);
}

.button-row .row-content {
	height: 1px;
	opacity: 0;
	pointer-events: none;
	transform: translateY(1rem);
	transition-timing-function: cubic-bezier(0.18, 0.03, 0, 1);
}
.button-row[data-open] .row-content {
	opacity: 1;
	height: auto;
	transform: translateY(0);
}


</style>

