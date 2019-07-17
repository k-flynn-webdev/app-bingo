<template>

	<div 
		ref="btnRow"
		class="button-row" 
		v-bind:data-open=state.open
		v-on:click=clicked>

			<span class="title colour-fill-dark"> 

				<slot name="label">
					Label
				</slot>

			</span>

			<div class="button-row-icon anim-3"></div>	

			<div class="row-content anim-3">

				<slot>
					Content
				</slot>

			</div>

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
	background-color: var(--colour-notice)
}
.button-row[data-open] {
}

.button-row-icon {
	display: inline-block;
	margin-left: 0;
	width: .75rem;
	height: .75rem;
	border-top: 4px solid var(--colour-dark);
	border-right: 4px solid var(--colour-dark);
	transform: rotateZ(45deg);
}
.button-row[data-open] .button-row-icon {
	margin-left: 0.5rem;
	transform: rotateZ(135deg);
}

.row-content {
	opacity: 0;
	height: 1px;
}
.button-row[data-open] .row-content {
	opacity: 1;
	height: auto;
}

</style>

