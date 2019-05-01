<template>
	<div id="app">

		<c-navbar>

			<template>
				<router-link class="link title colour-text-light colour-on-hover colour-on-focus" to="/">Home</router-link>
			</template>

			<router-link class="link title colour-text-light colour-on-hover colour-on-focus" to="/board/create">Create</router-link>

			<template slot="active">		
				<router-link class="link title colour-text-light colour-on-hover colour-on-focus" to="/logout">Logout</router-link>
				<router-link class="link title colour-text-light colour-on-hover colour-on-focus" to="/account">Account</router-link>
				<router-link 
					class="link title colour-text-light user colour-on-hover colour-on-focus"
					to="/admin/request">
						AdminRequest
				</router-link>
				<router-link 
					class="link title colour-text-light admin colour-on-hover colour-on-focus" 
					to="/admin">
						AdminBoard
					</router-link>
			</template>

			<template slot="none-active">	
				<router-link class="link title colour-text-light colour-on-hover colour-on-focus" to="/login">Login</router-link>
			</template>

		</c-navbar>

		<router-view/>

		<c-footer></c-footer>

	</div>

</template>

<script>

// adding global style ..
require('@/assets/style/default.css');
require('@/assets/style/colour.css');
require('@/assets/style/text.css');
require('@/assets/style/anim.css');

import cNavBar from './components/c_navbar.vue';
import cFooter from './components/c_footer.vue';


export default {
	name: 'App', 
	created(){
		this.$store.dispatch('user/init', this.$request.get_SecureKeyFile );
	},
	computed : {		
	},	
	methods : {
	},
	components: {
		'c-navbar' : cNavBar,
		'c-footer' : cFooter,
	},
}

</script>


<style>

</style>
