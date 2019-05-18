<template>
	
		<c-panel class="admin order">

			<div slot="header-no-cap">
				<span class="text-uppercase"> users </span>
				<span> (all) : {{ data.length }} </span>
			</div>

			<table slot="no-margin" style="margin:0 !important;padding:0 !important;">
				
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
						v-for="user in data" :key="user.email">

						<td class="text">
							<p> {{ user.name }} </p>  
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

			<div slot="footer">
				<c-message ref="messageBtn"></c-message>	
			</div>

		</c-panel>

</template>

<script>

	import Panel from '../components/c_panel.vue';
	import Message from '../components/c_message.vue';

	import { tokenExpire } from '../mixins/h_token_expire.js';	

	export default {
		name: 'cAdminUsersAll',
		mixins: [ tokenExpire ],		
		data(){
			return {
				data : Array,
			}
		},
		mounted(){
			this.get_users_all();
			this.$root.$on('userChanged', this.event_get_users_all );		
		},		
		methods:{
			onClick : function( item ){
				this.$root.$emit('userAdminSelect', item );
			},
			event_get_users_all : function(){
				let self = this;
				setTimeout(function(){
					self.get_users_all();
				}, 1000);
			},			
			get_users_all : function(){
				let self = this;
				let object = { url : '/api/admin/user/all', method : 'POST', body : '' };
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
			'c-panel' : Panel,
			'c-message' : Message,
		},		
}
</script>

<style scoped >
	
.order {
	order: 5;
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
