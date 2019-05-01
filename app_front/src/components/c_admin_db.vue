<template>
	
		<c-panel class="admin order">

			<div slot="header-no-cap">
				<span class="text-uppercase"> Database </span>
			</div>

			<div class="account-text">

				<table slot="no-margin" style="margin:0 !important;padding:0 !important;">
				
					<thead class="head">
						<tr class="row">
							<th class="text text-blur colour-text-dark">Name</th>
							<th class="text text-blur colour-text-dark">Count</th>
							<th class="text text-blur colour-text-dark">Size</th>
							<th class="text text-blur colour-text-dark"> </th>
						</tr>
					</thead>

					<tbody>
						
						<tr class="row"
							v-for="item in data" :key="item.name">

							<td class="text">  
								<p> {{ item.name }}</p>
							</td>
							<td class="text">  
								<p> {{ item.count }}</p>
							</td>							
							<td class="text">
								<p> 
									{{ (item.storageSize / 1000).toFixed(2) }} KB
								</p> 		 
							</td>
							<td v-if=all_button(item.name) class="text"> 
								<button 
									class="button text-light"
									v-on:click=reset_db(item.name)>
										reset
								</button>
							</td>							
						</tr>

					</tbody>

				</table>

			</div>
		
			<div slot="footer">

				<c-message ref="messageBtn"></c-message>	

			</div>

		</c-panel>

</template>

<script>

	import Button from '../components/c_button.vue';
	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import { tokenExpire } from '../mixins/h_token_expire.js';	

	export default {
		name: 'cAdminDB',
		mixins: [ tokenExpire ],		
		data(){
			return {
				data : Array,
			}
		},
		mounted(){
			this.get_db_stats();
		},		
		methods:{
			all_button : function( input ){
				if( input.toLowerCase() === 'All'.toLowerCase() ){
					return false;
				}
				return true;
			},
			reset_db : function( collection ){
				let self = this;
				let object = { url : '/api/admin/reset/' + collection.toLowerCase() , method : 'POST', body : '' };
				this.$request.request_url( object, function(error, result){
					if( error ){
						self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
						self.expired_token_check( error );
						return;
					}
					self.$refs.messageBtn.$emit('message', { class : 'success text-positive', message : result.message });

					setTimeout(function(){
						self.get_db_stats();
					},1000);
				});
			},
			get_db_stats : function(){
				let self = this;
				let object = { url : '/api/admin/stats', method : 'POST', body : '' };
				this.$request.request_url( object, function(error, result){
					if( error ){
						self.expired_token_check( error );
						self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
						return;
					}
					self.data = result.data;
				});
			},			
		},
		components: {
			'c-button' : Button,
			'c-panel' : Panel,
			'c-message' : Message,
		},		
}
</script>

<style scoped >

.order {
	order: 10;
}


.head {
	background-color: hsl(177,20%,93%);
}
th {
	opacity: 0.5;
}
table {
	margin:0;
	padding:0;
	width: calc(100% + 1px);
	table-layout: fixed;
	border-collapse: collapse;
}
td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>
