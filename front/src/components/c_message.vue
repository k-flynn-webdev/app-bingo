<template>

	<div class="message">
		<p v-bind:class=get_class> 
				{{ get_message }} 
		</p>
	</div>

</template>

<script>

	let classObj = null;
	let msgObj = null;

	// TODO
	// MEssage delay request?
	// Array support + delay and cleanup?


	export default {
		name: 'cMessage',
		data(){
			return {
				obj : { 
					class : "", 
					message : "",
				},
				duration_sec : 4,
			}
		},	
		props: {
		},
		computed : {
			get_class : function(){
				return this.obj.class;
			},			
			get_message : function(){
				return this.obj.message;
			},
		},
		methods : {
			message_set : function( input ){
				this.obj.class = input.class;
				this.obj.message = input.message;
				this.message_reset();
			},
			message_reset : function(){
				let self =this;
				classObj = setTimeout( function(){
					self.obj.class = '';
				}, ((self.duration_sec - 1) * 1000) );
				msgObj = setTimeout( function(){
					self.obj.message = '';
				}, (self.duration_sec * 1000) );				
			},
		},
		mounted(){	
			this.$on('message', this.message_set );	
		},
		beforeDestroy(){
			clearTimeout(classObj);
			clearTimeout(msgObj);
			this.$off('message', this.message_set );	
		},		
		components: {
		},
}

</script>

<style scoped >
	
	.message {
/*		background-color: grey;
*/	}
	.message p {
		transition: all 0.33s, height 0.8s;
		opacity: 0;
		height: 1px;
	}
	.message p.error, .message p.success ,.message p.content ,.message p.text{
		opacity: 1;
		margin-top: 0.75rem;
		margin-bottom: 0.75rem;
		height: 1rem;
	}

</style>

