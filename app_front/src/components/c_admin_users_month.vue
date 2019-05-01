<template>
	
		<c-panel class="admin">

			<div slot="header-no-cap">
				<span class="text-uppercase"> users </span>
				<span> (30days) : {{ data.new.length }} </span>
			</div>

			<div slot="no-margin" style="margin:0 !important;padding:0 !important;">
			
				<table style="margin:0 !important;padding:0 !important;">
	
					<thead class="head">
						<tr class="row">
							<th class="text text-blur colour-text-dark">Name</th>
							<th class="text text-blur colour-text-dark">Email</th>
							<th class="text text-blur colour-text-dark">Role</th>
							<th class="text text-blur colour-text-dark"> </th>
						</tr>
					</thead>

					<tbody>

						<tr class="row"
							v-for="user in data.new" :key="user.id">

							<td class="text">  
								<p> {{ user.name }}</p>
							</td>
							<td class="text">
								<p> {{ user.email }} </p> 		 
							</td>
							<td class="text"> 
								<p> {{ user.role }} </p>   
							</td>
							<td class="text"> 
								<button 
									class="button text-light"
									v-on:click=onClick(user)>
									O
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
		name: 'cAdminUsersMonth',
		mixins: [ tokenExpire ],		
		data(){
			return {
				data : { 
					new : [], 
					login : [], 
					updated : [] 
				},
			}
		},
		mounted(){
			this.get_users_month();
			this.$root.$on('userChanged', this.event_get_users_month );
		},		
		methods:{
			onClick : function( item ){
				this.$root.$emit('userAdminSelect', item );
			},
			event_get_users_month : function(){
				let self = this;
				setTimeout(function(){
					self.get_users_month();
				}, 1000);
			},
			get_users_month : function(){
				let self = this;
				let object = { url : '/api/admin/user/month', method : 'POST', body : '' };
				this.$request.request_url( object, function(error, result){
					if( error ){
						self.expired_token_check( error );
						self.$refs.messageBtn.$emit('message', { class : 'error text-negative', message : error.message });
						return;
					}
					self.data = result.data;
					self.$root.$emit('adminMonthData', result.data );
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
	order: 1;
}
.button{
	min-width: 1rem;
}



.head {
	background-color: hsl(177,20%,93%);
}
th {
	opacity: 0.5;
}
table {	
	max-height: 10rem;
	overflow: auto;
	margin:0;
	padding:0;
	display: block;
	white-space: nowrap;
	table-layout: fixed;
	min-width: calc(100% + 1px);
}
td {
	padding: .1rem .33rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: left;	
}

</style>
