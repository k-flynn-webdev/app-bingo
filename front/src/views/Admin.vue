<template>
	<div>
		
		<h1 class="title text-center text-light" style="margin-bottom:1rem;">Dashboard:</h1>

		<div class="admin flex-only-on-large">

			<c-admin-edit></c-admin-edit>

			<c-admin-users-graph></c-admin-users-graph>

			<c-admin-users-month></c-admin-users-month>

			<c-admin-users-all></c-admin-users-all>	

			<c-admin-db></c-admin-db>

		</div>

	</div>

</template>

<script>

	import AdminDB from '../components/c_admin_db.vue';
	import AdminEdit from '../components/c_admin_edit.vue';
	import AdminUsersAll from '../components/c_admin_users_all.vue';
	import AdminUsersMonth from '../components/c_admin_users_month.vue';
	import AdminUsersGraph from '../components/c_admin_users_graph.vue';

	export default {
		name: 'Admin',
		data(){
			return {
			}
		},
		mounted(){
		},		
		methods:{
		},
		components: {
			'c-admin-edit' : AdminEdit,
			'c-admin-db' : AdminDB, 
			'c-admin-users-all' : AdminUsersAll, 
			'c-admin-users-month' : AdminUsersMonth, 
			'c-admin-users-graph' : AdminUsersGraph, 
		},		
}
</script>

<style>
</style>
