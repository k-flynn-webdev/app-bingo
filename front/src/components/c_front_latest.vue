<template>

	<div class="colour-fill-bg-inv">
		<p class="title">Latest Boards</p>


		<router-link 
			v-for="(item, index) in boards"
			:key=item.url
			v-bind:to=get_url(item)>

				<p class="text link"> 
					{{ item.data.name }} : {{ item.data.stats.plays }}
				</p>

		</router-link>

		<br>

	</div>

</template>

<script>

	import { submit } from '../mixins/h_submit.js';

	let counter = null;

	export default {
		name: 'cFrontLatest',
		mixins: [ submit ],
		data(){
			return {
				attrs : {
					max_timeouts : 5,
					action : Object,
					timing : 5000,
				},
				state : {
					init : 0,
					timeouts : 0,
				},
				boards : [],	
			}
		},	
		methods : {
			get_url : function( input ){
				return '/board/' + input.url;
			},			
			init : function(){

				let search = {};

				let action = {
					url : ('/meta/board/latest'),
					method : 'GET',
					JSON : false,
					body : '' };

				this.attrs.action = action;

				this.latest_submit(); // one time pull ..

			},
			latest_submit : function(){
				this.onSubmit( this.attrs.action, this, null, null, this.latest_success, this.latest_error);
			},
			latest_success : function( input ){
				// console.log( input );
				this.boards = input.data;
			},
			latest_error : function( input ){
				if( this.state.timeouts < this.attrs.max_timeouts ){
					let self = this;
					counter = setTimeout( function(){
						// console.log( 'retrying connection.' );
						self.state.timeouts +=1
						self.latest_submit();
					}, self.attrs.timing);	
				}
			},
		},
		mounted(){
			this.init();
		},	
		beforeDestroy(){
			// this.exit();
		},
		components: {
			// 'c-message' : Message,
		},		
}
</script>

<style>



</style>

